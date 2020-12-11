import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import React, {useContext} from 'react';

import Loader from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {ZONE_EDIT_PAGE_PATH, PROFILE_SCOPE} from "../../../helpers/constants";
import {
    shouldShowError,
    processingRequest,
    extractGoogleMapUrl,
    extractDataInPartialRedux
} from "../../../helpers/functions";
import {
    UserContext,
    UsersContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    CollectorsContext
} from "../../../helpers/contexts";

// Component
function UsersZone({scope}) {
    // Context states
    const user = useContext(UserContext);
    const users = useContext(UsersContext);
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const {id, map, name, reference} = extractDataInPartialRedux(scope, {agents, collectors, user, users}).zone;

    // Render
    return (
        <>
            {processingRequest(scope, requests.list) ? <Loader/> : (
                <>
                    {shouldShowError(scope, errors.list) &&
                        <ErrorAlert scope={scope}/>
                    }
                    <div className="card card-widget">
                        <iframe src={extractGoogleMapUrl(map)}
                                className='widget-user-header'
                                style={{border:0}}
                                allowFullScreen={true}
                                title="googleMap"
                        />
                        <div className="card-footer p-0">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <span className="nav-link">
                                        {(PROFILE_SCOPE !== scope) ?
                                            <Link to={`${ZONE_EDIT_PAGE_PATH}/${id}`}>
                                                {name} {reference && <small>({reference})</small>}
                                            </Link> :
                                            <>
                                                {name} {reference && <small>({reference})</small>}
                                            </>
                                        }
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
UsersZone.propTypes = {
    scope: PropTypes.string.isRequired,
};

// Connect component to Redux
export default React.memo(UsersZone);

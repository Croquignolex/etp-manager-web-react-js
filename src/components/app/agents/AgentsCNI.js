import PropTypes from 'prop-types';
import React, {useContext} from 'react';

import Loader from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {
    shouldShowError,
    processingRequest,
    extractDataInPartialRedux
} from "../../../helpers/functions";
import {
    UserContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext
} from "../../../helpers/contexts";

// Component
function AgentsCNI({scope}) {
    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);

    // Data
    const {frontIDCard, backIDCard} = extractDataInPartialRedux(scope, {agents, user});

    // Data
    const Ribbon = ({text, image}) => {
        return (
            <div className="col-sm-6">
                {processingRequest(scope, requests.list) ? <Loader/> : (
                        <>
                            {shouldShowError(scope, errors.list) &&
                                <ErrorAlert scope={scope}/>
                            }
                            <div className="position-relative">
                                <a href={image} data-toggle="lightbox" data-title={text} data-gallery="gallery">
                                    <img src={image} className="img-fluid mb-2" alt="..."/>
                                </a>
                                <div className="ribbon-wrapper ribbon-lg">
                                    <div className="ribbon bg-theme">{text}</div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        )
    };

    // Render
    return (
        <div className='row'>
            <Ribbon text='Image avant' image={frontIDCard} />
            <Ribbon text='Image arrière' image={backIDCard} />
        </div>
    )
}

// Prop types to ensure destroyed props data type
AgentsCNI.propTypes = {
    scope: PropTypes.string.isRequired,
};

// Connect component to Redux
export default React.memo(AgentsCNI);

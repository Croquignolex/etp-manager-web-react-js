import React, {useContext, useEffect} from 'react';
import PropTypes from "prop-types";

import Loader from "../../Loader";
import {Link} from "react-router-dom";
import ErrorAlert from "../../ErrorAlert";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {processingRequest, shouldShowError} from "../../../helpers/functions";
import {DispatchContext, ErrorsContext, RequestsContext} from "../../../helpers/contexts";

// Component
function TopCard({scope, icon, label, color, data, url}) {
    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <>
            {processingRequest(scope, requests.list) ? <div className='small-box'><Loader /></div> : (shouldShowError(scope, errors.list) ? <ErrorAlert scope={scope} /> : (
                    <>
                        <div className={`small-box ${color}`}>
                            <div className="inner">
                                <h3>{data}</h3>
                                <p>{label}</p>
                            </div>
                            <div className="icon">
                                <i className={icon} />
                            </div>
                            <Link to={url} className="small-box-footer">
                                Détails <i className="fas fa-arrow-circle-right" />
                            </Link>
                        </div>
                    </>
                )
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
TopCard.propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    scope: PropTypes.string.isRequired,
};

export default React.memo(TopCard);
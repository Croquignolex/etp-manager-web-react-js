import React, {useContext} from 'react';

import Loading from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {OPERATOR_SCOPE} from "../../../helpers/constants";
import {ErrorsContext, RequestsContext, OperatorsContext} from "../../../helpers/contexts";
import {dateToString, processingRequest, shouldShowError} from "../../../helpers/functions";

// Component
function OperatorsDetail() {
    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const operators = useContext(OperatorsContext);

    // Data
    const scope = OPERATOR_SCOPE;
    const {name, description, creation} = operators.current;
    const requestFailed = shouldShowError(scope, errors.list);
    const requestProcessing = processingRequest(scope, requests.list);

    // Render
    return (
        <>
            {/* Primary information */}
            <div className="card card-primary custom-card-outline">
                <div className="card-body box-profile">
                    {requestProcessing ? <Loading /> : (requestFailed ? <ErrorAlert scope={scope} /> : (
                        <>
                            <h3 className="profile-username text-center">{name}</h3>
                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b><i className='fa fa-calendar-alt' /> Date de céation</b>
                                    <span className="float-right">{dateToString(creation)}</span>
                                </li>
                            </ul>
                        </>
                    ))}
                </div>
            </div>
            {/* Secondary information */}
            {(!requestProcessing && !requestFailed) &&
                <>
                    <div className="card card-primary custom-card-outline">
                        <div className="card-body">
                            <strong><i className="fa fa-user-secret mr-1" /> Description</strong>
                            <p className="text-muted">{description}</p>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default React.memo(OperatorsDetail);

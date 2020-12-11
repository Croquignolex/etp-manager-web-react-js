import React, {useContext} from 'react';

import Loading from "../../Loader";
import {Link} from "react-router-dom";
import ErrorAlert from "../../ErrorAlert";
import {ErrorsContext, RequestsContext, SimsContext} from "../../../helpers/contexts";
import {
    dateToString,
    shouldShowError,
    simTypeBadgeColor,
    processingRequest,
} from "../../../helpers/functions";
import {
    SIM_SCOPE,
    AGENT_EDIT_PAGE_PATH,
    COMPANY_EDIT_PAGE_PATH,
    OPERATOR_EDIT_PAGE_PATH
} from "../../../helpers/constants";

// Component
function SimsDetail() {
    // Context states
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = SIM_SCOPE;
    const requestFailed = shouldShowError(scope, errors.list);
    const requestProcessing = processingRequest(scope, requests.list);
    const {
        name, reference, description, creation, number,
        operator, agent, type, company
    } = sims.current;

    // Render
    return (
        <>
            {/* Primary information */}
            <div className="card custom-card-outline">
                <div className="card-body box-profile">
                    {requestProcessing ? <Loading /> : (requestFailed ? <ErrorAlert scope={scope} /> : (
                                <>
                                    <span className={`badge badge-${simTypeBadgeColor(type.name)}`}>
                                        {type.name}
                                    </span>
                                    <h3 className="profile-username text-center">{name}</h3>
                                    <p className="text-muted text-center">{reference}</p>
                                    <p className="text-center">
                                        <span className={`badge badge-${type.color}`}>
                                            {type.text}
                                        </span>
                                    </p>
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b><i className='fa fa-phone' /> Numéro</b>
                                            <span className="float-right">{number}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b><i className='fa fa-calendar-alt' /> Date de céation</b>
                                            <span className="float-right">{dateToString(creation)}</span>
                                        </li>
                                    </ul>
                                </>
                            )
                        )
                    }
                </div>
            </div>
            {/* Secondary information */}
            {(!requestProcessing && !requestFailed) &&
                <>
                    <div className="card custom-card-outline">
                        <div className="card-body">
                            <strong><i className="fa fa-user-secret mr-1" /> Description</strong>
                            <p className="text-muted">{description}</p>
                        </div>
                    </div>
                </>
            }
            {/* Operator information */}
            {(!requestProcessing && !requestFailed) &&
                <>
                    <div className="card custom-card-outline">
                        <div className="card-body">
                            <strong className='text-theme'>
                                <i className="fa fa-sim-card mr-1" /> Opérateur
                            </strong>
                            <p className="text-muted">
                                <Link to={{pathname: `${OPERATOR_EDIT_PAGE_PATH}/${operator.id}`}}>
                                    {operator.name}
                                </Link>
                            </p>
                        </div>
                    </div>
                </>
            }
            {/* Agent information */}
            {(!requestProcessing && !requestFailed && (agent.id !== '')) &&
                <>
                    <div className="card custom-card-outline">
                        <div className="card-body">
                            <strong className='text-theme'>
                                <i className="fa fa-user-cog mr-1" /> Agent
                            </strong>
                            <p className="text-muted">
                                <Link to={{pathname: `${AGENT_EDIT_PAGE_PATH}/${agent.id}`}}>
                                    {agent.name}
                                </Link>
                            </p>
                        </div>
                    </div>
                </>
            }
            {/* Company information */}
            {(!requestProcessing && !requestFailed && (company.id !== '')) &&
                <>
                    <div className="card custom-card-outline">
                        <div className="card-body">
                            <strong className='text-theme'>
                                <i className="fa fa-user-cog mr-1" /> Entreprise
                            </strong>
                            <p className="text-muted">
                                <Link to={{pathname: `${COMPANY_EDIT_PAGE_PATH}/${company.id}`}}>
                                    {company.name}
                                </Link>
                            </p>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default React.memo(SimsDetail);

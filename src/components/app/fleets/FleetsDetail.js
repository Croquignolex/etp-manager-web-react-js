import PropTypes from "prop-types";
import React, {useContext} from 'react';

import Loading from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {
    FLEET_SCOPE,
    ADMIN_ROLE,
    SIM_EDIT_PAGE_PATH,
    AGENT_EDIT_PAGE_PATH,
    ADMIN_MANAGER_AGENT_ROLE,
    ADMIN_MANAGER_COLLECTOR_ROLE
} from "../../../helpers/constants";
import {
    formatNumber,
    dateToString,
    shouldShowError,
    processingRequest,
    fleetTypeBadgeColor
} from "../../../helpers/functions";
import {
    UserContext,
    ErrorsContext,
    FleetsContext,
    RequestsContext,
    ClearancesContext
} from "../../../helpers/contexts";
import {Link} from "react-router-dom";

// Component
function FleetsDetail({scope}) {
    // Context states
    const user = useContext(UserContext);
    const fleets = useContext(FleetsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const clearances = useContext(ClearancesContext);

    // Data
    const adminProcess = ADMIN_ROLE.includes(user.role.name);
    const requestFailed = shouldShowError(scope, errors.list);
    const requestProcessing = processingRequest(scope, requests.list);
    const adminManagerAgentProcess = ADMIN_MANAGER_AGENT_ROLE.includes(user.role.name);
    const adminManagerCollectorProcess = ADMIN_MANAGER_COLLECTOR_ROLE.includes(user.role.name);
    const {
        amount, reference, status, creation, sim, claimant, remaining, agent
    } = (scope === FLEET_SCOPE) ? fleets.current : clearances.current;

    // Render
    return (
        <>
            <div className="col-md-5">
                {/* Primary information */}
                <div className="card custom-card-outline">
                    <div className="card-body box-profile">
                        {requestProcessing ? <Loading /> : (requestFailed ? <ErrorAlert scope={scope} /> : (
                                <>
                                    <h3 className="profile-username text-center">
                                        <span className={`badge badge-${fleetTypeBadgeColor(status).color}`}>
                                            {fleetTypeBadgeColor(status).text}
                                        </span>
                                    </h3>
                                    <p className="text-muted text-center">{reference}</p>
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b><i className='fa fa-dollar-sign' /> Montant</b>
                                            <span className="float-right">{formatNumber(amount)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b><i className='fa fa-coins' /> Reste</b>
                                            <span className="float-right text-danger">{formatNumber(remaining)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b><i className='fa fa-calendar-alt' /> Date de céation</b>
                                            <span className="float-right">{dateToString(creation)}</span>
                                        </li>
                                    </ul>
                                </>
                            )
                        )}
                    </div>
                </div>
                {/* Sim information */}
                {(!requestProcessing && !requestFailed) &&
                    <div className="card custom-card-outline">
                        <div className="card-body">
                            <strong className='text-theme'>
                                <i className="fa fa-sim-card mr-1" /> Puce à flotter
                            </strong>
                            <p className="text-muted">
                                {!adminProcess ?
                                    <>
                                        {sim.name}
                                        {(sim.number) && ` (${sim.number})`}
                                    </> :
                                    <Link to={{pathname: `${SIM_EDIT_PAGE_PATH}/${sim.id}`}}>
                                        {sim.name}
                                        {(sim.number) && ` (${sim.number})`}
                                    </Link>
                                }
                            </p>
                        </div>
                    </div>
                }
                {/* Claimer information */}
                {(!requestProcessing && !requestFailed && adminManagerAgentProcess) &&
                    <div className="card custom-card-outline">
                        <div className="card-body">
                            <strong className='text-theme'>
                                <i className="fa fa-user mr-1" /> Démendeur
                            </strong>
                            <p className="text-muted">
                                {(claimant.id === user.id) ? 'Moi' : claimant.name}
                            </p>
                        </div>
                    </div>
                }
                {/* Agent information */}
                {(!requestProcessing && !requestFailed && adminManagerCollectorProcess) &&
                <div className="card custom-card-outline">
                    <div className="card-body">
                        <strong className='text-theme'>
                            <i className="fa fa-user mr-1" /> Agent
                        </strong>
                        <p className="text-muted">
                            {!adminProcess ?
                                <>
                                    {agent.name}
                                    {/*{(agent.reference) && ` (${agent.reference})`}*/}
                                </>  :
                                <Link to={{pathname: `${AGENT_EDIT_PAGE_PATH}/${agent.id}`}}>
                                    {agent.name}
                                    {/*{(agent.reference) && ` (${agent.reference})`}*/}
                                </Link>
                            }
                        </p>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
FleetsDetail.propTypes = {
    scope: PropTypes.string.isRequired
};

export default React.memo(FleetsDetail);

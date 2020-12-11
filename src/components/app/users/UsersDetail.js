import PropTypes from 'prop-types';
import React, {useContext} from 'react';

import Loading from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {
    AGENT_ROLE,
    AGENT_SCOPE,
    PROFILE_SCOPE,
    COLLECTOR_SCOPE,
    ADMIN_MANAGER_ROLE
} from "../../../helpers/constants";
import {
    formatNumber,
    dateToString,
    roleBadgeColor,
    shouldShowError,
    processingRequest,
    extractDataInPartialRedux
} from "../../../helpers/functions";
import {
    UserContext,
    UsersContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    CollectorsContext,
} from "../../../helpers/contexts";

// Component
function UsersDetail({scope}) {
    // Context states
    const user = useContext(UserContext);
    const users = useContext(UsersContext);
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const requestFailed = shouldShowError(scope, errors.list);
    const requestProcessing = processingRequest(scope, requests.list);
    const {
        avatar, name, post, phone, description, email, status, sims,
        address, creation, reference, town, country, document, role, account
    } = extractDataInPartialRedux(scope, {agents, collectors, user, users});

    // Render
    return (
        <>
            {/* Primary information */}
            <div className="card custom-card-outline">
                <div className="card-body box-profile">
                    {requestProcessing ? <Loading /> : (requestFailed ? <ErrorAlert scope={scope} /> : (
                            <>
                                <span className="mr-1">
                                    {status
                                        ? <i className='fa fa-lock-open text-success' />
                                        : <i className='fa fa-lock text-danger' />
                                    }
                                </span>
                                <span className={`badge badge-${roleBadgeColor(role.name)}`}>
                                    {role.name}
                                </span>
                                <div className="text-center">
                                    <img src={avatar} alt="avatar..."
                                         className="profile-user-img img-fluid img-circle"
                                    />
                                </div>
                                <h3 className="profile-username text-center">{name}</h3>
                                <ul className="list-group list-group-unbordered mb-3">
                                    <li className="list-group-item">
                                        <b><i className='fa fa-phone' /> Tel personnel</b>
                                        <span className="float-right">{phone}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <b><i className='fa fa-at' /> Email</b>
                                        <span className="float-right">{email}</span>
                                    </li>
                                    {ADMIN_MANAGER_ROLE.includes(role.name) &&
                                        <li className="list-group-item">
                                            <b><i className='fa fa-user-tie' /> Poste</b>
                                            <span className="float-right">{post}</span>
                                        </li>
                                    }
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
            {!requestProcessing && !requestFailed &&
                <>
                    {/* Agent information */}
                    {(AGENT_ROLE.includes(role.name)) &&
                        <div className="card custom-card-outline">
                            <div className="card-body">
                                <ul className="list-group list-group-unbordered mb-3">
                                    <li className="list-group-item">
                                        <b><i className='fa fa-edit' /> Réference</b>
                                        <span className="float-right">{reference}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <b><i className='fa ' /> Ville</b>
                                        <span className="float-right">{town}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <b><i className='fa fa-map-pin' /> Pays</b>
                                        <span className="float-right">{country}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    {(scope !== PROFILE_SCOPE) &&
                        <div className="card custom-card-outline">
                            <div className="card-body">
                                <strong className='text-success'>
                                    <i className="fa fa-coin mr-1" /> Solde caisse
                                </strong>
                                <p className="text-muted">
                                    {formatNumber(account.balance)}
                                </p>
                            </div>
                        </div>
                    }
                    {(scope === COLLECTOR_SCOPE || scope === AGENT_SCOPE) &&
                        <div className="card custom-card-outline">
                            <div className="card-body">
                                <strong className='text-primary'>
                                    <i className="fa fa-phone mr-1" /> Solde flotte
                                </strong>
                                <p className="text-muted">
                                    {formatNumber(sims.reduce((acc, val) => acc + val.balance, 0))}
                                </p>
                            </div>
                        </div>
                    }
                    {/* Secondary information */}
                    <div className="card custom-card-outline">
                        <div className="card-body">
                            <strong><i className="fa fa-map-marker mr-1" /> Address</strong>
                            <p className="text-muted">{address}</p>
                            <hr />
                            <strong><i className="fa fa-user-secret mr-1" /> Description</strong>
                            <p className="text-muted">{description}</p>
                        </div>
                    </div>
                    {/* Document download link */}
                    {(scope === AGENT_SCOPE && document) &&
                        <div className="card custom-card-outline">
                            <div className="card-body">
                                <strong><i className="fa fa-file mr-1" /> Document</strong>
                                <p className="text-muted">
                                    <a download
                                       target='_blank'
                                       href={document}
                                       rel='noopener noreferrer'
                                       className="btn btn-theme mt-2 btn-dark"
                                    >
                                        Apperçus <i className='fa fa-eye' />
                                    </a>
                                </p>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

// Prop types to ensure destroyed props data type
UsersDetail.propTypes = {
    scope: PropTypes.string.isRequired
};

export default React.memo(UsersDetail);

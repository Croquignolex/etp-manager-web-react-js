import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../../components/Loader";
import Header from "../../../../components/app/Header";
import CustomModal from "../../../../components/Modal";
import ErrorAlert from "../../../../components/ErrorAlert";
import TableSearch from "../../../../components/TableSearch";
import LittleLoader from "../../../../components/LittleLoader";
import {storeResetErrorData} from "../../../../redux/errors/actions";
import RequestsFleetsHigherOrder from "../../../../components/layout/RequestsFleetsHigherOrder";
import {emitFleetCancelByAgent, emitFleetCancelByCollector} from "../../../../redux/fleets/actions";
import {
    DANGER,
    PENDING,
    AGENT_ROLE,
    FLEETS_SCOPE,
    COLLECTOR_ROLE,
    COLLECTOR_AGENT_ROLE,
    REQUESTS_FLEET_NEW_PAGE,
    ADMIN_MANAGER_COLLECTOR_ROLE,
    REQUESTS_FLEET_NEW_PAGE_PATH,
    REQUESTS_FLEET_EDIT_PAGE_PATH,
} from "../../../../helpers/constants";
import {
    dateToString,
    needleSearch,
    formatNumber,
    shouldShowError,
    processingRequest,
    fleetTypeBadgeColor,
} from "../../../../helpers/functions";
import {
    UserContext,
    FleetsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext
} from "../../../../helpers/contexts";

// Component
function RequestsFleetsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [cancelModal, setCancelModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const user = useContext(UserContext);
    const fleets = useContext(FleetsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = FLEETS_SCOPE;
    const agentProcess = AGENT_ROLE.includes(user.role.name);
    const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
    const collectorAgentProcess = COLLECTOR_AGENT_ROLE.includes(user.role.name);
    const adminManagerCollectorProcess = ADMIN_MANAGER_COLLECTOR_ROLE.includes(user.role.name);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Trigger when fleet cancel confirmed on modal
    const handleCancel = (id) => {
        setCancelModal({...cancelModal, show: false});
        agentProcess && dispatch(emitFleetCancelByAgent({id}));
        collectorProcess && dispatch(emitFleetCancelByCollector({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-rss'}
                        title={'Demandes de flotte'}
                        listLength={processingRequest(scope, requests.list) ? '?' : fleets.list.length}
                />
                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-12">
                                <div className='card custom-card-outline'>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            {processingRequest(scope, requests.list) ? <Loader/> : (
                                                <>
                                                    {shouldShowError(scope, errors.list) &&
                                                        <ErrorAlert scope={scope} />
                                                    }
                                                    {collectorAgentProcess &&
                                                        <Link className='btn btn-theme btn-dark' to={REQUESTS_FLEET_NEW_PAGE_PATH}>
                                                            <i className='fa fa-plus' /> {REQUESTS_FLEET_NEW_PAGE}
                                                        </Link>
                                                    }
                                                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                    <div className="table-responsive">
                                                        <table className="table table-hover text-nowrap table-bordered">
                                                            <thead className='bg-theme'>
                                                                <tr>
                                                                    <th>CREER LE</th>
                                                                    <th>MONTANT</th>
                                                                    <th>RESTE</th>
                                                                    <th>PUCE</th>
                                                                    {adminManagerCollectorProcess && <th>AGENT</th>}
                                                                    <th>DEMANDEUR</th>
                                                                    <th>STATUS</th>
                                                                    <th>ACTIONS</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {searchEngine(fleets.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                        <td className='text-right text-danger'>{formatNumber(item.remaining)}</td>
                                                                        <td>{item.sim.number}</td>
                                                                        {adminManagerCollectorProcess && <td>{item.agent.name}</td>}
                                                                        <td>{item.claimant.id === user.id ? 'Moi' : item.claimant.name}</td>
                                                                        <td className='text-center'>
                                                                            <span className={`badge badge-${fleetTypeBadgeColor(item.status).color}`}>
                                                                                {fleetTypeBadgeColor(item.status).text}
                                                                            </span>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            {item.actionLoader ? <LittleLoader/> :
                                                                                <>
                                                                                    <Link className='btn btn-sm btn-primary'
                                                                                          to={{pathname: `${REQUESTS_FLEET_EDIT_PAGE_PATH}/${item.id}`}}>
                                                                                        <i className='fa fa-eye' />
                                                                                    </Link>&nbsp;
                                                                                    {(item.status === PENDING && collectorAgentProcess && (item.claimant.id === user.id)) &&
                                                                                        <button
                                                                                            className='btn btn-sm btn-danger'
                                                                                            onClick={() => setCancelModal({
                                                                                                show: true,
                                                                                                type: DANGER,
                                                                                                id: item.id,
                                                                                                header: 'Annulation',
                                                                                                body: `
                                                                                                    Annuler la demande de flotte de ${item.amount}
                                                                                                    pour la puce ${item.sim.number}?
                                                                                                `
                                                                                            })}
                                                                                        >
                                                                                            <i className='fa fa-trash'/>
                                                                                        </button>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                            {searchEngine(fleets.list, needle).length === 0 &&
                                                                <tr>
                                                                    <td colSpan={8}>
                                                                        <div className='alert alert-info text-center'>
                                                                            Pas de demandes de flottes
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <CustomModal modal={cancelModal}
                         handleModal={handleCancel}
                         handleClose={() =>
                             setCancelModal({...cancelModal, show: false})
                         }
            />
        </>
    )
}

// Search engine
function searchEngine(data, _needle) {
    // Avoid empty filtering
    if(_needle !== '' && _needle !== undefined) {
        // Filter
        data = data.filter((item) => {
            return (
                needleSearch(item.number, _needle) ||
                needleSearch(item.amount, _needle) ||
                needleSearch(item.reference, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.claimant.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(formatNumber(item.remaining), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default RequestsFleetsHigherOrder(RequestsFleetsPage);

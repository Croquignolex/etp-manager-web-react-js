import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import CustomModal from "../../../components/Modal";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import LittleLoader from "../../../components/LittleLoader";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitConfirmFleetRecovery} from "../../../redux/recoveries/actions";
import RecoveriesHigherOrder from "../../../components/layout/RecoveriesHigherOrder";
import RecoveriesFleetNew from "../../../components/app/recoveries/RecoveriesFleetNew";
import {
    dateToString,
    formatNumber,
    needleSearch,
    shouldShowError,
    processingRequest,
    fleetTypeBadgeColor,
} from "../../../helpers/functions";
import {
    SUCCESS,
    AGENT_ROLE,
    PROCESSING,
    MANAGER_ROLE,
    COLLECTOR_ROLE,
    MANAGER_COLLECTOR_ROLE,
    FLEETS_RECOVERIES_SCOPE,
} from "../../../helpers/constants";
import {
    UserContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    RecoveriesContext
} from "../../../helpers/contexts";

// Component
function RecoveriesFleetsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [recoveryModal, setRecoveryModal] = useState({show: false, header: ''});
    const [confirmModal, setConfirmModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);
    const recoveries = useContext(RecoveriesContext);

    // Data
    const scope = FLEETS_RECOVERIES_SCOPE;
    const agentProcess = AGENT_ROLE.includes(user.role.name);
    const managerProcess = MANAGER_ROLE.includes(user.role.name);
    const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
    const managerCollectorProcess = MANAGER_COLLECTOR_ROLE.includes(user.role.name);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Trigger when confirm on modal
    const handleConfirm = (id) => {
        setConfirmModal({...confirmModal, show: false});
        dispatch(emitConfirmFleetRecovery({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-rss'}
                        title={"Retour flotte"}
                        listLength={processingRequest(scope, requests.list) ? '?' : recoveries.list.length}
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
                                                    {managerCollectorProcess &&
                                                        <button className='btn btn-theme btn-dark'
                                                                onClick={() => setRecoveryModal({
                                                                    show: true,
                                                                    header: 'EFFECTUER UN RETOUR FLOTTE'
                                                                })}
                                                        >
                                                            <i className='fa fa-plus' /> Effectuer un retour flotte
                                                        </button>
                                                    }
                                                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                    <div className="table-responsive">
                                                        <table className="table table-hover text-nowrap table-bordered">
                                                            <thead className='bg-theme'>
                                                                <tr>
                                                                    <th>CREER LE</th>
                                                                    <th>MONTANT</th>
                                                                    <th>PUCE AGENT</th>
                                                                    <th>PUCE FLOTTAGE</th>
                                                                    {!agentProcess && <th>AGENT</th>}
                                                                    {!collectorProcess && <th>RESPONSABLE</th>}
                                                                    <th>STATUS</th>
                                                                    {managerProcess && <th>ACTIONS</th>}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {searchEngine(recoveries.list, needle).map((item, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{dateToString(item.creation)}</td>
                                                                            <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                            <td>{item.sim_outgoing.number}</td>
                                                                            <td>{item.sim_incoming.number}</td>
                                                                            {!agentProcess && <td>{item.agent.name}</td>}
                                                                            {!collectorProcess && <td>{item.collector.name}</td>}
                                                                            <td className='text-center'>
                                                                                <span className={`badge badge-${fleetTypeBadgeColor(item.status).color}`}>
                                                                                    {fleetTypeBadgeColor(item.status).text}
                                                                                </span>
                                                                            </td>
                                                                            {managerProcess &&
                                                                                <td className='text-center'>
                                                                                    {(PROCESSING === item.status) && (
                                                                                        item.actionLoader ? <LittleLoader /> :
                                                                                            <button className='btn btn-sm btn-success'
                                                                                                    onClick={() => setConfirmModal({
                                                                                                        show: true,
                                                                                                        type: SUCCESS,
                                                                                                        id: item.id,
                                                                                                        header: 'Confirmation',
                                                                                                        body: `
                                                                                                            Confirmer le retour flotte de ${item.amount}
                                                                                                            de l'agent ${item.agent.name}?
                                                                                                        `
                                                                                                    })}
                                                                                            >
                                                                                                <i className='fa fa-check' />
                                                                                            </button>
                                                                                    )}
                                                                                </td>
                                                                            }
                                                                        </tr>
                                                                    )
                                                                })}
                                                                {searchEngine(recoveries.list, needle).length === 0 &&
                                                                    <tr>
                                                                        <td colSpan={9}>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas de retour flotte
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
            {/* Modals */}
            <CustomModal modal={confirmModal}
                         handleModal={handleConfirm}
                         handleClose={() =>
                             setConfirmModal({...confirmModal, show: false})
                         }
            />
            <FormModal modal={recoveryModal} handleClose={() => setRecoveryModal({...recoveryModal, show: false})}>
                <RecoveriesFleetNew handleClose={() => setRecoveryModal({...recoveryModal, show: false})} />
            </FormModal>
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
                needleSearch(item.amount, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.collector.name, _needle) ||
                needleSearch(item.sim_incoming.number, _needle) ||
                needleSearch(item.sim_outgoing.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default RecoveriesHigherOrder(RecoveriesFleetsPage);

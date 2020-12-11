import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import CustomModal from "../../../components/Modal";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitConfirmCashRecovery} from "../../../redux/recoveries/actions";
import RecoveriesHigherOrder from "../../../components/layout/RecoveriesHigherOrder";
import RecoveriesCashNew from "../../../components/app/recoveries/RecoveriesCashNew";
import {
    dateToString,
    formatNumber,
    needleSearch,
    shouldShowError,
    processingRequest,
    fleetTypeBadgeColor,
} from "../../../helpers/functions";
import {
    AGENT_ROLE,
    COLLECTOR_ROLE,
    CASH_RECOVERIES_SCOPE,
} from "../../../helpers/constants";
import {
    UserContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    RecoveriesContext
} from "../../../helpers/contexts";

// Component
function RecoveriesCashPage() {
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
    const scope = CASH_RECOVERIES_SCOPE;
    const agentProcess = AGENT_ROLE.includes(user.role.name);
    const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);

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
        dispatch(emitConfirmCashRecovery({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-money'}
                        title={"Récouvrement d'espèces"}
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
                                                    {collectorProcess &&
                                                        <button className='btn btn-theme btn-dark'
                                                                onClick={() => setRecoveryModal({
                                                                    show: true,
                                                                    header: 'EFFECTUER UN RECOUVREMENT'
                                                                })}
                                                        >
                                                            <i className='fa fa-plus' /> Effectuer un recouvrement
                                                        </button>
                                                    }
                                                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                    <div className="table-responsive">
                                                        <table className="table table-hover text-nowrap table-bordered">
                                                            <thead className='bg-theme'>
                                                                <tr>
                                                                    <th>CREER LE</th>
                                                                    <th>MONTANT</th>
                                                                    {!agentProcess && <th>AGENT</th>}
                                                                    {!collectorProcess && <th>RESPONSABLE</th>}
                                                                    <th>STATUS</th>
                                                                    <th>RECU</th>
                                                                    {/*{managerProcess && <th>ACTIONS</th>}*/}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {searchEngine(recoveries.list, needle).map((item, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{dateToString(item.creation)}</td>
                                                                            <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                            {!agentProcess && <td>{item.agent.name}</td>}
                                                                            {!collectorProcess && <td>{item.collector.name}</td>}
                                                                            <td className='text-center'>
                                                                                <span className={`badge badge-${fleetTypeBadgeColor(item.status).color}`}>
                                                                                    {fleetTypeBadgeColor(item.status).text}
                                                                                </span>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                {item.receipt &&
                                                                                    <a download
                                                                                       target='_blank'
                                                                                       href={item.receipt}
                                                                                       rel='noopener noreferrer'
                                                                                       className="btn btn-theme btn-sm btn-dark"
                                                                                    >
                                                                                        <i className='fa fa-eye' />
                                                                                    </a>
                                                                                }
                                                                            </td>
                                                                            {/*{managerProcess &&
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
                                                                                                        Confirmer le recouvrement de ${item.amount}
                                                                                                        de l'agent ${item.agent.name}?
                                                                                                    `
                                                                                                    })}
                                                                                            >
                                                                                                <i className='fa fa-check' />
                                                                                            </button>
                                                                                    )}
                                                                                </td>
                                                                            }*/}
                                                                        </tr>
                                                                    )
                                                                })}
                                                                {searchEngine(recoveries.list, needle).length === 0 &&
                                                                    <tr>
                                                                        <td colSpan={7}>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas de recouvrement d'espèces
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
                <RecoveriesCashNew handleClose={() => {setRecoveryModal({...recoveryModal, show: false})}} />
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
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default RecoveriesHigherOrder(RecoveriesCashPage);

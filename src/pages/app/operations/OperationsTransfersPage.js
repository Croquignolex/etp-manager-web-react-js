import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {storeResetErrorData} from "../../../redux/errors/actions";
import OperationsFleetNewTransfer from "../../../components/app/operations/OperationsFleetNewTransfer";
import OperationsTransfersHigherOrder from "../../../components/layout/OperationsTransfersHigherOrder";
import {
    dateToString,
    formatNumber,
    needleSearch,
    shouldShowError,
    processingRequest,
    fleetTypeBadgeColor,
} from "../../../helpers/functions";
import {
    TRANSFERS_SCOPE,
    OPERATIONS_TRANSFERS_PAGE,
    ADMIN_MANAGER_COLLECTOR_ROLE,
} from "../../../helpers/constants";
import {
    UserContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    TransfersContext
} from "../../../helpers/contexts";

// Component
function OperationsTransfersPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [transferModal, setTransferModal] = useState({show: false, header: ''});

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);
    const transfers = useContext(TransfersContext);

    // Data
    const scope = TRANSFERS_SCOPE;
    const adminManagerCollectorProcess = ADMIN_MANAGER_COLLECTOR_ROLE.includes(user.role.name);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <div className="content-wrapper">
            <Header icon={'fa fa-exchange'}
                    title={OPERATIONS_TRANSFERS_PAGE}
                    listLength={processingRequest(scope, requests.list) ? '?' : transfers.list.length}
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
                                                {adminManagerCollectorProcess &&
                                                    <button className='btn btn-theme btn-dark'
                                                            onClick={() => setTransferModal({
                                                                show: true,
                                                                header: 'EFFECTUER UN TRANSFERT'
                                                            })}
                                                    >
                                                        <i className='fa fa-plus' /> Effectuer un transfert
                                                    </button>
                                                }
                                                <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                <div className="table-responsive">
                                                    <table className="table table-hover text-nowrap table-bordered">
                                                        <thead className='bg-theme'>
                                                            <tr>
                                                                <th>CREER LE</th>
                                                                <th>INITIATEUR</th>
                                                                <th>MONTANT</th>
                                                                <th>DE LA PUCE</th>
                                                                <th>VERS LA PUCEE</th>
                                                                <th>STATUS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {searchEngine(transfers.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td>{item.supervisor.id === user.id ? 'Moi' : item.supervisor.name}</td>
                                                                        <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                        <td>{item.sim_outgoing.name} ({item.sim_outgoing.number})</td>
                                                                        <td>{item.sim_incoming.name} ({item.sim_incoming.number})</td>
                                                                        <td className="text-center">
                                                                            <span className={`badge badge-${fleetTypeBadgeColor(item.status).color}`}>
                                                                                {fleetTypeBadgeColor(item.status).text}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                            {searchEngine(transfers.list, needle).length === 0 &&
                                                                <tr>
                                                                    <td colSpan={9}>
                                                                        <div className='alert alert-info text-center'>
                                                                            Pas de transferts de flotte
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
            {/* Modal */}
            <FormModal modal={transferModal} handleClose={() => setTransferModal({...transferModal, show: false})}>
                <OperationsFleetNewTransfer handleClose={() => setTransferModal({...transferModal, show: false})} />
            </FormModal>
        </div>
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
                needleSearch(item.supervisor.name, _needle) ||
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

export default OperationsTransfersHigherOrder(OperationsTransfersPage);

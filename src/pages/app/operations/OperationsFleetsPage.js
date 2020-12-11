import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {storeResetErrorData} from "../../../redux/errors/actions";
import RecoveriesCashNew from "../../../components/app/recoveries/RecoveriesCashNew";
import RecoveriesFleetNew from "../../../components/app/recoveries/RecoveriesFleetNew";
import OperationsFleetsHigherOrder from "../../../components/layout/OperationsFleetsHigherOrder";
import OperationsFleetNewSupply from "../../../components/app/operations/OperationsFleetNewSupply";
import {
    dateToString,
    formatNumber,
    needleSearch,
    shouldShowError,
    processingRequest,
    fleetTypeBadgeColor,
} from "../../../helpers/functions";
import {
    DONE,
    AGENT_ROLE,
    SUPPLIES_SCOPE,
    COLLECTOR_ROLE,
    ADMIN_MANAGER_ROLE,
    OPERATIONS_FLEETS_PAGE,
    MANAGER_COLLECTOR_AGENT_ROLE,
} from "../../../helpers/constants";
import {
    UserContext,
    ErrorsContext,
    SuppliesContext,
    DispatchContext,
    RequestsContext
} from "../../../helpers/contexts";

// Component
function OperationsFleetsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [selectedSupply, setSelectedSupply] = useState({});
    const [supplyModal, setSupplyModal] = useState({show: false, header: ''});
    const [fleetRecoveryModal, setFleetRecoveryModal] = useState({show: false, header: ''});
    const [cashRecoveryCashModal, setCashRecoveryModal] = useState({show: false, header: ''});

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const supplies = useContext(SuppliesContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = SUPPLIES_SCOPE;
    const agentProcess = AGENT_ROLE.includes(user.role.name);
    const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
    const adminManagerProcess = ADMIN_MANAGER_ROLE.includes(user.role.name);
    const managerCollectorAgentProcess = MANAGER_COLLECTOR_AGENT_ROLE.includes(user.role.name);

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
            <Header icon={'fa fa-rss'}
                    title={OPERATIONS_FLEETS_PAGE}
                    listLength={processingRequest(scope, requests.list) ? '?' : supplies.list.length}
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
                                                {adminManagerProcess &&
                                                    <button className='btn btn-theme btn-dark'
                                                            onClick={() => setSupplyModal({
                                                                show: true,
                                                                header: 'EFFECTUER UN FLOTTAGE'
                                                            })}
                                                    >
                                                        <i className='fa fa-plus' /> Effectuer un flottage
                                                    </button>
                                                }
                                                <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                <div className="table-responsive">
                                                    <table className="table table-hover text-nowrap table-bordered">
                                                        <thead className='bg-theme'>
                                                            <tr>
                                                                <th>CREER LE</th>
                                                                <th>MONTANT</th>
                                                                <th>DETTE</th>
                                                                <th>PUCE FLOTTAGE</th>
                                                                <th>PUCE AGENT</th>
                                                                {!agentProcess && <th>AGENT</th>}
                                                                <th>GESTIONNAIRE</th>
                                                                <th>STATUS</th>
                                                                {managerCollectorAgentProcess && <th>ACTIONS</th>}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {searchEngine(supplies.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                        <td className='text-right text-danger'>{formatNumber(item.remaining)}</td>
                                                                        <td>{item.sim_outgoing.number}</td>
                                                                        <td>{item.sim_incoming.number}</td>
                                                                        {!agentProcess && <td>{item.agent.name}</td>}
                                                                        <td>{item.supplier.id === user.id ? 'Moi' : item.supplier.name}</td>
                                                                        <td className="text-center">
                                                                            <span className={`badge badge-${fleetTypeBadgeColor(item.status).color}`}>
                                                                                {fleetTypeBadgeColor(item.status).text}
                                                                            </span>
                                                                        </td>
                                                                        {managerCollectorAgentProcess &&
                                                                            <td className='text-center'>
                                                                                {(DONE !== item.status) && (
                                                                                    <>
                                                                                        {collectorProcess &&
                                                                                            <>
                                                                                                <button className='btn btn-sm btn-primary'
                                                                                                        onClick={() => {
                                                                                                            setSelectedSupply(item)
                                                                                                            setCashRecoveryModal({
                                                                                                                show: true,
                                                                                                                header: "EFFECTUER UN RECOUVREMENT D'ESPECE"
                                                                                                            })
                                                                                                        }}
                                                                                                >
                                                                                                    <i className='fa fa-dollar-sign' />
                                                                                                </button> &nbsp;
                                                                                            </>
                                                                                        }
                                                                                        <button className='btn btn-sm btn-success'
                                                                                                onClick={() => {
                                                                                                    setSelectedSupply(item)
                                                                                                    setFleetRecoveryModal({
                                                                                                        show: true,
                                                                                                        header: 'EFFECTUER UN RETOUR FLOTTE'
                                                                                                    })
                                                                                                }}
                                                                                        >
                                                                                            <i className='fa fa-phone' />
                                                                                        </button>
                                                                                    </>
                                                                                )}
                                                                            </td>
                                                                        }
                                                                    </tr>
                                                                )
                                                            })}
                                                            {searchEngine(supplies.list, needle).length === 0 &&
                                                                <tr>
                                                                    <td colSpan={9}>
                                                                        <div className='alert alert-info text-center'>
                                                                            Pas de flottages
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
            <FormModal modal={supplyModal} handleClose={() => setSupplyModal({...supplyModal, show: false})}>
                <OperationsFleetNewSupply handleClose={() => setSupplyModal({...supplyModal, show: false})} />
            </FormModal>
            <FormModal modal={cashRecoveryCashModal} handleClose={() => setCashRecoveryModal({...cashRecoveryCashModal, show: false})}>
                <RecoveriesCashNew selectedSupply={selectedSupply}  handleClose={() => setCashRecoveryModal({...cashRecoveryCashModal, show: false})} />
            </FormModal>
            <FormModal modal={fleetRecoveryModal} handleClose={() => setFleetRecoveryModal({...fleetRecoveryModal, show: false})}>
                <RecoveriesFleetNew selectedSupply={selectedSupply} handleClose={() => setFleetRecoveryModal({...fleetRecoveryModal, show: false})} />
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
                needleSearch(item.remaining, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.supplier.name, _needle) ||
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

export default OperationsFleetsHigherOrder(OperationsFleetsPage);

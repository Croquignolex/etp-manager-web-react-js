import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {SUPPLIES_SCOPE, OPERATIONS_FLEETS_PAGE} from "../../../helpers/constants";
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
    ErrorsContext,
    SuppliesContext,
    DispatchContext,
    RequestsContext
} from "../../../helpers/contexts";

// Component
function NetworkFleetsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [supplyModal, setSupplyModal] = useState({show: false, header: ''});

    // Context states
    const errors = useContext(ErrorsContext);
    const supplies = useContext(SuppliesContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = SUPPLIES_SCOPE;

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
                                                <button className='btn btn-theme btn-dark'
                                                        onClick={() => setSupplyModal({
                                                            show: true,
                                                            header: 'EFFECTUER UN FLOTTAGE'
                                                        })}
                                                >
                                                    <i className='fa fa-plus' /> Effectuer un flottage
                                                </button>
                                                <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                <div className="table-responsive">
                                                    <table className="table table-hover text-nowrap table-bordered">
                                                        <thead className='bg-theme'>
                                                            <tr>
                                                                <th>CREER LE</th>
                                                                <th>MONTANT</th>
                                                                <th>PUCE AGENT</th>
                                                                <th>AGENT</th>
                                                                <th>STATUS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {searchEngine(supplies.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                        <td>{item.sim_incoming.number}</td>
                                                                        <td>{item.agent.name}</td>
                                                                        <td className="text-center">
                                                                            <span className={`badge badge-${fleetTypeBadgeColor(item.status).color}`}>
                                                                                {fleetTypeBadgeColor(item.status).text}
                                                                            </span>
                                                                        </td>
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
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.sim_outgoing.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default OperationsFleetsHigherOrder(NetworkFleetsPage);

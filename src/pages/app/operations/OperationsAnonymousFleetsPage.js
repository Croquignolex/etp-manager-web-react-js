import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {OPERATIONS_ANONYMOUS_FLEETS_PAGE, ANONYMOUS_SCOPE} from "../../../helpers/constants";
import OperationsFleetsHigherOrder from "../../../components/layout/OperationsFleetsHigherOrder";
import OperationsFleetNewAnonymousSupply from "../../../components/app/operations/OperationsFleetNewAnonymousSupply";
import {
    dateToString,
    formatNumber,
    needleSearch,
    shouldShowError,
    processingRequest,
    fleetTypeBadgeColor,
} from "../../../helpers/functions";
import {
    UserContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    AnonymousContext
} from "../../../helpers/contexts";

// Component
function OperationsAnonymousFleetsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [supplyModal, setSupplyModal] = useState({show: false, header: ''});

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);
    const anonymous = useContext(AnonymousContext);

    // Data
    const scope = ANONYMOUS_SCOPE;

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
                    title={OPERATIONS_ANONYMOUS_FLEETS_PAGE}
                    listLength={processingRequest(scope, requests.list) ? '?' : anonymous.list.length}
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
                                                                <th>RESPONSABLE</th>
                                                                <th>PUCE FLOTTAGE</th>
                                                                <th>PUCE RECEPTRICE</th>
                                                                <th>RECEPTEUR</th>
                                                                <th>STATUS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {searchEngine(anonymous.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                        <td>{item.claimant.id === user.id ? 'Moi' : item.claimant.name}</td>
                                                                        <td>{item.sim_outgoing.number}</td>
                                                                        <td>{item.receiverSim}</td>
                                                                        <td>{item.receiver}</td>
                                                                        <td className="text-center">
                                                                            <span className={`badge badge-${fleetTypeBadgeColor(item.status).color}`}>
                                                                                {fleetTypeBadgeColor(item.status).text}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                            {searchEngine(anonymous.list, needle).length === 0 &&
                                                                <tr>
                                                                    <td colSpan={9}>
                                                                        <div className='alert alert-info text-center'>
                                                                            Pas de flottages anonyme
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
                <OperationsFleetNewAnonymousSupply handleClose={() => setSupplyModal({...supplyModal, show: false})} />
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
                needleSearch(item.receiver, _needle) ||
                needleSearch(item.receiverSim, _needle) ||
                needleSearch(item.claimant.name, _needle) ||
                needleSearch(item.sim_outgoing.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default OperationsFleetsHigherOrder(OperationsAnonymousFleetsPage);

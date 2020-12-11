import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {storeResetErrorData} from "../../../redux/errors/actions";
import CheckoutNewOutlay from "../../../components/app/checkout/CheckoutNewOutlay";
import CheckoutOutlaysHigherOrder from "../../../components/layout/CheckoutOutlaysHigherOrder";
import {
    MANAGER_ROLE,
    OUTLAYS_SCOPE,
    CHECKOUT_OUTlAYS_PAGE
} from "../../../helpers/constants";
import {
    dateToString,
    formatNumber,
    needleSearch,
    shouldShowError,
    processingRequest,
} from "../../../helpers/functions";
import {
    UserContext,
    ErrorsContext,
    OutlaysContext,
    DispatchContext,
    RequestsContext,
} from "../../../helpers/contexts";

// Component
function CheckoutPaymentsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [paymentModal, setPaymentModal] = useState({show: false, header: ''});

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const outlays = useContext(OutlaysContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = OUTLAYS_SCOPE;
    const managerProcess = MANAGER_ROLE.includes(user.role.name);

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
            <Header icon={'fa fa-arrow-circle-down'}
                    title={CHECKOUT_OUTlAYS_PAGE}
                    listLength={processingRequest(scope, requests.list) ? '?' : outlays.list.length}
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
                                                {managerProcess &&
                                                    <button className='btn btn-theme btn-dark'
                                                            onClick={() => setPaymentModal({
                                                                show: true,
                                                                header: 'EFFECTUER UN DECAISSEMENT'
                                                            })}
                                                    >
                                                        <i className='fa fa-plus'/> Effectuer un décaissement
                                                    </button>
                                                }
                                                <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                <div className="table-responsive">
                                                    <table className="table table-hover text-nowrap table-bordered">
                                                        <thead className='bg-theme'>
                                                            <tr>
                                                                <th>CREER LE</th>
                                                                <th>MONTANT</th>
                                                                <th>GESTIONNAIRE</th>
                                                                <th>RESPONSABLE</th>
                                                                <th>RECUS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {searchEngine(outlays.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                        <td>{item.manager.id === user.id ? 'Moi' : item.manager.name}</td>
                                                                        <td>{item.collector.id === user.id ? 'Moi' : item.collector.name}</td>
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
                                                                    </tr>
                                                                )
                                                            })}
                                                            {searchEngine(outlays.list, needle).length === 0 &&
                                                                <tr>
                                                                    <td colSpan={9}>
                                                                        <div className='alert alert-info text-center'>
                                                                            Pas de décaissements
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
            <FormModal modal={paymentModal} handleClose={() => setPaymentModal({...paymentModal, show: false})}>
                <CheckoutNewOutlay handleClose={() => setPaymentModal({...paymentModal, show: false})} />
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
                needleSearch(item.manager.name, _needle) ||
                needleSearch(item.collector.name, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default CheckoutOutlaysHigherOrder(CheckoutPaymentsPage);

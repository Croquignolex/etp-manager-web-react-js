import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {HANDING_OVER_PAGE, HANDOVERS_SCOPE} from "../../../helpers/constants";
import HandingOverHigherOrder from "../../../components/layout/CheckoutHandingOversHigherOrder";
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
    DispatchContext,
    RequestsContext,
    HandoversContext
} from "../../../helpers/contexts";
import CheckoutNewHandingOver from "../../../components/app/checkout/CheckoutNewHandingOver";

// Component
function HandingOverPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [handingModal, setHandingModal] = useState({show: false, header: ''});

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);
    const handovers = useContext(HandoversContext);

    // Data
    const scope = HANDOVERS_SCOPE;

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
            <Header icon={'fa fa-handshake'}
                    title={HANDING_OVER_PAGE}
                    listLength={processingRequest(scope, requests.list) ? '?' : handovers.list.length}
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
                                                        onClick={() => setHandingModal({
                                                            show: true,
                                                            header: 'EFFECTUER UNE PASSATION DE SERVICE'
                                                        })}
                                                >
                                                    <i className='fa fa-plus'/> Effectuer une passation de service
                                                </button>
                                                <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                <div className="table-responsive">
                                                    <table className="table table-hover text-nowrap table-bordered">
                                                        <thead className='bg-theme'>
                                                            <tr>
                                                                <th>CREER LE</th>
                                                                <th>MONTANT</th>
                                                                <th>EMETTEUR</th>
                                                                <th>RECEPTEUR</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {searchEngine(handovers.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td className='text-right'>{formatNumber(item.amount)}</td>
                                                                        <td>{item.sender.id === user.id ? 'Moi' : item.sender.name}</td>
                                                                        <td>{item.receiver.id === user.id ? 'Moi' : item.receiver.name}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                            {searchEngine(handovers.list, needle).length === 0 &&
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <div className='alert alert-info text-center'>
                                                                            Pas de passation de service
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
            <FormModal modal={handingModal} handleClose={() => setHandingModal({...handingModal, show: false})}>
                <CheckoutNewHandingOver handleClose={() => setHandingModal({...handingModal, show: false})} />
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

export default HandingOverHigherOrder(HandingOverPage);

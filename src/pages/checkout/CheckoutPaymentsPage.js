import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import ConfirmModalComponent from "../../components/modals/ConfirmModalComponent";
import {CHECKOUT_INTERNAL_PAYMENTS_PAGE} from "../../constants/pageNameConstants";
import CheckoutPaymentsCardsComponent from "../../components/checkout/CheckoutPaymentsCardsComponent";
import OperationsGroupPaymentsCardsComponent from "../../components/checkout/OperationsGroupPaymentsCardsComponent";
import {
    emitPaymentsFetch,
    emitConfirmPayment,
    emitNextPaymentsFetch,
    emitGroupPaymentsFetch,
    emitGroupConfirmPayment
} from "../../redux/payments/actions";
import {
    storePaymentsRequestReset,
    storeNextPaymentsRequestReset,
    storeConfirmPaymentRequestReset
} from "../../redux/requests/payments/actions";
import {
    applySuccess,
    dateToString,
    formatNumber,
    needleSearch,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";

// Component
function CheckoutPaymentsPage({payments, paymentsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [groupToggle, setGroupToggle] = useState(false);
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});
    const [groupConfirmModal, setGroupConfirmModal] = useState({show: false, body: '', id: []});
    const [groupDetailModal, setGroupDetailModal] = useState({show: false, header: "DETAIL DE L'ENCAISSEMENT INTERNE GROUPE", item: {}});

    // Local effects
    useEffect(() => {
        dispatch(emitPaymentsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(paymentsRequests.apply)) {
            applySuccess(paymentsRequests.apply.message);
        }
        // eslint-disable-next-line
    }, [paymentsRequests.apply]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storePaymentsRequestReset());
        dispatch(storeNextPaymentsRequestReset());
        dispatch(storeConfirmPaymentRequestReset());
    };

    // Fetch next payments data to enhance infinite scroll
    const handleNextPaymentsData = () => {
        dispatch(emitNextPaymentsFetch({page}));
    }

    // Show confirm modal form
    const handleConfirmModalShow = ({id, amount, collector}) => {
        setConfirmModal({...confirmModal, id, body: `Confirmer l'encaissement de ${collector.name} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide confirm modal form
    const handleConfirmModalHide = () => {
        setConfirmModal({...confirmModal, show: false})
    }

    // Show group supply modal form
    const handleGroupConfirmModalShow = (item) => {
        const ids = [];
        item.forEach(item => {
            ids.push(item.id);
        });
        const amount = item.reduce((acc, val) => acc + parseInt(val.amount, 10), 0);
        setGroupConfirmModal({...groupConfirmModal, id: ids, body: `Confirmer l'encaissement groupée de ${item[0].manager.name} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide group supply modal form
    const handleGroupConfirmModalHide = () => {
        setGroupConfirmModal({...groupConfirmModal, show: false})
    }

    // Show group detail modal form
    const handleGroupDetailsModalShow = (item) => {
        setGroupDetailModal({...groupDetailModal, item, show: true})
    }

    // Hide group detail modal form
    const handleGroupDetailsModalHide = () => {
        setGroupDetailModal({...groupDetailModal, show: false})
    }

    const handleGroup = () => {
        dispatch(emitGroupPaymentsFetch());
        setGroupToggle(true);
        setNeedle('');
    }

    const handleUngroup = () => {
        dispatch(emitPaymentsFetch());
        setGroupToggle(false);
        setNeedle('');
    }

    // Trigger when group transfer confirm confirmed on modal
    const handleGroupConfirm = (id) => {
        handleGroupConfirmModalHide();
        dispatch(emitGroupConfirmPayment({ids: id}));
    };

    // Trigger when clearance confirm confirmed on modal
    const handleConfirm = (id) => {
        handleConfirmModalHide();
        dispatch(emitConfirmPayment({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={CHECKOUT_INTERNAL_PAYMENTS_PAGE} icon={'fa fa-arrow-circle-down'} />
                    <section className="content">
                        <div className='container-fluid'>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card custom-card-outline">
                                        {/* Search input */}
                                        <div className="card-header">
                                            <div className="card-tools">
                                                <TableSearchComponent needle={needle} handleNeedle={handleNeedleInput} />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {/* Error message */}
                                            {requestFailed(paymentsRequests.list) && <ErrorAlertComponent message={paymentsRequests.list.message} />}
                                            {requestFailed(paymentsRequests.next) && <ErrorAlertComponent message={paymentsRequests.next.message} />}
                                            {requestFailed(paymentsRequests.apply) && <ErrorAlertComponent message={paymentsRequests.apply.message} />}
                                            {(groupToggle) ?
                                                ((requestLoading(paymentsRequests.list) || requestLoading(paymentsRequests.apply)) ? <LoaderComponent /> :
                                                    <>
                                                        <button type="button"
                                                                className="btn btn-secondary mb-2 ml-2"
                                                                onClick={handleUngroup}
                                                        >
                                                            <i className="fa fa-table" /> Dégrouper
                                                        </button>
                                                        <OperationsGroupPaymentsCardsComponent payments={groupSearchEngine(payments, needle)}
                                                                                               handleGroupConfirmModalShow={handleGroupConfirmModalShow}
                                                                                               handleGroupDetailsModalShow={handleGroupDetailsModalShow}
                                                        />
                                                    </>
                                                ) :
                                                (
                                                    (requestLoading(paymentsRequests.list) ? <LoaderComponent /> :
                                                        <>
                                                            <button type="button"
                                                                    className="btn btn-danger mb-2 ml-2"
                                                                    onClick={handleGroup}
                                                            >
                                                                <i className="fa fa-table"/> Grouper
                                                            </button>
                                                            {/* Search result & Infinite scroll */}
                                                            {(needle !== '' && needle !== undefined)
                                                                ? (
                                                                    <CheckoutPaymentsCardsComponent payments={searchEngine(payments, needle)}
                                                                                                  handleConfirmModalShow={handleConfirmModalShow}
                                                                    />
                                                                ) : (
                                                                    <InfiniteScroll hasMore={hasMoreData}
                                                                                    loader={<LoaderComponent />}
                                                                                    dataLength={payments.length}
                                                                                    next={handleNextPaymentsData}
                                                                                    style={{ overflow: 'hidden' }}
                                                                    >
                                                                        <CheckoutPaymentsCardsComponent payments={payments}
                                                                                                        handleConfirmModalShow={handleConfirmModalShow}
                                                                        />
                                                                    </InfiniteScroll>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </AppLayoutContainer>
            {/* Modal */}
            <ConfirmModalComponent modal={confirmModal}
                                   handleModal={handleConfirm}
                                   handleClose={handleConfirmModalHide}
            />
            <ConfirmModalComponent modal={groupConfirmModal}
                                   handleModal={handleGroupConfirm}
                                   handleClose={handleGroupConfirmModalHide}
            />
            <FormModalComponent modal={groupDetailModal} handleClose={handleGroupDetailsModalHide}>
                <CheckoutPaymentsCardsComponent group payments={groupDetailModal.item} />
            </FormModalComponent>
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
                needleSearch(item.manager.name, _needle) ||
                needleSearch(item.collector.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Search engine
function groupSearchEngine(data, _needle) {
    // Avoid empty filtering
    if(_needle !== '' && _needle !== undefined) {
        // Filter
        data = data.filter((item) => {
            return (
                needleSearch(item.length, _needle) ||
                needleSearch(item[0].manager.name, _needle) ||
                needleSearch(item.reduce((acc, val) => acc + parseInt(val.amount, 10), 0), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
CheckoutPaymentsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    payments: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    paymentsRequests: PropTypes.object.isRequired,
};

export default React.memo(CheckoutPaymentsPage);

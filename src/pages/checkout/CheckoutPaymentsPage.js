import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import {CHECKOUT_PAYMENTS_PAGE} from "../../constants/pageNameConstants";
import TableSearchComponent from "../../components/TableSearchComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {emitNextPaymentsFetch, emitPaymentsFetch} from "../../redux/payments/actions";
import CheckoutPaymentsCardsComponent from "../../components/checkout/CheckoutPaymentsCardsComponent";
import {storeNextPaymentsRequestReset, storePaymentsRequestReset} from "../../redux/requests/payments/actions";
import CheckoutPaymentsAddPaymentContainer from "../../containers/checkout/CheckoutPaymentsAddPaymentContainer";
import {
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function CheckoutPaymentsPage({payments, paymentsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [paymentModal, setPaymentModal] = useState({show: false, header: 'EFFECTUER UN ENCAISSEMENT'});

    // Local effects
    useEffect(() => {
        dispatch(emitPaymentsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storePaymentsRequestReset());
        dispatch(storeNextPaymentsRequestReset());
    };

    // Fetch next fleets data to enhance infinite scroll
    const handleNextFleetsData = () => {
        dispatch(emitNextPaymentsFetch({page}));
    }

    // Show payment modal form
    const handlePaymentModalShow = (item) => {
        setPaymentModal({...paymentModal, item, show: true})
    }

    // Hide payment modal form
    const handlePaymentModalHide = () => {
        setPaymentModal({...paymentModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={CHECKOUT_PAYMENTS_PAGE} icon={'fa fa-arrow-circle-up'} />
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
                                            <button type="button"
                                                    className="btn btn-info mb-2"
                                                    onClick={handlePaymentModalShow}
                                            >
                                                <i className="fa fa-plus" /> Effectuer un encaissement
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <CheckoutPaymentsCardsComponent payments={searchEngine(payments, needle)} />
                                                : (requestLoading(paymentsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        next={handleNextFleetsData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={payments.length}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <CheckoutPaymentsCardsComponent payments={payments} />
                                                        </InfiniteScroll>
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
            <FormModalComponent modal={paymentModal} handleClose={handlePaymentModalHide}>
                <CheckoutPaymentsAddPaymentContainer handleClose={handlePaymentModalHide} />
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
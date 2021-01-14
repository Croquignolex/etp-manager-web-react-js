import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitFetchUserBalance} from "../../redux/user/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {emitAllManagersFetch} from "../../redux/managers/actions";
import {HANDING_OVER_PAGE} from "../../constants/pageNameConstants";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {emitHandoversFetch, emitNextHandoversFetch} from "../../redux/handovers/actions";
import CheckoutHandoversCardsComponent from "../../components/checkout/CheckoutHandoversCardsComponent";
import {storeHandoversRequestReset, storeNextHandoversRequestReset} from "../../redux/requests/handovers/actions";
import CheckoutHandoversImproveHandoverContainer from "../../containers/checkout/CheckoutHandoversImproveHandoverContainer";
import {
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function CheckoutHandoversPage({handovers, handoversRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [handoverModal, setHandoverModal] = useState({show: false, header: 'EFFECTUER UNE PASSATION DE SERVICE'});

    // Local effects
    useEffect(() => {
        dispatch(emitHandoversFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllManagersFetch());
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
        dispatch(storeHandoversRequestReset());
        dispatch(storeNextHandoversRequestReset());
    };

    // Fetch next handovers data to enhance infinite scroll
    const handleNextHandoversData = () => {
        dispatch(emitNextHandoversFetch({page}));
    }

    // Show handover modal form
    const handleHandoverModalShow = (item) => {
        setHandoverModal({...handoverModal, item, show: true})
    }

    // Hide handover modal form
    const handleHandoverModalHide = () => {
        setHandoverModal({...handoverModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={HANDING_OVER_PAGE} icon={'fa fa-handshake'} />
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
                                            {requestFailed(handoversRequests.list) && <ErrorAlertComponent message={handoversRequests.list.message} />}
                                            {requestFailed(handoversRequests.next) && <ErrorAlertComponent message={handoversRequests.next.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleHandoverModalShow}
                                            >
                                                <i className="fa fa-plus" /> Effectuer une passation de service
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <CheckoutHandoversCardsComponent handovers={searchEngine(handovers, needle)} />
                                                : (requestLoading(handoversRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={handovers.length}
                                                                        next={handleNextHandoversData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <CheckoutHandoversCardsComponent handovers={handovers} />
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
            <FormModalComponent modal={handoverModal} handleClose={handleHandoverModalHide}>
                <CheckoutHandoversImproveHandoverContainer handleClose={handleHandoverModalHide} />
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
                needleSearch(item.sender.name, _needle) ||
                needleSearch(item.receiver.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
CheckoutHandoversPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    handovers: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    handoversRequests: PropTypes.object.isRequired,
};

export default React.memo(CheckoutHandoversPage);
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitAllSimsFetch} from "../../redux/sims/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {OPERATIONS_ANONYMOUS_FLEETS_PAGE} from "../../constants/pageNameConstants";
import {emitAnonymousFetch, emitNextAnonymousFetch} from "../../redux/anonymous/actions";
import {dateToString, needleSearch, requestFailed, requestLoading,} from "../../functions/generalFunctions";
import OperationsAnonymousCardsComponent from "../../components/operations/OperationsAnonymousCardsComponent";
import {storeAnonymousRequestReset, storeNextAnonymousRequestReset} from "../../redux/requests/anonymous/actions";
import OperationsAnonymousAddAnonymousContainer from "../../containers/operations/OperationsAnonymousAddAnonymousContainer";

// Component
function OperationsAnonymousPage({anonymous, anonymousRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [anonymousModal, setAnonymousModal] = useState({show: false, header: 'EFFECTUER UN FLOTTAGE ANONYME'});

    // Local effects
    useEffect(() => {
        dispatch(emitAnonymousFetch());
        dispatch(emitAllSimsFetch());
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
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAnonymousRequestReset());
        dispatch(storeNextAnonymousRequestReset());
    };

    // Fetch next anonymous data to enhance infinite scroll
    const handleNextAnonymousData = () => {
        dispatch(emitNextAnonymousFetch({page}));
    }

    // Show anonymous modal form
    const handleAnonymousModalShow = (item) => {
        setAnonymousModal({...anonymousModal, item, show: true})
    }

    // Hide anonymous modal form
    const handleAnonymousModalHide = () => {
        setAnonymousModal({...anonymousModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_ANONYMOUS_FLEETS_PAGE} icon={'fa fa-rss'} />
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
                                            {requestFailed(anonymousRequests.list) && <ErrorAlertComponent message={anonymousRequests.list.message} />}
                                            {requestFailed(anonymousRequests.next) && <ErrorAlertComponent message={anonymousRequests.next.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleAnonymousModalShow}
                                            >
                                                <i className="fa fa-plus" /> Effectuer flottage anonyme
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <OperationsAnonymousCardsComponent anonymous={searchEngine(anonymous, needle)} />
                                                : (requestLoading(anonymousRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={anonymous.length}
                                                                        next={handleNextAnonymousData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsAnonymousCardsComponent anonymous={anonymous} />
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
            <FormModalComponent modal={anonymousModal} handleClose={handleAnonymousModalHide}>
                <OperationsAnonymousAddAnonymousContainer handleClose={handleAnonymousModalHide} />
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

// Prop types to ensure destroyed props data type
OperationsAnonymousPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    anonymous: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    anonymousRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsAnonymousPage);
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
import FormModalComponent from "../../components/modals/FormModalComponent";
import FleetsCardsComponent from "../../components/fleets/FleetsCardsComponent";
import {emitFleetsFetch, emitNextFleetsFetch} from "../../redux/fleets/actions";
import FleetsAddSupplyComponent from "../../components/fleets/FleetsAddSupplyComponent";
import {storeFleetsRequestReset, storeNextFleetsRequestReset} from "../../redux/requests/fleets/actions";
import {
    dateToString,
    formatNumber,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function RequestsFleetsPage({fleets, fleetsRequests, sims, simsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [supplyModal, setSupplyModal] = useState({show: false, header: '', item: {}});

    // Local effects
    useEffect(() => {
        dispatch(emitFleetsFetch());
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
        requestFailed(fleetsRequests.list) && dispatch(storeFleetsRequestReset());
        requestFailed(fleetsRequests.next) && dispatch(storeNextFleetsRequestReset());
    };

    // Fetch next fleets data to enhance infinite scroll
    const handleNextFleetsData = () => {
        dispatch(emitNextFleetsFetch({page}));
    }

    // Show supply modal form
    const handleSupplyModalShow = (item) => {
        setSupplyModal({...supplyModal, item, header: "EFFECTUER UN FLOTTAGE", show: true})
    }

    // Hide supply modal form
    const handleSupplyModalHide = () => {
        setSupplyModal({...supplyModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Demandes de flottes" icon={'fa fa-rss'} />
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
                                            {requestFailed(fleetsRequests.list) && <ErrorAlertComponent message={fleetsRequests.list.message} />}
                                            {requestFailed(fleetsRequests.next) && <ErrorAlertComponent message={fleetsRequests.next.message} />}
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <FleetsCardsComponent handleSupplyModalShow={handleSupplyModalShow} fleets={searchEngine(fleets, needle)} />
                                                : (requestLoading(fleetsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={fleets.length}
                                                                        next={handleNextFleetsData}
                                                                        loader={<LoaderComponent />}
                                                        >
                                                            <FleetsCardsComponent handleSupplyModalShow={handleSupplyModalShow} fleets={fleets} />
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
            <FormModalComponent modal={supplyModal} handleClose={handleSupplyModalHide}>
                <FleetsAddSupplyComponent sims={sims}
                                          dispatch={dispatch}
                                          fleet={supplyModal.item}
                                          simsRequests={simsRequests}
                                          request={fleetsRequests.supply}
                                          handleClose={handleSupplyModalHide}
                />
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
                needleSearch(item.number, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.claimant.name, _needle) ||
                needleSearch(formatNumber(item.amount), _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(formatNumber(item.remaining), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
RequestsFleetsPage.propTypes = {
    sims: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    simsRequests: PropTypes.object.isRequired,
    fleetsRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsFleetsPage);
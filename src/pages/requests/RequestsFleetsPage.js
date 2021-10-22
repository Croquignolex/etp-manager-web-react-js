import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import RequestsFleetsCardsComponent from "../../components/requests/RequestsFleetsCardsComponent";
import {emitFleetsFetch, emitGroupFleetsFetch, emitNextFleetsFetch} from "../../redux/fleets/actions";
import {storeFleetsRequestReset, storeNextFleetsRequestReset} from "../../redux/requests/fleets/actions";
import RequestsFleetsAddSupplyContainer from "../../containers/requests/RequestsFleetsAddSupplyContainer";
import {dateToString, needleSearch, requestFailed, requestLoading} from "../../functions/generalFunctions";
import RequestsGroupFleetsCardsComponent from "../../components/requests/RequestsGroupFleetsCardsComponent";
import RequestsGroupFleetsAddSupplyContainer from "../../containers/requests/RequestsGroupFleetsAddSupplyContainer";

// Component
function RequestsFleetsPage({fleets, fleetsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [groupToggle, setGroupToggle] = useState(false);
    const [supplyModal, setSupplyModal] = useState({show: false, header: 'EFFECTUER UN FLOTTAGE', item: {}});
    const [groupSupplyModal, setGroupSupplyModal] = useState({show: false, header: 'EFFECTUER UN FLOTTAGE GROUPE', item: {}});
    const [groupSupplyDetailModal, setGroupSupplyDetailModal] = useState({show: false, header: 'DETAIL DU FLOTTAGE GROUPE', item: {}});

    // Local effects
    useEffect(() => {
        dispatch(emitFleetsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    const handleGroup = () => {
        dispatch(emitGroupFleetsFetch());
        setGroupToggle(true);
        setNeedle('');
    }

    const handleUngroup = () => {
        dispatch(emitFleetsFetch());
        setGroupToggle(false);
        setNeedle('');
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeFleetsRequestReset());
        dispatch(storeNextFleetsRequestReset());
    };

    // Fetch next fleets data to enhance infinite scroll
    const handleNextFleetsData = () => {
        dispatch(emitNextFleetsFetch({page}));
    }

    // Show supply modal form
    const handleSupplyModalShow = (item) => {
        setSupplyModal({...supplyModal, item, show: true})
    }

    // Hide supply modal form
    const handleSupplyModalHide = () => {
        setSupplyModal({...supplyModal, show: false})
    }

    // Show group supply modal form
    const handleGroupSupplyModalShow = (item) => {
        setGroupSupplyModal({...groupSupplyModal, item, show: true})
    }

    // Hide group supply modal form
    const handleGroupSupplyModalHide = () => {
        setGroupSupplyModal({...groupSupplyModal, show: false})
    }

    // Show supply modal form
    const handleGroupSupplyDetailsModalShow = (item) => {
        setGroupSupplyDetailModal({...groupSupplyDetailModal, item, show: true})
    }

    // Hide group supply detail modal form
    const handleGroupSupplyDetailsModalHide = () => {
        setGroupSupplyDetailModal({...groupSupplyDetailModal, show: false})
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
                                                <TableSearchComponent needle={needle} handleNeedle={handleNeedleInput}/>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {/* Error message */}
                                            {requestFailed(fleetsRequests.list) && <ErrorAlertComponent message={fleetsRequests.list.message} />}
                                            {requestFailed(fleetsRequests.next) && <ErrorAlertComponent message={fleetsRequests.next.message} />}
                                            {(groupToggle) ?
                                                (requestLoading(fleetsRequests.list) ? <LoaderComponent /> :
                                                    <>
                                                        <button type="button"
                                                                className="btn btn-secondary mb-2 ml-2"
                                                                onClick={handleUngroup}
                                                        >
                                                            <i className="fa fa-table" /> Dégrouper
                                                        </button>
                                                        <RequestsGroupFleetsCardsComponent fleets={groupSearchEngine(fleets, needle)}
                                                                                           handleGroupSupplyModalShow={handleGroupSupplyModalShow}
                                                                                           handleGroupSupplyDetailsModalShow={handleGroupSupplyDetailsModalShow}
                                                        />
                                                    </>
                                                ) :
                                                (
                                                    (requestLoading(fleetsRequests.list) ? <LoaderComponent /> :
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
                                                                    <RequestsFleetsCardsComponent fleets={searchEngine(fleets, needle)}
                                                                                                handleSupplyModalShow={handleSupplyModalShow}
                                                                    />
                                                                ) : (
                                                                    <InfiniteScroll hasMore={hasMoreData}
                                                                                    dataLength={fleets.length}
                                                                                    next={handleNextFleetsData}
                                                                                    loader={<LoaderComponent />}
                                                                                    style={{ overflow: 'hidden' }}
                                                                    >
                                                                        <RequestsFleetsCardsComponent fleets={fleets}
                                                                                                      handleSupplyModalShow={handleSupplyModalShow}
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
            <FormModalComponent modal={supplyModal} handleClose={handleSupplyModalHide}>
                <RequestsFleetsAddSupplyContainer fleet={supplyModal.item}
                                                  handleClose={handleSupplyModalHide}
                />
            </FormModalComponent>
            <FormModalComponent modal={groupSupplyModal} handleClose={handleGroupSupplyModalHide}>
                <RequestsGroupFleetsAddSupplyContainer fleet={groupSupplyModal.item}
                                                       handleClose={handleGroupSupplyModalHide}
                />
            </FormModalComponent>
            <FormModalComponent modal={groupSupplyDetailModal} handleClose={handleGroupSupplyDetailsModalHide}>
                <RequestsFleetsCardsComponent group fleets={groupSupplyDetailModal.item} />
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
                needleSearch(item.amount, _needle) ||
                needleSearch(item.remaining, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.number, _needle) ||
                needleSearch(item.claimant.name, _needle) ||
                needleSearch(item.operator.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
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
                needleSearch(item[0].agent.name, _needle) ||
                needleSearch(item[0].operator.name, _needle) ||
                needleSearch(item.reduce((acc, val) => acc + parseInt(val.amount, 10), 0), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
RequestsFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    fleetsRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsFleetsPage);

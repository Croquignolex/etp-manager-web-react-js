import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import {RECOVERIES_FLEET_PAGE} from "../../constants/pageNameConstants";
import TableSearchComponent from "../../components/TableSearchComponent";
import ConfirmModalComponent from "../../components/modals/ConfirmModalComponent";
import {emitConfirmReturn, emitNextReturnsFetch, emitReturnsFetch} from "../../redux/returns/actions";
import RecoveriesFleetsCardsComponent from "../../components/recoveries/RecoveriesFleetsCardsComponent";
import {dateToString, formatNumber, needleSearch, requestFailed, requestLoading} from "../../functions/generalFunctions";
import {storeReturnsRequestReset, storeNextReturnsRequestReset, storeConfirmReturnRequestReset} from "../../redux/requests/returns/actions";

// Component
function RecoveriesFleetsPage({returns, returnsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});

    // Local effects
    useEffect(() => {
        dispatch(emitReturnsFetch());
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
        dispatch(storeReturnsRequestReset());
        dispatch(storeNextReturnsRequestReset());
        dispatch(storeConfirmReturnRequestReset());
    };

    // Fetch next returns data to enhance infinite scroll
    const handleNextReturnsData = () => {
        dispatch(emitNextReturnsFetch({page}));
    }

    // Show confirm modal form
    const handleConfirmModalShow = ({id, amount}) => {
        setConfirmModal({...confirmModal, id, body: `Confirmer le retour flotte de ${formatNumber(amount)}?`, show: true})
    }

    // Hide confirm modal form
    const handleConfirmModalHide = () => {
        setConfirmModal({...confirmModal, show: false})
    }

    // Trigger when fleet recovery confirm confirmed on modal
    const handleConfirm = (id) => {
        handleConfirmModalHide();
        dispatch(emitConfirmReturn({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={RECOVERIES_FLEET_PAGE} icon={'fa fa-wifi'} />
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
                                            {requestFailed(returnsRequests.list) && <ErrorAlertComponent message={returnsRequests.list.message} />}
                                            {requestFailed(returnsRequests.next) && <ErrorAlertComponent message={returnsRequests.next.message} />}
                                            {requestFailed(returnsRequests.apply) && <ErrorAlertComponent message={returnsRequests.apply.message} />}
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <RecoveriesFleetsCardsComponent returns={searchEngine(returns, needle)}
                                                                                  handleConfirmModalShow={handleConfirmModalShow}
                                                />
                                                : (requestLoading(returnsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={returns.length}
                                                                        loader={<LoaderComponent />}
                                                                        next={handleNextReturnsData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <RecoveriesFleetsCardsComponent returns={returns}
                                                                                            handleConfirmModalShow={handleConfirmModalShow}
                                                            />
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
            <ConfirmModalComponent modal={confirmModal}
                                   handleModal={handleConfirm}
                                   handleClose={handleConfirmModalHide}
            />
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
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.collector.name, _needle) ||
                needleSearch(item.sim_incoming.number, _needle) ||
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
RecoveriesFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    returns: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    returnsRequests: PropTypes.object.isRequired,
};

export default React.memo(RecoveriesFleetsPage);
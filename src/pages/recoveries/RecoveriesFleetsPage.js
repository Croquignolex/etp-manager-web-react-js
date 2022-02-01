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
import FormModalComponent from "../../components/modals/FormModalComponent";
import ConfirmModalComponent from "../../components/modals/ConfirmModalComponent";
import RecoveriesFleetsCardsComponent from "../../components/recoveries/RecoveriesFleetsCardsComponent";
import RecoveriesFleetsAddReturnContainer from "../../containers/recoveries/RecoveriesFleetsAddReturnContainer";
import OperationsGroupReturnsCardsComponent from "../../components/recoveries/OperationsGroupReturnsCardsComponent";
import {storeReturnsRequestReset, storeNextReturnsRequestReset, storeConfirmReturnRequestReset} from "../../redux/requests/returns/actions";
import {
    emitReturnsFetch,
    emitConfirmReturn,
    emitNextReturnsFetch,
    emitGroupReturnsFetch,
    emitGroupConfirmReturn
} from "../../redux/returns/actions";
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
function RecoveriesFleetsPage({returns, returnsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [groupToggle, setGroupToggle] = useState(false);
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});
    const [groupConfirmModal, setGroupConfirmModal] = useState({show: false, body: '', id: []});
    const [recoveryModal, setRecoveryModal] = useState({show: false, header: "EFFECTUER UN RETOUR FLOTTE"});
    const [groupDetailModal, setGroupDetailModal] = useState({show: false, header: 'DETAIL DU TRANSFERT DE FLOTTE GROUPE', item: {}});

    // Local effects
    useEffect(() => {
        dispatch(emitReturnsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(returnsRequests.apply)) {
            applySuccess(returnsRequests.apply.message);
        }
        // eslint-disable-next-line
    }, [returnsRequests.apply]);

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

    // Show recovery modal form
    const handleRecoveryModalShow = (item) => {
        setRecoveryModal({...recoveryModal, item, show: true})
    }

    // Hide recovery modal form
    const handleRecoveryModalHide = () => {
        setRecoveryModal({...recoveryModal, show: false})
    }

    // Show group supply modal form
    const handleGroupConfirmModalShow = (item) => {
        const ids = [];
        item.forEach(item => {
            ids.push(item.id);
        });
        const amount = item.reduce((acc, val) => acc + parseInt(val.amount, 10), 0);
        setGroupConfirmModal({...groupConfirmModal, id: ids, body: `Confirmer le retour flotte groupée de ${item[0].agent.name} de ${formatNumber(amount)}?`, show: true})
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
        dispatch(emitGroupReturnsFetch());
        setGroupToggle(true);
        setNeedle('');
    }

    const handleUngroup = () => {
        dispatch(emitReturnsFetch());
        setGroupToggle(false);
        setNeedle('');
    }

    // Trigger when group transfer confirm confirmed on modal
    const handleGroupConfirm = (id) => {
        handleGroupConfirmModalHide();
        dispatch(emitGroupConfirmReturn({ids: id}));
    };

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
                    <HeaderComponent title={RECOVERIES_FLEET_PAGE} icon={'fa fa-redo'} />
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
                                            {(groupToggle) ?
                                                ((requestLoading(returnsRequests.list) || requestLoading(returnsRequests.apply)) ? <LoaderComponent /> :
                                                    <>
                                                        <button type="button"
                                                                className="btn btn-secondary mb-2 ml-2"
                                                                onClick={handleUngroup}
                                                        >
                                                            <i className="fa fa-table" /> Dégrouper
                                                        </button>
                                                        <OperationsGroupReturnsCardsComponent returns={groupSearchEngine(returns, needle)}
                                                                                              handleGroupConfirmModalShow={handleGroupConfirmModalShow}
                                                                                              handleGroupDetailsModalShow={handleGroupDetailsModalShow}
                                                        />
                                                    </>
                                                ) :
                                                (
                                                    (requestLoading(returnsRequests.list) ? <LoaderComponent /> :
                                                        <>
                                                            <button type="button"
                                                                    className="btn btn-theme mb-2"
                                                                    onClick={handleRecoveryModalShow}
                                                            >
                                                                <i className="fa fa-redo" /> Retour flotte
                                                            </button>
                                                            <button type="button"
                                                                    className="btn btn-danger mb-2 ml-2"
                                                                    onClick={handleGroup}
                                                            >
                                                                <i className="fa fa-table"/> Grouper
                                                            </button>
                                                            {/* Search result & Infinite scroll */}
                                                            {(needle !== '' && needle !== undefined)
                                                                ? (
                                                                    <RecoveriesFleetsCardsComponent returns={searchEngine(returns, needle)}
                                                                                                    handleConfirmModalShow={handleConfirmModalShow}
                                                                    />
                                                                ) : (
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
            <FormModalComponent modal={recoveryModal} handleClose={handleRecoveryModalHide}>
                <RecoveriesFleetsAddReturnContainer handleClose={handleRecoveryModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={groupDetailModal} handleClose={handleGroupDetailsModalHide}>
                <RecoveriesFleetsCardsComponent group returns={groupDetailModal.item} />
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
                needleSearch(item.agent?.name, _needle) ||
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
RecoveriesFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    returns: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    returnsRequests: PropTypes.object.isRequired,
};

export default React.memo(RecoveriesFleetsPage);

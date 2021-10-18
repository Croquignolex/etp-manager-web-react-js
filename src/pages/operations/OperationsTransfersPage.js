import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {OPERATIONS_TRANSFERS_PAGE} from "../../constants/pageNameConstants";
import DeleteModelComponent from "../../components/modals/DeleteModalComponent";
import ConfirmModalComponent from "../../components/modals/ConfirmModalComponent";
import OperationsTransfersCardsComponent from "../../components/operations/OperationsTransfersCardsComponent";
import OperationsGroupTransfersCardsComponent from "../../components/operations/OperationsGroupTransfersCardsComponent";
import OperationsTransfersAddTransferContainer from "../../containers/operations/OperationsTransfersAddTransferContainer";
import {
    emitTransfersFetch,
    emitCancelTransfer,
    emitConfirmTransfer,
    emitNextTransfersFetch,
    emitGroupTransfersFetch,
    emitGroupConfirmTransfer
} from "../../redux/transfers/actions";
import {
    storeTransfersRequestReset,
    storeNextTransfersRequestReset,
    storeCancelTransferRequestReset,
    storeConfirmTransferRequestReset
} from "../../redux/requests/transfers/actions";
import {
    applySuccess,
    dateToString,
    formatNumber,
    needleSearch,
    requestFailed,
    requestLoading,
    requestSucceeded,
} from "../../functions/generalFunctions";

// Component
function OperationsTransfersPage({transfers, transfersRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [groupToggle, setGroupToggle] = useState(false);
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});
    const [groupConfirmModal, setGroupConfirmModal] = useState({show: false, body: '', id: []});
    const [transferModal, setTransferModal] = useState({show: false, header: 'EFFECTUER UN TRANSFERT DE FLOTTE'});
    const [groupDetailModal, setGroupDetailModal] = useState({show: false, header: 'DETAIL DU TRANSFERT DE FLOTTE GROUPE', item: {}});

    // Local effects
    useEffect(() => {
        dispatch(emitTransfersFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(transfersRequests.apply)) {
            applySuccess(transfersRequests.apply.message);
        }
        // eslint-disable-next-line
    }, [transfersRequests.apply]);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(transfersRequests.cancel)) {
            applySuccess(transfersRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [transfersRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeTransfersRequestReset());
        dispatch(storeNextTransfersRequestReset());
        dispatch(storeCancelTransferRequestReset());
        dispatch(storeConfirmTransferRequestReset());
    };

    // Fetch next transfers data to enhance infinite scroll
    const handleNextTransfersData = () => {
        dispatch(emitNextTransfersFetch({page}));
    }

    // Show transfer modal form
    const handleTransferModalShow = (item) => {
        setTransferModal({...transferModal, item, show: true})
    }

    // Hide transfer modal form
    const handleTransferModalHide = () => {
        setTransferModal({...transferModal, show: false})
    }

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, sim_incoming}) => {
        setCancelModal({...cancelModal, id, body: `Annuler le transfert de flotte vers ${sim_incoming.number} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Show confirm modal form
    const handleConfirmModalShow = ({id, amount, user}) => {
        setConfirmModal({...confirmModal, id, body: `Confirmer le transfert de flotte de ${user.name} de ${formatNumber(amount)}?`, show: true})
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
        const amount = item.reduce((acc, val) => acc + val.amount, 0);
        setGroupConfirmModal({...groupConfirmModal, id: ids, body: `Confirmer le transfert de flotte groupee de ${item[0].user.name} de ${formatNumber(amount)}?`, show: true})
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
        dispatch(emitGroupTransfersFetch());
        setGroupToggle(true)
    }

    const handleUngroup = () => {
        dispatch(emitTransfersFetch());
        setGroupToggle(false);
    }

    // Trigger when group transfer confirm confirmed on modal
    const handleGroupConfirm = (id) => {
        handleGroupConfirmModalHide();
        dispatch(emitGroupConfirmTransfer({ids: id}));
    };

    // Trigger when clearance confirm confirmed on modal
    const handleConfirm = (id) => {
        handleConfirmModalHide();
        dispatch(emitConfirmTransfer({id}));
    };

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelTransfer({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_TRANSFERS_PAGE} icon={'fa fa-exchange'} />
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
                                            {requestFailed(transfersRequests.list) && <ErrorAlertComponent message={transfersRequests.list.message} />}
                                            {requestFailed(transfersRequests.next) && <ErrorAlertComponent message={transfersRequests.next.message} />}
                                            {requestFailed(transfersRequests.apply) && <ErrorAlertComponent message={transfersRequests.apply.message} />}
                                            {requestFailed(transfersRequests.cancel) && <ErrorAlertComponent message={transfersRequests.cancel.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleTransferModalShow}
                                            >
                                                <i className="fa fa-exchange" /> Transferer la flotte
                                            </button>
                                            {(groupToggle) ?
                                                (requestLoading(transfersRequests.list) ? <LoaderComponent /> :
                                                        <>
                                                            <button type="button"
                                                                    className="btn btn-secondary mb-2 ml-2"
                                                                    onClick={handleUngroup}
                                                            >
                                                                <i className="fa fa-table" /> Dégrouper
                                                            </button>
                                                            <OperationsGroupTransfersCardsComponent transfers={transfers}
                                                                                                    handleGroupConfirmModalShow={handleGroupConfirmModalShow}
                                                                                                    handleGroupDetailsModalShow={handleGroupDetailsModalShow}
                                                            />
                                                        </>
                                                ) :
                                                (
                                                    <>

                                                        {!requestLoading(transfersRequests.list) && (
                                                            <button type="button"
                                                                    className="btn btn-danger mb-2 ml-2"
                                                                    onClick={handleGroup}
                                                            >
                                                                <i className="fa fa-table"/> Grouper
                                                            </button>
                                                        )}
                                                        {/* Search result & Infinite scroll */}
                                                        {(needle !== '' && needle !== undefined)
                                                            ? <OperationsTransfersCardsComponent transfers={searchEngine(transfers, needle)}
                                                                                                 handleCancelModalShow={handleCancelModalShow}
                                                            />
                                                            : (requestLoading(transfersRequests.list) ? <LoaderComponent /> :
                                                                    <InfiniteScroll hasMore={hasMoreData}
                                                                                    loader={<LoaderComponent />}
                                                                                    dataLength={transfers.length}
                                                                                    next={handleNextTransfersData}
                                                                                    style={{ overflow: 'hidden' }}
                                                                    >
                                                                        <OperationsTransfersCardsComponent transfers={transfers}
                                                                                                           handleCancelModalShow={handleCancelModalShow}
                                                                                                           handleConfirmModalShow={handleConfirmModalShow}
                                                                        />
                                                                    </InfiniteScroll>
                                                            )
                                                        }
                                                    </>
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
            <DeleteModelComponent modal={cancelModal}
                                  handleModal={handleCancel}
                                  handleClose={handleCancelModalHide}
            />
            <FormModalComponent modal={transferModal} handleClose={handleTransferModalHide}>
                <OperationsTransfersAddTransferContainer handleClose={handleTransferModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={groupDetailModal} handleClose={handleGroupDetailsModalHide}>
                <OperationsTransfersCardsComponent group transfers={groupDetailModal.item} />
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
                needleSearch(item.user.name, _needle) ||
                needleSearch(item.operator.name, _needle) ||
                needleSearch(item.sim_incoming.number, _needle) ||
                needleSearch(item.sim_outgoing.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperationsTransfersPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    transfers: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    transfersRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsTransfersPage);

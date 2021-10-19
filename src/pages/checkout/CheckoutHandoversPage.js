import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitFetchUserBalance} from "../../redux/user/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {CHECKOUT_HANDING_OVER_PAGE} from "../../constants/pageNameConstants";
import DeleteModelComponent from "../../components/modals/DeleteModalComponent";
import ConfirmModalComponent from "../../components/modals/ConfirmModalComponent";
import {storeUserBalanceFetchRequestReset} from "../../redux/requests/user/actions";
import CheckoutHandoversCardsComponent from "../../components/checkout/CheckoutHandoversCardsComponent";
import OperationsGroupHandoversCardsComponent from "../../components/checkout/OperationsGroupHandoversCardsComponent";
import CheckoutHandoversImproveHandoverContainer from "../../containers/checkout/CheckoutHandoversImproveHandoverContainer";
import {
    emitCancelHandover,
    emitHandoversFetch,
    emitConfirmHandover,
    emitNextHandoversFetch,
    emitGroupHandoversFetch,
    emitGroupConfirmHandover
} from "../../redux/handovers/actions";
import {
    storeHandoversRequestReset,
    storeNextHandoversRequestReset,
    storeCancelHandoverRequestReset,
    storeConfirmHandoverRequestReset
} from "../../redux/requests/handovers/actions";
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
function CheckoutHandoversPage({handovers, handoversRequests, hasMoreData, page, user, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [groupToggle, setGroupToggle] = useState(false);
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});
    const [groupConfirmModal, setGroupConfirmModal] = useState({show: false, body: '', id: []});
    const [handoverModal, setHandoverModal] = useState({show: false, header: 'EFFECTUER UNE PASSATION DE SERVICE'});
    const [groupDetailModal, setGroupDetailModal] = useState({show: false, header: 'DETAIL DE LA PASSATION DE SERVICE GROUPEE', item: {}});

    // Local effects
    useEffect(() => {
        dispatch(emitHandoversFetch());
        dispatch(emitFetchUserBalance());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(handoversRequests.apply)) {
            applySuccess(handoversRequests.apply.message);
        }
        // eslint-disable-next-line
    }, [handoversRequests.apply]);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(handoversRequests.cancel)) {
            applySuccess(handoversRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [handoversRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeHandoversRequestReset());
        dispatch(storeNextHandoversRequestReset());
        dispatch(storeCancelHandoverRequestReset());
        dispatch(storeConfirmHandoverRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
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

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, receiver}) => {
        setCancelModal({...cancelModal, id, body: `Annuler la passation de service vers ${receiver.name} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Show confirm modal form
    const handleConfirmModalShow = ({id, amount, sender}) => {
        setConfirmModal({...confirmModal, id, body: `Confirmer la reception des espèces provenant de ${sender.name} de ${formatNumber(amount)}?`, show: true})
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
        setGroupConfirmModal({...groupConfirmModal, id: ids, body: `Confirmer la passation de service groupée de ${item[0].sender.name} de ${formatNumber(amount)}?`, show: true})
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
        dispatch(emitGroupHandoversFetch());
        setGroupToggle(true)
    }

    const handleUngroup = () => {
        dispatch(emitHandoversFetch());
        dispatch(emitFetchUserBalance());
        setGroupToggle(false);
    }

    // Trigger when group transfer confirm confirmed on modal
    const handleGroupConfirm = (id) => {
        handleGroupConfirmModalHide();
        dispatch(emitGroupConfirmHandover({ids: id}));
    };

    // Trigger when clearance confirm confirmed on modal
    const handleConfirm = (id) => {
        handleConfirmModalHide();
        dispatch(emitConfirmHandover({id}));
    };

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelHandover({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={CHECKOUT_HANDING_OVER_PAGE} icon={'fa fa-handshake'} />
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
                                            {requestFailed(handoversRequests.apply) && <ErrorAlertComponent message={handoversRequests.apply.message} />}
                                            {requestFailed(handoversRequests.cancel) && <ErrorAlertComponent message={handoversRequests.cancel.message} />}
                                            {(groupToggle) ?
                                                ((requestLoading(handoversRequests.list) || requestLoading(handoversRequests.apply)) ? <LoaderComponent /> :
                                                        <>
                                                            <button type="button"
                                                                    className="btn btn-secondary mb-2 ml-2"
                                                                    onClick={handleUngroup}
                                                            >
                                                                <i className="fa fa-table" /> Dégrouper
                                                            </button>
                                                            {!requestFailed(handoversRequests.list) && (
                                                                <OperationsGroupHandoversCardsComponent handovers={handovers}
                                                                                                        handleGroupConfirmModalShow={handleGroupConfirmModalShow}
                                                                                                        handleGroupDetailsModalShow={handleGroupDetailsModalShow}
                                                                />
                                                            )}
                                                        </>
                                                ) :
                                                (
                                                    <>

                                                        {!requestLoading(handoversRequests.list) && (
                                                            <>
                                                                <button type="button"
                                                                        className="btn btn-theme mb-2"
                                                                        onClick={handleHandoverModalShow}
                                                                >
                                                                    <i className="fa fa-handshake" /> Passation de service
                                                                </button>
                                                                <button type="button"
                                                                        className="btn btn-danger mb-2 ml-2"
                                                                        onClick={handleGroup}
                                                                >
                                                                    <i className="fa fa-table"/> Grouper
                                                                </button>
                                                            </>
                                                        )}
                                                        {/* Search result & Infinite scroll */}
                                                        {!requestFailed(handoversRequests.list) && (
                                                            (needle !== '' && needle !== undefined)
                                                                ? <CheckoutHandoversCardsComponent user={user}
                                                                                                   handovers={searchEngine(handovers, needle)}
                                                                                                   handleCancelModalShow={handleCancelModalShow}
                                                                                                   handleConfirmModalShow={handleConfirmModalShow}
                                                                />
                                                                : (requestLoading(handoversRequests.list) ? <LoaderComponent /> :
                                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                                        loader={<LoaderComponent />}
                                                                                        dataLength={handovers.length}
                                                                                        next={handleNextHandoversData}
                                                                                        style={{ overflow: 'hidden' }}
                                                                        >
                                                                            <CheckoutHandoversCardsComponent user={user}
                                                                                                             handovers={handovers}
                                                                                                             handleCancelModalShow={handleCancelModalShow}
                                                                                                             handleConfirmModalShow={handleConfirmModalShow}
                                                                            />
                                                                        </InfiniteScroll>
                                                                )
                                                        )}
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
            <FormModalComponent modal={handoverModal} handleClose={handleHandoverModalHide}>
                <CheckoutHandoversImproveHandoverContainer handleClose={handleHandoverModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={groupDetailModal} handleClose={handleGroupDetailsModalHide}>
                <CheckoutHandoversCardsComponent group handovers={groupDetailModal.item} />
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

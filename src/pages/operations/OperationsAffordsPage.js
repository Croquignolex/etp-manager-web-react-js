import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {OPERATIONS_AFFORDS_PAGE} from "../../constants/pageNameConstants";
import ConfirmModalComponent from "../../components/modals/ConfirmModalComponent";
import {emitAffordsFetch, emitConfirmAfford, emitNextAffordsFetch} from "../../redux/affords/actions";
import OperationsAffordsCardsComponent from "../../components/operations/OperationsAffordsCardsComponent";
import {
    storeAffordsRequestReset,
    storeNextAffordsRequestReset,
    storeConfirmAffordRequestReset
} from "../../redux/requests/affords/actions";
import {
    dateToString,
    formatNumber,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function OperationsAffordsPage({affords, affordsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});

    // Local effects
    useEffect(() => {
        dispatch(emitAffordsFetch());
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
        dispatch(storeAffordsRequestReset());
        dispatch(storeNextAffordsRequestReset());
        dispatch(storeConfirmAffordRequestReset());
    };

    // Fetch next affords data to enhance infinite scroll
    const handleNextAffordsData = () => {
        dispatch(emitNextAffordsFetch({page}));
    }

    // Show confirm modal form
    const handleConfirmModalShow = ({id, amount}) => {
        setConfirmModal({...confirmModal, id, body: `Confirmer l'approvisionnement de ${formatNumber(amount)}?`, show: true})
    }

    // Hide confirm modal form
    const handleConfirmModalHide = () => {
        setConfirmModal({...confirmModal, show: false})
    }

    // Trigger when afford confirm confirmed on modal
    const handleConfirm = (id) => {
        handleConfirmModalHide();
        dispatch(emitConfirmAfford({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_AFFORDS_PAGE} icon={'fa fa-wifi'} />
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
                                            {requestFailed(affordsRequests.list) && <ErrorAlertComponent message={affordsRequests.list.message} />}
                                            {requestFailed(affordsRequests.next) && <ErrorAlertComponent message={affordsRequests.next.message} />}
                                            {requestFailed(affordsRequests.apply) && <ErrorAlertComponent message={affordsRequests.next.message} />}
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <OperationsAffordsCardsComponent affords={searchEngine(affords, needle)}
                                                                                   handleConfirmModalShow={handleConfirmModalShow}
                                                />
                                                : (requestLoading(affordsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={affords.length}
                                                                        loader={<LoaderComponent />}
                                                                        next={handleNextAffordsData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsAffordsCardsComponent affords={affords}
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
                needleSearch(item.vendor, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.collector.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperationsAffordsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    affords: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    affordsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsAffordsPage);
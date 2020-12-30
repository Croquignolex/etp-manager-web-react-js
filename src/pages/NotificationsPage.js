import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {DANGER} from "../constants/typeConstants";
import HeaderComponent from "../components/HeaderComponent";
import {requestFailed} from "../functions/generalFunctions";
import LoaderComponent from "../components/LoaderComponent";
import {NOTIFICATIONS_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import TableSearchComponent from "../components/TableSearchComponent";
import {emitNotificationsFetch} from "../redux/notifications/actions";
import {storeNotificationsRequestReset} from "../redux/requests/notifications/actions";
import NotificationsInfiniteScrollTabComponent from "../components/notifications/NotificationsInfiniteScrollTabComponent";

// Component
function NotificationsPage({notifications, request, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [deleteModal, setDeleteModal] = useState({show: false, header: 'Suppression', body: 'Supprimer cette notification?', type: DANGER, id: 0});

    // Local effects
    useEffect(() => {
        dispatch(emitNotificationsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    const handleDeleteModalShow = (id) => {
        setDeleteModal({...deleteModal, id, show: true})
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        requestFailed(request) && dispatch(storeNotificationsRequestReset());
    };

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={NOTIFICATIONS_PAGE} icon={'fa fa-bell'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className="row">
                            <div className="col-12">
                                <div className="card custom-card-outline">
                                    <div className="card-body">
                                        <div className="tab-content">
                                            {/* Error message */}
                                            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
                                            {/* Search input */}
                                            <TableSearchComponent needle={needle} handleNeedle={handleNeedleInput} />
                                            {/* Infinite scroll list */}
                                            <NotificationsInfiniteScrollTabComponent dispatch={dispatch}
                                                                                     notifications={notifications.list}
                                                                                     handleDeleteModalShow={handleDeleteModalShow}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutContainer>
    )
}

// Prop types to ensure destroyed props data type
NotificationsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
};

export default React.memo(NotificationsPage);
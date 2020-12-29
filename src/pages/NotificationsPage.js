import PropTypes from 'prop-types';
import React, {useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../components/HeaderComponent";
import {requestFailed} from "../functions/generalFunctions";
import {NOTIFICATIONS_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import TableSearchComponent from "../components/TableSearchComponent";
import {storeNotificationsRequestReset} from "../redux/requests/notifications/actions";

// Component
function DashboardPage({notifications, request, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    const handleNeedleInput = (data) => {
        setNeedle(data)
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
                                            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
                                            <TableSearchComponent needle={needle} handleNeedle={handleNeedleInput} />
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
DashboardPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);
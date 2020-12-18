import PropTypes from 'prop-types';
import {connect} from "react-redux";
import React, {useLayoutEffect} from 'react';

import Header from "../components/Header";
import {getPageTitle} from "../helpers/functions";
import {storeCurrentPath} from "../redux/requests/actions";
import AgentDashboard from "../components/dashboard/agent/AgentDashboard";
import AdminDashboard from "../components/dashboard/admin/AdminDashboard";
import ManagerDashboard from "../components/dashboard/manager/ManagerDashboard";
import CollectorDashboard from "../components/dashboard/collector/CollectorDashboard";
import {
    ADMIN_ROLE,
    AGENT_ROLE,
    MANAGER_ROLE,
    COLLECTOR_ROLE,
    DASHBOARD_PAGE,
} from "../helpers/constants";

// Component
function DashboardPage({role, dispatch, match}) {
    // Local effect
    useLayoutEffect(() => {
        document.title = getPageTitle(DASHBOARD_PAGE);
        dispatch(storeCurrentPath({path: match.path}));
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        {ADMIN_ROLE.includes(role) &&
                            <AdminDashboard />
                        }
                        {AGENT_ROLE.includes(role) &&
                            <AgentDashboard />
                        }
                        {COLLECTOR_ROLE.includes(role) &&
                            <CollectorDashboard />
                        }
                        {MANAGER_ROLE.includes(role) &&
                            <ManagerDashboard />
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
DashboardPage.propTypes = {
    role: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action)}
});

// Map state function to component props
const mapStateToProps = (state) => ({
    role: state.user.role.name,
});

// Connect component to Redux
export default  connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
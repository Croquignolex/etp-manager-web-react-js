import {connect} from "react-redux";

import DashboardPage from "../pages/DashboardPage";
import {setPageTitle} from "../functions/generalFunctions";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";

setPageTitle(DASHBOARD_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    sims: state.sims.list,
    settings: state.settings,
    agents: state.agents.list,
    fleets: state.fleets.list,
    // resources: state.resources.list,
    userRequests: state.userRequests,
    simsRequests: state.simsRequests,
    clearances: state.clearances.list,
    agentsRequests: state.agentsRequests,
    fleetsRequests: state.fleetsRequests,
    // resourcesRequests: state.simsRequests,
    clearancesRequests: state.clearancesRequests,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
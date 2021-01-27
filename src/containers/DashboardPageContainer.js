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
    clearances: state.clearances.list,
    allSimsRequests: state.simsRequests.all,
    allAgentsRequests: state.agentsRequests.all,
    allFleetsRequests: state.fleetsRequests.all,
    balanceUserRequests: state.userRequests.balance,
    allClearancesRequests: state.clearancesRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
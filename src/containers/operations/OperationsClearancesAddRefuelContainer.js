import {connect} from "react-redux";

import OperationsClearancesAddRefuelComponent from "../../components/operations/OperationsClearancesAddRefuelComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    agents: state.agents.list,
    request: state.refuelsRequests.add,
    allSimsRequests: state.simsRequests.all,
    allAgentsRequests: state.agentsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsClearancesAddRefuelComponent);
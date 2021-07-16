import {connect} from "react-redux";

import RecoveriesFleetsAddRecoveryComponent from "../../components/recoveries/RecoveriesFleetsAddRecoveryComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    agents: state.agents.list,
    request: state.returnsRequests.fleet,
    allAgentsRequests: state.agentsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(RecoveriesFleetsAddRecoveryComponent);
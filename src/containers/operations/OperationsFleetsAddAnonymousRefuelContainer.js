import {connect} from "react-redux";

import OperationsFleetsAddAnonymousRefuelComponent from "../../components/operations/OperationsFleetsAddAnonymousRefuelComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    simsRequests: state.simsRequests.list,
    request: state.suppliesRequests.anonymous,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsFleetsAddAnonymousRefuelComponent);
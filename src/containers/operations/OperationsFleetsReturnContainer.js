import {connect} from "react-redux";

import OperationsFleetsReturnComponent from "../../components/operations/OperationsFleetsReturnComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    agencies: state.agencies.list,
    request: state.returnsRequests.add,
    allSimsRequests: state.simsRequests.all,
    allAgenciesRequests: state.agenciesRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsFleetsReturnComponent);

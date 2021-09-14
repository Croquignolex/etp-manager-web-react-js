import {connect} from "react-redux";

import OperationsFleetsAddAnonymousRefuelComponent from "../../components/operations/OperationsFleetsAddAnonymousRefuelComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    zones: state.zones.list,
    simsRequests: state.simsRequests.list,
    zonesRequests: state.zonesRequests.all,
    request: state.refuelsRequests.anonymous,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsFleetsAddAnonymousRefuelComponent);
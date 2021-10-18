import {connect} from "react-redux";

import RequestsGroupFleetsAddSupplyComponent from "../../components/requests/RequestsGroupFleetsAddSupplyComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    request: state.fleetsRequests.supply,
    simsRequests: state.simsRequests.fleet,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(RequestsGroupFleetsAddSupplyComponent);

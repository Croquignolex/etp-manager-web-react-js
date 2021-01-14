import {connect} from "react-redux";

import CheckoutOutlaysAddOutlayComponent from "../../components/checkout/CheckoutOutlaysAddOutlayComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    collectors: state.collectors.list,
    request: state.outlaysRequests.add,
    allCollectorsRequests: state.collectorsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOutlaysAddOutlayComponent);
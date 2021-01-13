import {connect} from "react-redux";

import CheckoutPaymentsAddPaymentComponent from "../../components/checkout/CheckoutPaymentsAddPaymentComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    collectors: state.collectors.list,
    request: state.paymentsRequests.add,
    allCollectorsRequests: state.collectorsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentsAddPaymentComponent);
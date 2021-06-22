import {connect} from "react-redux";

import CheckoutRevenuesAddRevenueComponent from "../../components/checkout/CheckoutRevenuesAddRevenueComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    vendors: state.vendors.list,
    request: state.revenuesRequests.add,
    allVendorsRequests: state.vendorsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutRevenuesAddRevenueComponent);
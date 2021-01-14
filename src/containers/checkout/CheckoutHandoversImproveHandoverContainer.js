import {connect} from "react-redux";

import CheckoutHandoversImproveHandoverComponent from "../../components/checkout/CheckoutHandoversImproveHandoverComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    balance: state.user.balance,
    managers: state.managers.list,
    request: state.handoversRequests.improve,
    allManagersRequests: state.managersRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutHandoversImproveHandoverComponent);
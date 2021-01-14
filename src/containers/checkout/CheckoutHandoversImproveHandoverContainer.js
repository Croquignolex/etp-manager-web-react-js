import {connect} from "react-redux";

import CheckoutHandoversImproveHandoverComponent from "../../components/checkout/CheckoutHandoversImproveHandoverComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sender: state.user.id,
    managers: state.managers.list,
    request: state.handoversRequests.add,
    allManagersRequests: state.managersRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutHandoversImproveHandoverComponent);
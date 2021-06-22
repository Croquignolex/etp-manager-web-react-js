import {connect} from "react-redux";

import CheckoutExpensesAddExpenseComponent from "../../components/checkout/CheckoutExpensesAddExpenseComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    vendors: state.vendors.list,
    request: state.expensesRequests.add,
    allVendorsRequests: state.vendorsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutExpensesAddExpenseComponent);
import {connect} from "react-redux";

import {setPageTitle} from "../../functions/generalFunctions";
import {CHECKOUT_OUTlAYS_PAGE} from "../../constants/pageNameConstants";
import CheckoutExpensesPage from "../../pages/checkout/CheckoutExpensesPage";

setPageTitle(CHECKOUT_OUTlAYS_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    page: state.expenses.page,
    expenses: state.expenses.list,
    hasMoreData: state.expenses.hasMoreData,
    expensesRequests: state.expensesRequests,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutExpensesPage);
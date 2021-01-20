import {connect} from "react-redux";

import {setPageTitle} from "../../functions/generalFunctions";
import {RECOVERIES_FLEET_PAGE} from "../../constants/pageNameConstants";
import RecoveriesFleetPage from "../../pages/recoveries/RecoveriesFleetPage";

setPageTitle(RECOVERIES_FLEET_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    page: state.returns.page,
    returns: state.returns.list,
    hasMoreData: state.returns.hasMoreData,
    returnsRequests: state.returnsRequests,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(RecoveriesFleetPage);
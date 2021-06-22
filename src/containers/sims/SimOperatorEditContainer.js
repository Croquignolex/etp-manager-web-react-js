import {connect} from "react-redux";

import SimOperatorEditComponent from "../../components/sims/SimOperatorEditComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sim: state.sims.current,
    request: state.simsRequests.operator,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(SimOperatorEditComponent);
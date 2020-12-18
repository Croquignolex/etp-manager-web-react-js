import {connect} from "react-redux";

import CheckUserPage from "../pages/CheckUserPage";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.errors,
    requests: state.requests
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckUserPage);
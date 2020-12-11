import {connect} from "react-redux";
import LoginPage from "../pages/LoginPage";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.errors,
    requests: state.requests,
    notifications: state.notifications,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action)}
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
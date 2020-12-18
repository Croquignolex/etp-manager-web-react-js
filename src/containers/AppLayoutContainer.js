import {connect} from "react-redux";

import AppLayoutComponent from "../components/AppLayoutComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    toast: state.toast,
    requests: state.requests
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(AppLayoutComponent);
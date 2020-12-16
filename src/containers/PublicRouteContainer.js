import {connect} from "react-redux";
import PublicRouteComponent from "../components/router/PublicRouteComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(PublicRouteComponent);
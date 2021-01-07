import {connect} from "react-redux";

import RequestsFleetsCardsComponent from "../../components/requests/RequestsFleetsCardsComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sim: state.sims.current,
    itemSimsRequests: state.simsRequests.item,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(RequestsFleetsCardsComponent);
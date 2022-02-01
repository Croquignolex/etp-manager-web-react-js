import {connect} from "react-redux";

import ResourceNewComponent from "../../components/resources/ResourceNewComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    zones: state.zones.list,
    request: state.agentsRequests.add,
    allZonesRequests: state.zonesRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ResourceNewComponent);

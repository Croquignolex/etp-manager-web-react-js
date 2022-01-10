import {connect} from "react-redux";

import AgencyNewComponent from "../../components/agencies/AgencyNewComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    agents: state.agents.list,
    request: state.agenciesRequests.add,
    allAgentsRequests: state.agentsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(AgencyNewComponent);

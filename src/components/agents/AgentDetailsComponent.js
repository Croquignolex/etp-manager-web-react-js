import React, {useEffect} from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAgentFetch} from "../../redux/agents/actions";
import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import AgentCompleteCardComponent from "./AgentCompleteCardComponent";
import {storeAgentRequestReset} from "../../redux/requests/agents/actions";
import {requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function AgentDetailsComponent({id, agent, dispatch, request}) {

    // Local effects
    useEffect(() => {
        dispatch(emitAgentFetch({id}));
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAgentRequestReset());
    };

    // Render
    return (
        <>
            {requestLoading(request)  ? <LoaderComponent /> : (
                requestFailed(request) ? <ErrorAlertComponent message={request.message} /> : (
                    <div className="card">
                        <div className={`${agentTypeBadgeColor(agent.reference).background} card-header`}>
                            <h3 className="card-title">PUCE {agentTypeBadgeColor(agent.reference).text}</h3>
                        </div>
                        <div className="card-body"><AgentCompleteCardComponent agent={agent} /></div>
                    </div>
                )
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
AgentDetailsComponent.propTypes = {
    id: PropTypes.string.isRequired,
    agent: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
};

export default React.memo(AgentDetailsComponent);

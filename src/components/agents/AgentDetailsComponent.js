import PropTypes from "prop-types";
import React, {useEffect} from 'react';

import LoaderComponent from "../LoaderComponent";
import AgentCNIComponent from "./AgentCNIComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAgentFetch} from "../../redux/agents/actions";
import {emitAllZonesFetch} from "../../redux/zones/actions";
import AgentSimsListComponent from "./AgentSimsListComponent";
import AgentPrimaryInfoComponent from "./AgentPrimaryInfoComponent";
import AgentSecondaryInfoComponent from "./AgentSecondaryInfoComponent";
import {storeAgentRequestReset} from "../../redux/requests/agents/actions";
import {storeAllZonesRequestReset} from "../../redux/requests/zones/actions";
import {requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function AgentDetailsComponent({id, agent, dispatch, request}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllZonesFetch());
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
        dispatch(storeAllZonesRequestReset());
    };

    // Render
    return (
        <>
            {requestLoading(request)  ? <LoaderComponent /> : (
                requestFailed(request) ? <ErrorAlertComponent message={request.message} /> : (
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <AgentPrimaryInfoComponent agent={agent} />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <AgentSecondaryInfoComponent agent={agent} />
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <AgentCNIComponent agent={agent} />
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <button type="button" className="btn btn-theme mb-1">
                                <i className="fa fa-plus" /> Ajouter une sim
                            </button>
                            <AgentSimsListComponent sims={agent.sims} />
                        </div>
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

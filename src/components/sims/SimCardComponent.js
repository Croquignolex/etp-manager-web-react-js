import React, {useState} from 'react';
import PropTypes from "prop-types";

import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import {dateToString, formatNumber, upperFirstCase} from "../../functions/generalFunctions";
import {
    AGENT_TYPE,
    RESOURCE_TYPE,
    COLLECTOR_TYPE,
    CORPORATE_TYPE,
    AGENT_RESOURCE_COLLECTOR_CORPORATE_TYPE
} from "../../constants/typeConstants";

// Component
function SimCardComponent({sim}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Render
    return (
        <div>
            <ul className="list-group list-group-unbordered">
                <OperatorComponent operator={sim.operator} />
                <li className="list-group-item">
                    <b>Création</b>
                    <span className="float-right">{dateToString(sim.creation)}</span>
                </li>
                <li className="list-group-item">
                    <b>Nom</b>
                    <span className="float-right">{sim.name}</span>
                </li>
                <li className="list-group-item">
                    <b>Numéro</b>
                    <span className="float-right">{sim.number}</span>
                </li>
                <li className="list-group-item">
                    <b>Solde flotte</b>
                    <span className="float-right text-success text-bold">{formatNumber(sim.balance)}</span>
                </li>
                {AGENT_RESOURCE_COLLECTOR_CORPORATE_TYPE.includes(sim.type.name) && (
                    <li className="list-group-item">
                        <b>{upperFirstCase(sim.type.name)}</b>
                        <span className="float-right">
                            {sim.type.name === AGENT_TYPE && (
                                <>
                                    {sim.agent.name}
                                    <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                       onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: sim.agent.id})}
                                    />
                                </>
                            )}
                            {sim.type.name === RESOURCE_TYPE && (
                                <>
                                    {sim.agent.name}
                                    <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                       onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: sim.agent.id})}
                                    />
                                </>
                            )}
                            {sim.type.name === COLLECTOR_TYPE && <> {sim.collector.name}</>}
                            {sim.type.name === CORPORATE_TYPE && <>{sim.company.name}</>}
                        </span>
                    </li>
                )}
            </ul>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </div>
    )
}

// Prop types to ensure destroyed props data type
SimCardComponent.propTypes = {
    sim: PropTypes.object.isRequired
};

export default React.memo(SimCardComponent);

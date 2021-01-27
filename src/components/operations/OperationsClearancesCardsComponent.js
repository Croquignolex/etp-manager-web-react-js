import PropTypes from "prop-types";
import React, {useState} from 'react';

import {DONE} from "../../constants/typeConstants";
import FormModalComponent from "../modals/FormModalComponent";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function OperationsClearancesCardsComponent({refuels, handleConfirmModalShow}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});
    const [incomingSimDetailsModal, setIncomingSimDetailsModal] = useState({show: false, header: 'DETAIL DE LA PUCE AGENT', id: ''});
    const [outgoingSimDetailsModal, setOutgoingSimDetailsModal] = useState({show: false, header: 'DETAIL DE LA PUCE DE FLOTTAGE', id: ''});

    // Hide incoming sim details modal form
    const handleIncomingSimDetailModalHide = () => {
        setIncomingSimDetailsModal({...incomingSimDetailsModal, show: false})
    }

    // Hide outgoing sim details modal form
    const handleOutgoingSimDetailModalHide = () => {
        setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: false})
    }

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {refuels.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`card-header ${item.status === DONE ? 'bg-secondary' : 'bg-primary'}`}>
                                    <h3 className="card-title text-bold">
                                        <i className="fa fa-phone" /> {formatNumber(item.amount)}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Agent/Ressource</b>
                                            <span className="float-right">
                                                {item.agent.name}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.agent.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce émetrice</b>
                                            <span className="float-right">
                                                {item.sim_outgoing.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: true, id: item.sim_outgoing.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce receptrice</b>
                                            <span className="float-right">
                                                {item.sim_incoming.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setIncomingSimDetailsModal({...incomingSimDetailsModal, show: true, id: item.sim_incoming.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste récouvrir</b>
                                            <span className="float-right text-danger text-bold">{formatNumber(item.remaining)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Gestionaire</b>
                                            <span className="float-right">{item.supplier.name}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {refuels.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de flottages
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent small={true} modal={incomingSimDetailsModal} handleClose={handleIncomingSimDetailModalHide}>
                <SimDetailsContainer id={incomingSimDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent small={true} modal={outgoingSimDetailsModal} handleClose={handleOutgoingSimDetailModalHide}>
                <SimDetailsContainer id={outgoingSimDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsClearancesCardsComponent.propTypes = {
    clearances: PropTypes.array.isRequired,
    handleConfirmModalShow: PropTypes.func.isRequired,
};

export default React.memo(OperationsClearancesCardsComponent);

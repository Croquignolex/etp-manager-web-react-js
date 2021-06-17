import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {DONE, PROCESSING} from "../../constants/typeConstants";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function OperationsClearancesCardsComponent({refuels, handleConfirmModalShow}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});
    const [outgoingSimDetailsModal, setOutgoingSimDetailsModal] = useState({show: false, header: 'DETAIL DU COMPTE DE FLOTTAGE', id: ''});

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
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item.operator} />
                                        <li className="list-group-item">
                                            <b>Création</b>
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
                                            <b>Compte recepteur</b>
                                            <span className="float-right">
                                                {item.sim.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: true, id: item.sim.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Monant</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item.collector.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            {item.status === DONE && <b className="text-success text-bold">Confirmé</b>}
                                            {item.status === PROCESSING && <b className="text-danger text-bold">En attente de confirmation</b>}
                                        </li>
                                    </ul>
                                    {(item.status === PROCESSING) && (
                                        <div className="mt-3 text-right">
                                            {item.actionLoader ? <LoaderComponent little={true} /> : (
                                                <button type="button"
                                                        className="btn btn-theme btn-sm"
                                                        onClick={() => handleConfirmModalShow(item)}
                                                >
                                                    <i className="fa fa-check" /> Confirmer
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {refuels.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de déstockages
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
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
    refuels: PropTypes.array.isRequired,
    handleConfirmModalShow: PropTypes.func.isRequired,
};

export default React.memo(OperationsClearancesCardsComponent);

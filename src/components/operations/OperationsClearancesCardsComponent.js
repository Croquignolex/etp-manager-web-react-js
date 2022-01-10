import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import {AGENT_TYPE, CANCEL, DONE, PROCESSING} from "../../constants/typeConstants";
import ResourceDetailsContainer from "../../containers/resources/ResourceDetailsContainer";

// Component
function OperationsClearancesCardsComponent({refuels, group, handleConfirmModalShow}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT", id: ''});
    const [resourceDetailsModal, setResourceDetailsModal] = useState({show: false, header: "DETAIL DE LA RESSOURCE", id: ''});
    const [outgoingSimDetailsModal, setOutgoingSimDetailsModal] = useState({show: false, header: 'DETAIL DU COMPTE DE FLOTTAGE', id: ''});

    // Hide outgoing sim details modal form
    const handleOutgoingSimDetailModalHide = () => {
        setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: false})
    }

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Hide resource details modal form
    const handleResourceDetailsModalHide = () => {
        setResourceDetailsModal({...resourceDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {refuels.map((item, key) => {
                    return (
                        <div className={`${group ? "col-lg-6" : "col-lg-4"} col-md-6`} key={key}>
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
                                            <b>{(item.agent?.reference === AGENT_TYPE) ? "Agent" : "Ressource"}</b>
                                            <span className="float-right">
                                                {item.agent.name}
                                                {(item.agent?.reference === AGENT_TYPE)
                                                    ? <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                         onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.agent.id})}
                                                    />
                                                    : <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                         onClick={() => setResourceDetailsModal({...resourceDetailsModal, show: true, id: item.agent.id})}
                                                    />
                                                }
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte recepteur</b>
                                            <span className="float-right">
                                                {item.sim?.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: true, id: item.sim?.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item.collector?.name}</span>
                                        </li>
                                        {(!group) && (
                                            <li className="list-group-item">
                                                {item.status === DONE && <b className="text-success text-bold">Confirmé</b>}
                                                {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                                {item.status === PROCESSING && <b className="text-danger text-bold">En attente de confirmation</b>}
                                            </li>
                                        )}
                                    </ul>
                                    {(!group) && (
                                        <>
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
                                        </>
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
            <FormModalComponent modal={resourceDetailsModal} handleClose={handleResourceDetailsModalHide}>
                <ResourceDetailsContainer id={resourceDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsClearancesCardsComponent.propTypes = {
    group: PropTypes.bool,
    refuels: PropTypes.array.isRequired,
    handleConfirmModalShow: PropTypes.func,
};

// Prop types to ensure destroyed props data type
OperationsClearancesCardsComponent.defaultProps = {
    group: false
};

export default React.memo(OperationsClearancesCardsComponent);

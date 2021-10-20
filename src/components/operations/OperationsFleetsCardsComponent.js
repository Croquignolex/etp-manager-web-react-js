import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import {CANCEL, DONE, PENDING, PROCESSING} from "../../constants/typeConstants";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function OperationsFleetsCardsComponent({supplies, user, group, handleFleetRecoveryModalShow, handleCashRecoveryModalShow,
                                            handleSupplyDetailsModalShow, handleCancelModalShow}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});
    const [incomingSimDetailsModal, setIncomingSimDetailsModal] = useState({show: false, header: 'DETAIL DU COMPTE AGENT', id: ''});
    const [outgoingSimDetailsModal, setOutgoingSimDetailsModal] = useState({show: false, header: 'DETAIL DU COMPTE DE FLOTTAGE', id: ''});

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
                {supplies.map((item, key) => {
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
                                            <b>Agent/Ressource</b>
                                            <span className="float-right">
                                                {item.agent.name}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.agent.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte émetteur</b>
                                            <span className="float-right">
                                                {item.sim_outgoing.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: true, id: item.sim_outgoing.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte recepteur</b>
                                            <span className="float-right">
                                                {item.sim_incoming.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setIncomingSimDetailsModal({...incomingSimDetailsModal, show: true, id: item.sim_incoming.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant flotté</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à récouvrir</b>
                                            <span className="float-right text-danger text-bold">
                                                {formatNumber(item.remaining)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item.supplier.name}</span>
                                        </li>
                                        {(!group) && (
                                            <li className="list-group-item">
                                                {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                                {item.status === DONE && <b className="text-success text-bold">Recouvert totalement</b>}
                                                {item.status === PENDING && <b className="text-danger text-bold">En attente de recouvrement</b>}
                                                {item.status === PROCESSING && <b className="text-primary text-bold">Recouvert partiellement</b>}
                                            </li>
                                        )}
                                    </ul>
                                    {(!group) && (
                                        <div className="mt-3 text-right">
                                            {(!item.actionLoader) && (
                                                <button type="button"
                                                        className="btn btn-theme btn-sm"
                                                        onClick={() => handleSupplyDetailsModalShow(item)}
                                                >
                                                    <i className="fa fa-eye" /> Details
                                                </button>
                                            )}
                                            {((item.status === PENDING) || (item.status === PROCESSING)) && (
                                                !item.actionLoader && (
                                                    <>
                                                        <br/>
                                                        <button type="button"
                                                                className="btn btn-theme btn-sm my-2"
                                                                onClick={() => handleFleetRecoveryModalShow(item)}
                                                        >
                                                            <i className="fa fa-redo" /> Retour flotte
                                                        </button>
                                                        <br/>
                                                        <button type="button"
                                                                className="btn btn-theme btn-sm"
                                                                onClick={() => handleCashRecoveryModalShow(item)}
                                                        >
                                                            <i className="fa fa-hand-paper" /> Recouvrement espèce
                                                        </button>
                                                    </>
                                                )
                                            )}
                                            {((item.status === PENDING) && (item.supplier.id.toString() === user.id.toString())) && (
                                                item.actionLoader ? <LoaderComponent little={true} /> : (
                                                    <>
                                                        <br/>
                                                        <button type="button"
                                                                className="btn btn-danger btn-sm mt-2"
                                                                onClick={() => handleCancelModalShow(item)}
                                                        >
                                                            <i className="fa fa-times" /> Annuler
                                                        </button>
                                                    </>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {supplies.length === 0 &&
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
OperationsFleetsCardsComponent.propTypes = {
    group: PropTypes.bool,
    user: PropTypes.object,
    supplies: PropTypes.array.isRequired,
    handleCancelModalShow: PropTypes.func,
    handleCashRecoveryModalShow: PropTypes.func,
    handleFleetRecoveryModalShow: PropTypes.func,
    handleSupplyDetailsModalShow: PropTypes.func,
};

// Prop types to ensure destroyed props data type
OperationsFleetsCardsComponent.defaultProps = {
    group: false
};

export default React.memo(OperationsFleetsCardsComponent);

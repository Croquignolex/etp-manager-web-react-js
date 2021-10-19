import PropTypes from "prop-types";
import React, {useState} from 'react';

import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {formatNumber} from "../../functions/generalFunctions";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {PENDING, PROCESSING} from "../../constants/typeConstants";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function RequestsGroupSuppliesCardsComponent({supplies, handleGroupDetailsModalShow,
                                                 handleGroupReturnModalShow, handleGroupRecoveryModalShow}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

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
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item[0].status).background} card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item[0].operator} />
                                        <li className="list-group-item">
                                            <b>Flottages groupés</b>
                                            <span className="float-right">
                                                {item.length}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant flotté</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.reduce((acc, val) => acc + val.amount, 0))}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à récouvrir</b>
                                            <span className="float-right text-danger text-bold">
                                                {formatNumber(item.reduce((acc, val) => acc + val.remaining, 0))}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Agent/Ressource</b>
                                            <span className="float-right">
                                                {item[0].agent.name}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item[0].agent.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            {item[0].status === PENDING && <b className="text-danger text-bold">En attente de recouvrement</b>}
                                            {item[0].status === PROCESSING && <b className="text-primary text-bold">Recouvert partiellement</b>}
                                        </li>
                                    </ul>
                                    <div className="mt-3 text-right">
                                        <button type="button"
                                                className="btn btn-theme btn-sm"
                                                onClick={() => handleGroupDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" /> Details
                                        </button>
                                        <br/>
                                        <button type="button"
                                                className="btn btn-sm btn-theme my-2"
                                                onClick={() => handleGroupReturnModalShow(item)}
                                        >
                                            <i className="fa fa-redo" /> Retour flotte
                                        </button>
                                        <br/>
                                        <button type="button"
                                                className="btn btn-sm btn-theme"
                                                onClick={() => handleGroupRecoveryModalShow(item)}
                                        >
                                            <i className="fa fa-hand-paper" /> Recouvrement espèce
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {supplies.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de flottages groupés
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsGroupSuppliesCardsComponent.propTypes = {
    supplies: PropTypes.array.isRequired,
    handleGroupReturnModalShow: PropTypes.func.isRequired,
    handleGroupDetailsModalShow: PropTypes.func.isRequired,
    handleGroupRecoveryModalShow: PropTypes.func.isRequired,
};

export default React.memo(RequestsGroupSuppliesCardsComponent);

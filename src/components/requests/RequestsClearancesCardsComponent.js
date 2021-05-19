import PropTypes from "prop-types";
import React, {useState} from 'react';

import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {DONE, PENDING, PROCESSING} from "../../constants/typeConstants";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function RequestsClearancesCardsComponent({clearances}) {
    // Local states
    const [simDetailModal, setSimDetailModal] = useState({show: false, header: 'DETAIL DE LA PUCE', id: ''});
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

    // Hide sim details modal form
    const handleSimDetailModalHide = () => {
        setSimDetailModal({...simDetailModal, show: false})
    }

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {clearances.map((item, key) => {
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
                                            <b>Montant demandé</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à accepter</b>
                                            <span className="float-right text-danger text-bold">
                                                {formatNumber(item.remaining)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce à déstocker</b>
                                            <span className="float-right">
                                            {item.sim.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setSimDetailModal({...simDetailModal, show: true, id: item.sim.id})}
                                                />
                                        </span>
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
                                            <b>Demandeur</b>
                                            <span className="float-right">{item.claimant.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            {item.status === DONE && <b className="text-success text-bold">Pris en charge totalement</b>}
                                            {item.status === PROCESSING && <b className="text-primary text-bold">Pris en charge partiellement</b>}
                                            {item.status === PENDING && <b className="text-danger text-bold">En attente de prise en charge</b>}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {clearances.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de déstrockages
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent small={true} modal={simDetailModal} handleClose={handleSimDetailModalHide}>
                <SimDetailsContainer id={simDetailModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsClearancesCardsComponent.propTypes = {
    clearances: PropTypes.array.isRequired,
};

export default React.memo(RequestsClearancesCardsComponent);

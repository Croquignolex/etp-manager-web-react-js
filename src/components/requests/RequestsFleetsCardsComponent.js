import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import ResourceDetailsContainer from "../../containers/resources/ResourceDetailsContainer";
import {AGENT_TYPE, CANCEL, DONE, PENDING, PROCESSING} from "../../constants/typeConstants";

// Component
function RequestsFleetsCardsComponent({fleets, group, handleSupplyModalShow}) {
    // Local states
    const [simDetailsModal, setSimDetailsModal] = useState({show: false, header: 'DETAIL DU COMPTE', id: ''});
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT", id: ''});
    const [resourceDetailsModal, setResourceDetailsModal] = useState({show: false, header: "DETAIL DE LA RESSOURCE", id: ''});

    // Hide sim details modal form
    const handleSimDetailModalHide = () => {
        setSimDetailsModal({...simDetailsModal, show: false})
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
                {fleets.map((item, key) => {
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
                                            <b>Montant demandé</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        {(DONE === item.status) &&
                                            <li className="list-group-item">
                                                <b>Montant envoyé</b>
                                                <span className="float-right text-danger text-bold">
                                                    {formatNumber(item.amount - item.remaining)}
                                                </span>
                                            </li>
                                        }
                                        <li className="list-group-item">
                                            <b>Compte à flotter</b>
                                            <span className="float-right">
                                                {item.sim?.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setSimDetailsModal({...simDetailsModal, show: true, id: item.sim?.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>{(item.agent?.reference === AGENT_TYPE) ? "Agent" : "Ressource"}</b>
                                            <span className="float-right">
                                                {item.agent?.name}
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
                                            <b>Demandeur</b>
                                            <span className="float-right">{item.claimant?.name}</span>
                                        </li>
                                        {(!group) && (
                                            <li className="list-group-item">
                                                {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                                {item.status === DONE && <b className="text-success text-bold">Flottée</b>}
                                                {item.status === PENDING && <b className="text-danger text-bold">En attente de flottage</b>}
                                            </li>
                                        )}
                                    </ul>
                                    {(!group) && (
                                        [PENDING, PROCESSING].includes(item.status) &&
                                        <div className="mt-3 text-right">
                                            {item.actionLoader ? <LoaderComponent little={true} /> :
                                                <button type="button"
                                                        className="btn btn-sm btn-theme"
                                                        onClick={() => handleSupplyModalShow(item)}
                                                >
                                                    <i className="fa fa-rss" /> Flotter
                                                </button>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {fleets.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de flotte
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent small={true} modal={simDetailsModal} handleClose={handleSimDetailModalHide}>
               <SimDetailsContainer id={simDetailsModal.id} />
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
RequestsFleetsCardsComponent.propTypes = {
    group: PropTypes.bool,
    fleets: PropTypes.array.isRequired,
    handleSupplyModalShow: PropTypes.func
};

// Prop types to ensure destroyed props data type
RequestsFleetsCardsComponent.defaultProps = {
    group: false
};

export default React.memo(RequestsFleetsCardsComponent);

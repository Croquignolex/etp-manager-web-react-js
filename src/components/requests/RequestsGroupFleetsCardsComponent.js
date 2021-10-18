import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {formatNumber} from "../../functions/generalFunctions";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function RequestsGroupFleetsCardsComponent({data, handleGroupSupplyDetailsModalShow, handleGroupSupplyModalShow}) {
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
                {data.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`bg-warning card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item[0].operator} />
                                        <li className="list-group-item">
                                            <b>Demandes groupées</b>
                                            <span className="float-right">
                                                {item.length}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant demandé</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.reduce((acc, val) => acc + val.amount, 0))}
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
                                            <b className="text-danger text-bold">
                                                En attente de flottage
                                            </b>
                                        </li>
                                    </ul>
                                    <div className="mt-3 text-right">
                                        {item.actionLoader ? <LoaderComponent little={true} /> : (
                                            <>
                                                <button type="button"
                                                        className="btn btn-theme btn-sm"
                                                        onClick={() => handleGroupSupplyDetailsModalShow(item)}
                                                >
                                                    <i className="fa fa-eye" /> Details
                                                </button>
                                                <button type="button"
                                                        className="btn btn-sm btn-theme ml-2"
                                                        onClick={() => handleGroupSupplyModalShow(item)}
                                                >
                                                    <i className="fa fa-rss" /> Flotter
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {data.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de flotte
                        </div>
                    </div>
                }
            </div>
             Modal
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsGroupFleetsCardsComponent.propTypes = {
    data: PropTypes.array.isRequired,
    handleGroupSupplyModalShow: PropTypes.func.isRequired,
    handleGroupSupplyDetailsModalShow: PropTypes.func.isRequired,
};

export default React.memo(RequestsGroupFleetsCardsComponent);

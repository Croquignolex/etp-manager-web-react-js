import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import FormModalComponent from "../modals/FormModalComponent";
import BlockModalComponent from "../modals/BlockModalComponent";
import {emitToggleAgentStatus} from "../../redux/agents/actions";
import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import {storeAgentStatusToggleRequestReset} from "../../redux/requests/agents/actions";

// Component
function AgentsCardsComponent({agents, dispatch}) {
    // Local states
    const [blockModal, setBlockModal] = useState({show: false, body: '', id: 0});
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAgentStatusToggleRequestReset());
    };

    // Trigger when user block status confirmed on modal
    const handleBlockStatus = (id, name) => {
        setBlockModal({...blockModal, show: true, id, body: `Bloquer l'agent ${name}?`})
    };

    // Trigger when user change status confirmed on modal
    const handleBlock = (id) => {
        handleBlockModalHide();
        dispatch(emitToggleAgentStatus({id}));
    };

    // Hide block confirmation modal
    const handleBlockModalHide = () => {
        setBlockModal({...blockModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {agents.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${agentTypeBadgeColor(item.reference).background} card-header`}>
                                    <h3 className="card-title">
                                        {agentTypeBadgeColor(item.reference).text}
                                    </h3>
                                    <div className="card-tools">
                                        {item.actionLoader ? <LoaderComponent little={true} /> : (
                                            <button type="button"
                                                    title="Détails"
                                                    className=" btn-tool btn"
                                                    onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.id})}
                                            >
                                                <i className="fa fa-eye" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="text-right">
                                        {item.actionLoader ? <LoaderComponent little={true} /> :(
                                            item.status
                                                ? <i className='fa fa-lock-open text-success hand-cursor'
                                                     onClick={() => handleBlockStatus(item.id, item.name)}
                                                />
                                                : <i className='fa fa-lock text-danger hand-cursor'
                                                     onClick={() => dispatch(emitToggleAgentStatus({id: item.id}))}
                                                />
                                        )}
                                    </div>
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Nom</b>
                                            <span className="float-right">{item.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Téléphone</b>
                                            <span className="float-right">{item.phone}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Zone</b>
                                            <span className="float-right">{item.zone.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Solde total</b>
                                            <span className="float-right text-success text-bold">{formatNumber(item.account.balance)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Créer par</b>
                                            <span className="float-right">{item.creator.name}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {agents.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'agents
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <BlockModalComponent modal={blockModal}
                                 handleBlock={handleBlock}
                                 handleClose={handleBlockModalHide}
            />
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
AgentsCardsComponent.propTypes = {
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default React.memo(AgentsCardsComponent);

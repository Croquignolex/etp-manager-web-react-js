import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import AgentCardComponent from "./AgentCardComponent";
import BlockModalComponent from "../modals/BlockModalComponent";
import {emitToggleAgentStatus} from "../../redux/agents/actions";
import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import {storeAgentStatusToggleRequestReset} from "../../redux/requests/agents/actions";

// Component
function AgentsCardsComponent({agents, dispatch}) {
    // Local states
    const [blockModal, setBlockModal] = useState({show: false, body: '', id: 0});

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
        <div>
            <div className="row m-1">
                {agents.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${agentTypeBadgeColor(item.reference).background} card-header`}>
                                    <h3 className="card-title">
                                        {agentTypeBadgeColor(item.reference).text}
                                    </h3>
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
                                    <AgentCardComponent agent={item} />
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
            <BlockModalComponent modal={blockModal}
                                 handleBlock={handleBlock}
                                 handleClose={handleBlockModalHide}
            />
        </div>
    )
}

// Prop types to ensure destroyed props data type
AgentsCardsComponent.propTypes = {
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default React.memo(AgentsCardsComponent);

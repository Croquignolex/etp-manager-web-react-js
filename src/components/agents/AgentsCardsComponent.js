import React from 'react';
import PropTypes from "prop-types";

import AgentCardComponent from "./AgentCardComponent";
import {agentTypeBadgeColor} from "../../functions/typeFunctions";

// Component
function AgentsCardsComponent({agents}) {
    // Render
    return (
        <div className="row m-1">
            {agents.map((item, key) => {
                return (
                    <div className="col-lg-4 col-md-6" key={key}>
                        <div className="card">
                            <div className={`${agentTypeBadgeColor(item.reference).background} card-header`}>
                                <h3 className="card-title">{agentTypeBadgeColor(item.reference).text}</h3>
                            </div>
                            <div className="card-body"><AgentCardComponent agent={item} /></div>
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
    )
}

// Prop types to ensure destroyed props data type
AgentsCardsComponent.propTypes = {
    agents: PropTypes.array.isRequired
};

export default React.memo(AgentsCardsComponent);

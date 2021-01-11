import React from 'react';
import PropTypes from "prop-types";

import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function AgentCardCompleteComponent({agent}) {
    // Render
    return (
        <>
            <ul className="list-group list-group-unbordered">
                <li className="list-group-item">
                    <b>Créer le</b>
                    <span className="float-right">{dateToString(agent.creation)}</span>
                </li>
                <li className="list-group-item">
                    <b>Nom</b>
                    <span className="float-right">{agent.name}</span>
                </li>
                <li className="list-group-item">
                    <b>Téléphone</b>
                    <span className="float-right">{agent.phone}</span>
                </li>
                <li className="list-group-item">
                    <b>Zone</b>
                    <span className="float-right">{agent.zone.name}</span>
                </li>
                <li className="list-group-item">
                    <b>Solde total</b>
                    <span className="float-right text-success text-bold">{formatNumber(agent.account.balance)}</span>
                </li>
                <li className="list-group-item">
                    <b>Créer par</b>
                    <span className="float-right">{agent.creator.name}</span>
                </li>
            </ul>
        </>
    )
}

// Prop types to ensure destroyed props data type
AgentCardCompleteComponent.propTypes = {
    agent: PropTypes.object.isRequired
};

export default React.memo(AgentCardCompleteComponent);

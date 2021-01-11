import React from 'react';
import PropTypes from "prop-types";

import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function AgentPrimaryInfoComponent({agent}) {
    // Render
    return (
        <div className="card">
            <div className={`${agentTypeBadgeColor(agent.reference).background} card-header`}>
                <h3 className="card-title">{agentTypeBadgeColor(agent.reference).text}</h3>
                <div className="card-tools">
                    {agent.status
                        ?  <span className="badge badge-success">Activé</span>
                        :  <span className="badge badge-danger">Bloqué</span>
                    }
                </div>
            </div>
            <div className="card-body">
                <div className="text-center mb-2">
                    <img src={agent.avatar} alt="avatar..." className="profile-user-img img-fluid img-circle" />
                </div>
                <ul className="list-group list-group-unbordered mb-3">
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
                        <b>Email</b>
                        <span className="float-right">{agent.email}</span>
                    </li>
                    <li className="list-group-item">
                        <b>Solde total</b>
                        <span className="float-right text-success text-bold">{formatNumber(agent.account.balance)}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

// Prop types to ensure destroyed props data type
AgentPrimaryInfoComponent.propTypes = {
    agent: PropTypes.object.isRequired
};

export default React.memo(AgentPrimaryInfoComponent);

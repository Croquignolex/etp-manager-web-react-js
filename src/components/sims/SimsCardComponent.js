import React from 'react';
import PropTypes from "prop-types";

import {AGENT_COLLECTOR_TYPE, COLLECTOR_TYPE} from "../../constants/typeConstants";
import {dateToString, formatNumber, upperFirstCase} from "../../functions/generalFunctions";

// Component
function SimsCardComponent({sim}) {
    // Render
    return (
        <ul className="list-group list-group-unbordered">
            <li className="list-group-item">
                <b>Créer le</b>
                <span className="float-right">{dateToString(sim.creation)}</span>
            </li>
            <li className="list-group-item">
                <b>Nom</b>
                <span className="float-right">{sim.name}</span>
            </li>
            <li className="list-group-item">
                <b>Numéro</b>
                <span className="float-right">{sim.number}</span>
            </li>
            <li className="list-group-item">
                <b>Solde flotte</b>
                <span className="float-right text-success text-bold">{formatNumber(sim.balance)}</span>
            </li>
            <li className="list-group-item">
                <b>Opérateur</b>
                <span className="float-right">{sim.operator.name}</span>
            </li>
            {AGENT_COLLECTOR_TYPE.includes(sim.type.name) &&
                <li className="list-group-item">
                    <b>{upperFirstCase(sim.type.name)}</b>
                    <span className="float-right">
                        {sim.type.name === COLLECTOR_TYPE ? sim.collector.name : sim.agent.name}
                    </span>
                </li>
            }
        </ul>
    )
}

// Prop types to ensure destroyed props data type
SimsCardComponent.propTypes = {
    sim: PropTypes.object.isRequired
};

export default React.memo(SimsCardComponent);

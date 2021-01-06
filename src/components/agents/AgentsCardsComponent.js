import React from 'react';
import PropTypes from "prop-types";

import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

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
                            <div className="table-responsive">
                                <table className="table table-hover text-nowrap table-bordered">
                                    <tbody>
                                        <tr>
                                            <td className="text-secondary">Date de création</td>
                                            <td>{dateToString(item.creation)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Nom</td>
                                            <td>{item.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Téléphone</td>
                                            <td>{item.phone}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Zone</td>
                                            <td>{item.zone.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Solde</td>
                                            <td className="text-success text-bold">{formatNumber(item.account.balance)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Créateur</td>
                                            <td>{item.creator.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
    )
}

// Prop types to ensure destroyed props data type
AgentsCardsComponent.propTypes = {
    agents: PropTypes.array.isRequired
};

export default React.memo(AgentsCardsComponent);

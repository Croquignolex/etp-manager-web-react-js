import React from 'react';
import PropTypes from "prop-types";

import {simTypeBadgeColor} from "../../functions/typeFunctions";
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
                            <div className={`${simTypeBadgeColor(item.type.name).background} card-header`}>
                                <h3 className="card-title">{simTypeBadgeColor(item.type.name).text}</h3>
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
                                            <td className="text-secondary">Numéro</td>
                                            <td>{item.number}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Solde</td>
                                            <td className="text-success text-bold">{formatNumber(item.balance)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Opérateur</td>
                                            <td>{item.operator.name}</td>
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

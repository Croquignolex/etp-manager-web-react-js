import React from 'react';
import PropTypes from "prop-types";

import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function ClearancesCardsComponent({clearances}) {
    // Render
    return (
        <div className="row m-1">
            {clearances.map((item, key) => {
                return (
                    <div className="col-lg-4 col-md-6" key={key}>
                        <div className="card">
                            <div className={`${fleetTypeBadgeColor(item.status).background} card-header`}>
                                <h3 className="card-title">{fleetTypeBadgeColor(item.status).text}</h3>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover text-nowrap table-bordered">
                                    <tbody>
                                        <tr>
                                            <td className="text-secondary">Date de création</td>
                                            <td>{dateToString(item.creation)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Montant demandé</td>
                                            <td>{formatNumber(item.amount)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Reste à accepter</td>
                                            <td className="text-danger text-bold">{formatNumber(item.remaining)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Puce à déstocker</td>
                                            <td>{item.sim.number}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Agent/Ressource</td>
                                            <td>{item.agent.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-secondary">Demandeur</td>
                                            <td>{item.claimant.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            })}
            {clearances.length === 0 &&
                <div className="col-12">
                    <div className='alert custom-active text-center'>
                        Pas de demandes de déstrockages
                    </div>
                </div>
            }
        </div>
    )
}

// Prop types to ensure destroyed props data type
ClearancesCardsComponent.propTypes = {
    clearances: PropTypes.array.isRequired,
};

export default React.memo(ClearancesCardsComponent);

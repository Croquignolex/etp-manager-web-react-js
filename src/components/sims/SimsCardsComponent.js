import React from 'react';
import PropTypes from "prop-types";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function SimsCardsComponent({sims}) {
    // Render
    return (
        <div className="row">
            {sims.map((item, key) => {
                return (
                    <div className="col-lg-4 col-md-6" key={key}>
                        <div className={`${fleetTypeBadgeColor(item.status).color} card`}>
                            <div className="card-body table-responsive">
                                <table className="table table table-hover text-nowrap table-bordered">
                                    <tbody>
                                        <tr>
                                            <td className="text-white">Date</td>
                                            <td>{dateToString(item.creation)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-white">Montant</td>
                                            <td>{formatNumber(item.amount)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-white">Reste</td>
                                            <td>{formatNumber(item.remaining)}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-white">Status</td>
                                            <td>{fleetTypeBadgeColor(item.status).text}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            })}
            {sims.length === 0 &&
                <div className="col-12">
                    <div className='alert custom-active text-center'>
                        Pas de puces
                    </div>
                </div>
            }
        </div>
    )
}

// Prop types to ensure destroyed props data type
SimsCardsComponent.propTypes = {
    sims: PropTypes.array.isRequired
};

export default React.memo(SimsCardsComponent);

import React from 'react';
import PropTypes from "prop-types";
import LoaderComponent from "../LoaderComponent";
import {PENDING, PROCESSING} from "../../constants/typeConstants";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function FleetsCardsComponent({fleets, handleSupplyModalShow}) {
    // Render
    return (
        <div className="row">
            {fleets.map((item, key) => {
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
                                            <td className="text-white">Puce à flotter</td>
                                            <td>{item.sim.number}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-white">Agent/Ressource</td>
                                            <td>{item.agent.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-white">Demandeur</td>
                                            <td>{item.claimant.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-white">Status</td>
                                            <td>{fleetTypeBadgeColor(item.status).text}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {[PENDING, PROCESSING].includes(item.status) &&
                                    <div className="mt-3 text-right">
                                        {item.actionLoader ? <LoaderComponent little={true} /> :
                                            <button type="button"
                                                    className="btn btn-theme"
                                                    onClick={() => handleSupplyModalShow(item)}
                                            >
                                                <i className="fa fa-plus" /> Effectuer un flottage
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
            {fleets.length === 0 &&
                <div className="col-12">
                    <div className='alert custom-active text-center'>
                        Pas de demandes de flotte
                    </div>
                </div>
            }
        </div>
    )
}

// Prop types to ensure destroyed props data type
FleetsCardsComponent.propTypes = {
    fleets: PropTypes.array.isRequired,
    handleSupplyModalShow: PropTypes.func.isRequired
};

export default React.memo(FleetsCardsComponent);

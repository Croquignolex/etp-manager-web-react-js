import React, {useState} from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import SimsCardComponent from "../sims/SimsCardComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {PENDING, PROCESSING} from "../../constants/typeConstants";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function FleetsCardsComponent({fleets, selectedSim, handleSupplyModalShow}) {
    // Local states
    const [simDetailModal, setSimDetailModal] = useState({show: false, header: 'DETAIL DE LA PUCE'});

    // Show supply modal form
    const handleSimDetailModalShow = () => {
        setSimDetailModal({...simDetailModal, show: true})
    }

    // Hide sim details modal form
    const handleSimDetailModalHide = () => {
        setSimDetailModal({...simDetailModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {fleets.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`}>
                                    <h3 className="card-title">{fleetTypeBadgeColor(item.status).text}</h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant demandé</b>
                                            <span className="float-right">{formatNumber(item.amount)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à flotter</b>
                                            <span className="float-right text-danger text-bold">{formatNumber(item.remaining)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce à flotter</b>
                                            <span className="float-right">
                                            {item.sim.number}
                                            <i className="fa fa-question-circle small ml-1 hand-cursor text-theme" onClick={handleSimDetailModalShow} />
                                        </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Agent/Ressource</b>
                                            <span className="float-right">{item.agent.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Demandeur</b>
                                            <span className="float-right">{item.claimant.name}</span>
                                        </li>
                                    </ul>
                                    {[PENDING, PROCESSING].includes(item.status) &&
                                    <div className="mt-3 text-center">
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
            {/* Modal */}
            <FormModalComponent modal={simDetailModal} handleClose={handleSimDetailModalHide}>
                {
                    <SimsCardComponent sim={selectedSim} />
                }
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
FleetsCardsComponent.propTypes = {
    fleets: PropTypes.array.isRequired,
    selectedSim: PropTypes.object.isRequired,
    handleSupplyModalShow: PropTypes.func.isRequired
};

export default React.memo(FleetsCardsComponent);

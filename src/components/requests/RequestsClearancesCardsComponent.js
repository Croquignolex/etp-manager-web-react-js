import React, {useState} from 'react';
import PropTypes from "prop-types";

import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";

// Component
function RequestsClearancesCardsComponent({clearances}) {
    // Local states
    const [simDetailModal, setSimDetailModal] = useState({show: false, header: 'DETAIL DE LA PUCE', id: ''});

    // Hide sim details modal form
    const handleSimDetailModalHide = () => {
        setSimDetailModal({...simDetailModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {clearances.map((item, key) => {
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
                                            <b>Reste à accepter</b>
                                            <span className="float-right text-danger text-bold">{formatNumber(item.remaining)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce à déstocker</b>
                                            <span className="float-right">
                                            {item.sim.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setSimDetailModal({...simDetailModal, show: true, id: item.sim.id})}
                                                />
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
            {/* Modal */}
            <FormModalComponent small={true} modal={simDetailModal} handleClose={handleSimDetailModalHide}>
                <SimDetailsContainer id={simDetailModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsClearancesCardsComponent.propTypes = {
    clearances: PropTypes.array.isRequired,
};

export default React.memo(RequestsClearancesCardsComponent);

import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {DONE, PROCESSING} from "../../constants/typeConstants";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";

// Component
function OperationsAffordsCardsComponent({affords, handleConfirmModalShow}) {
    // Local states
    const [outgoingSimDetailsModal, setOutgoingSimDetailsModal] = useState({show: false, header: 'DETAIL DE LA PUCE DE FLOTTAGE', id: ''});

    // Hide outgoing sim details modal form
    const handleOutgoingSimDetailModalHide = () => {
        setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {affords.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`card-header ${item.status === DONE ? 'bg-secondary' : 'bg-primary'}`}>
                                    <h3 className="card-title text-bold">
                                        <i className="fa fa-money-bill" /> {formatNumber(item.amount)}
                                    </h3>
                                    <div className="card-tools">
                                        {item.status === PROCESSING && (
                                            item.actionLoader ? <LoaderComponent little={true} /> : (
                                                <button type="button"
                                                        title="Confirmer"
                                                        className="btn btn-tool"
                                                        onClick={() => handleConfirmModalShow(item)}
                                                >
                                                    <i className="fa fa-check" />
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Fournisseur</b>
                                            <span className="float-right">{item.vendor}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce réceptrice</b>
                                            <span className="float-right">
                                                {item.sim.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: true, id: item.sim.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item.collector.name}</span>
                                        </li>
                                        {item.receipt && (
                                            <li className="list-group-item text-center">
                                                <a download target='_blank' href={item.receipt} rel='noopener noreferrer' className="btn btn-theme">
                                                    <i className="fa fa-file-archive" /> Reçus
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {affords.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'approvisionnement
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent small={true} modal={outgoingSimDetailsModal} handleClose={handleOutgoingSimDetailModalHide}>
                <SimDetailsContainer id={outgoingSimDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsAffordsCardsComponent.propTypes = {
    affords: PropTypes.array.isRequired,
    handleConfirmModalShow: PropTypes.func.isRequired,
};

export default React.memo(OperationsAffordsCardsComponent);

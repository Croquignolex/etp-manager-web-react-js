import React from 'react';
import PropTypes from "prop-types";

import {formatNumber} from "../../functions/generalFunctions";

// Component
function CheckoutHandoversCardsComponent({handovers, handleGroupConfirmModalShow, handleGroupDetailsModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {handovers.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`bg-primary card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Passations groupées</b>
                                            <span className="float-right">
                                                {item.length}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.reduce((acc, val) => acc + val.amount, 0))}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Emetteur</b>
                                            <span className="float-right">{item[0].sender.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b className="text-danger text-bold">
                                                En attente de confirmation
                                            </b>
                                        </li>
                                    </ul>
                                    <div className="mt-3 text-right">
                                        <button type="button"
                                                className="btn btn-theme btn-sm"
                                                onClick={() => handleGroupDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" /> Details
                                        </button>
                                        <button type="button"
                                                className="btn btn-sm btn-theme ml-2"
                                                onClick={() => handleGroupConfirmModalShow(item)}
                                        >
                                            <i className="fa fa-check" /> Confirmer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {handovers.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de passation de service éffectuées
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
CheckoutHandoversCardsComponent.propTypes = {
    handovers: PropTypes.array.isRequired,
    handleGroupConfirmModalShow: PropTypes.func.isRequired,
    handleGroupDetailsModalShow: PropTypes.func.isRequired,
};

export default React.memo(CheckoutHandoversCardsComponent);

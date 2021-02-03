import React from 'react';
import PropTypes from "prop-types";

import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function CheckoutHandoversCardsComponent({handovers}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {handovers.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className="card-header bg-secondary">
                                    <h3 className="card-title text-bold">
                                        <i className="fa fa-money-bill-alt" /> {formatNumber(item.amount)}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Emetteur</b>
                                            <span className="float-right">{item.sender.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Recepteur</b>
                                            <span className="float-right">{item.receiver.name}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {handovers.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de passation de service éffectuees
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
CheckoutHandoversCardsComponent.propTypes = {
    handovers: PropTypes.array.isRequired
};

export default React.memo(CheckoutHandoversCardsComponent);

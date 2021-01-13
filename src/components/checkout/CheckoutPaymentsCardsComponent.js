import React from 'react';
import PropTypes from "prop-types";

import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function CheckoutPaymentsCardsComponent({payments}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {payments.map((item, key) => {
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
                                            <b>Gestionnaire</b>
                                            <span className="float-right">{item.manager.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item.collector.name}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {payments.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'encaissement
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
CheckoutPaymentsCardsComponent.propTypes = {
    payments: PropTypes.array.isRequired
};

export default React.memo(CheckoutPaymentsCardsComponent);

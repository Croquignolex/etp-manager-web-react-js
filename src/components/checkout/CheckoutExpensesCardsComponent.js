import React from 'react';
import PropTypes from "prop-types";

import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function CheckoutExpensesCardsComponent({expenses}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {expenses.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Nom</b>
                                            <span className="float-right">{item.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Monant</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Motif</b>
                                            <span className="float-right">{item.reason}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {expenses.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de décaissements externes
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
CheckoutExpensesCardsComponent.propTypes = {
    expenses: PropTypes.array.isRequired
};

export default React.memo(CheckoutExpensesCardsComponent);

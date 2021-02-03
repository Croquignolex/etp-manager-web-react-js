import React from 'react';
import PropTypes from "prop-types";

import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function CheckoutOutlaysCardsComponent({outlays}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {outlays.map((item, key) => {
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
                {outlays.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de décaissement
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
CheckoutOutlaysCardsComponent.propTypes = {
    outlays: PropTypes.array.isRequired
};

export default React.memo(CheckoutOutlaysCardsComponent);

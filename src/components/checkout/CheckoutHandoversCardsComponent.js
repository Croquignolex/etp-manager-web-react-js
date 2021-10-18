import React from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {CANCEL, DONE, PROCESSING} from "../../constants/typeConstants";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function CheckoutHandoversCardsComponent({handovers, group, user, handleConfirmModalShow, handleCancelModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {handovers.map((item, key) => {
                    return (
                        <div className={`${group ? "col-lg-6" : "col-lg-4"} col-md-6`} key={key}>
                            <div className="card">
                                {group
                                    ? <div className={`bg-secondary card-header`} />
                                    : <div className={`${fleetTypeBadgeColor(item.status).background} card-header`} />
                                }
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
                                        <li className="list-group-item">
                                            <b>Monant</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        {(!group) && (
                                            <li className="list-group-item">
                                                {item.status === DONE && <b className="text-success text-bold">Confirmé</b>}
                                                {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                                {item.status === PROCESSING && <b className="text-danger text-bold">En attente de confirmation</b>}
                                            </li>
                                        )}
                                    </ul>
                                    {(!group) && (
                                        <>
                                            {((item.status === PROCESSING) && (item.receiver.id === user)) && (
                                                <div className="mt-3 text-right">
                                                    {item.actionLoader ? <LoaderComponent little={true} /> : (
                                                        <button type="button"
                                                                className="btn btn-theme btn-sm"
                                                                onClick={() => handleConfirmModalShow(item)}
                                                        >
                                                            <i className="fa fa-check" /> Confirmer
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            {((item.status === PROCESSING) && (item.sender.id === user)) && (
                                                <div className="mt-3 text-right">
                                                    {item.actionLoader ? <LoaderComponent little={true} /> : (
                                                        <button type="button"
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleCancelModalShow(item)}
                                                        >
                                                            <i className="fa fa-times" /> Annuler
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
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
    group: PropTypes.bool,
    handovers: PropTypes.array.isRequired,
    handleCancelModalShow: PropTypes.func,
    handleConfirmModalShow: PropTypes.func,
};

// Prop types to ensure destroyed props data type
CheckoutHandoversCardsComponent.defaultProps = {
    group: false
};

export default React.memo(CheckoutHandoversCardsComponent);

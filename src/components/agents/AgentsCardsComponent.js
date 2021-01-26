import React from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function AgentsCardsComponent({agents, handleBlock, handleBlockModalShow, handleAgentDetailsModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {agents.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${agentTypeBadgeColor(item.reference).background} card-header`}>
                                    <h3 className="card-title">
                                        {agentTypeBadgeColor(item.reference).text}
                                    </h3>
                                    <div className="card-tools">
                                        <button type="button"
                                                title="Détails"
                                                className=" btn-tool btn"
                                                onClick={() => handleAgentDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="text-right">
                                        {item.actionLoader ? <LoaderComponent little={true} /> :(
                                            item.status
                                                ? <i onClick={() => handleBlockModalShow(item)}
                                                     className='fa fa-lock-open text-success hand-cursor'
                                                />
                                                : <i className='fa fa-lock text-danger hand-cursor'
                                                     onClick={() => handleBlock(item.id)}
                                                />
                                        )}
                                    </div>
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Nom</b>
                                            <span className="float-right">{item.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Téléphone</b>
                                            <span className="float-right">{item.phone}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Zone</b>
                                            <span className="float-right">{item.zone.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Solde total</b>
                                            <span className="float-right text-success text-bold">{formatNumber(item.account.balance)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Créer par</b>
                                            <span className="float-right">{item.creator.name}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {agents.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'agents
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
AgentsCardsComponent.propTypes = {
    agents: PropTypes.array.isRequired,
    handleBlock: PropTypes.func.isRequired,
    handleBlockModalShow: PropTypes.func.isRequired,
    handleAgentDetailsModalShow: PropTypes.func.isRequired,
};

export default React.memo(AgentsCardsComponent);

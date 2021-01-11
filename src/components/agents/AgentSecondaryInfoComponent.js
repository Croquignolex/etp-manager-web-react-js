import React from 'react';
import PropTypes from "prop-types";

// Component
function AgentSecondaryInfoComponent({agent}) {
    // Render
    return (
        <div className="card">
            <div className="card-body">
                <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                        <b>Créer par</b>
                        <span className="float-right">{agent.creator.name}</span>
                    </li>
                    <li className="list-group-item">
                        <b>Ville</b>
                        <span className="float-right">{agent.town}</span>
                    </li>
                    <li className="list-group-item">
                        <b>Pays</b>
                        <span className="float-right">{agent.country}</span>
                    </li>
                    <li className="list-group-item">
                        <b>Zone</b>
                        <span className="float-right">{agent.zone.name}</span>
                    </li>
                    <li className="list-group-item">
                        <b>Address</b>
                        <p>{agent.address}</p>
                    </li>
                    <li className="list-group-item">
                        <b>Description</b>
                        <p>{agent.description}</p>
                    </li>
                    {agent.document && (
                        <li className="list-group-item text-center">
                            <a download target='_blank' href={agent.document} rel='noopener noreferrer' className="btn btn-theme">
                                Dossier agent
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

// Prop types to ensure destroyed props data type
AgentSecondaryInfoComponent.propTypes = {
    agent: PropTypes.object.isRequired
};

export default React.memo(AgentSecondaryInfoComponent);

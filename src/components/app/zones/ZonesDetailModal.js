import React from 'react';
import PropTypes from "prop-types";

import ZonesAgentsPlain from "./ZonesAgentsPlain";
import {dateToString, formatNumber} from "../../../helpers/functions";

// Component
function ZonesDetailModal({zone}) {
    // Destruct data
    const {name, reference, description, creation, collector, agents} = zone;

    // Render
    return (
        <section className="content">
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col">
                        <div id="accordion">
                            {/* Information */}
                            <div className="card custom-card-outline">
                                <div className="card-header" id="headingInfo">
                                    <strong className="mb-0">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseInfo" className='text-theme'>
                                            <i className='fa fa-info-circle' /> Information
                                        </a>
                                    </strong>
                                </div>
                                <div id="collapseInfo" className="collapse show" aria-labelledby="headingInfo" data-parent="#accordion">
                                    <div className='card-body'>
                                        <h3 className="profile-username text-center">{name}</h3>
                                        <p className="text-muted text-center">{reference}</p>
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b><i className='fa fa-calendar-alt' /> Date de céation</b>
                                                <span className="float-right">{dateToString(creation)}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <b><i className='fa fa-user-clock' /> Responsable</b>
                                                <span className="float-right">{collector.name}</span>
                                            </li>
                                        </ul>
                                        <strong><i className="fa fa-user-secret mr-1" /> Description</strong>
                                        <p className="text-muted">{description}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Agents */}
                            <div className="card custom-card-outline">
                                <div className="card-header" id="headingAgents">
                                    <strong className="mb-0">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseAgents" className='text-theme'>
                                            <i className='fa fa-user-cog' /> Agents ({formatNumber(agents.length)})
                                        </a>
                                    </strong>
                                </div>
                                <div id="collapseAgents" className="collapse" aria-labelledby="headingAgents" data-parent="#accordion">
                                    <div className='card-body'>
                                        <ZonesAgentsPlain agents={agents} />
                                    </div>
                                </div>
                            </div>
                            {/* Collectors */}
                            {/*<div className="card custom-card-outline">
                                <div className="card-header" id="headingCollectors">
                                    <strong className="mb-0">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseCollectors" className='text-theme'>
                                            <i className='fa fa-user-clock' /> Responsables de zone ({formatNumber(collectors.length)})
                                        </a>
                                    </strong>
                                </div>
                                <div id="collapseCollectors" className="collapse" aria-labelledby="headingCollectors" data-parent="#accordion">
                                    <div className='card-body'>
                                        <ZonesCollectorsPlain collectors={collectors} />
                                    </div>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Prop types to ensure destroyed props data type
ZonesDetailModal.propTypes = {
    zone: PropTypes.object.isRequired,
};

export default React.memo(ZonesDetailModal);
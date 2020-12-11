import React from 'react';
import PropTypes from 'prop-types';

import SimsListPlain from "../sims/SimsListPlain";
import {dateToString, formatNumber} from "../../../helpers/functions";

// Component
function UsersDetailModal({user}) {
    // Data
    const {avatar, name, sims, description, status, creation} = user;

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
                                        <span className="mr-1">
                                            {status
                                                ? <i className='fa fa-lock-open text-success' />
                                                : <i className='fa fa-lock text-danger' />
                                            }
                                        </span>
                                        <div className="text-center">
                                            <img src={avatar} alt="avatar..."
                                                 className="profile-user-img img-fluid img-circle"
                                            />
                                        </div>
                                        <h3 className="profile-username text-center">{name}</h3>
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b><i className='fa fa-calendar-alt' /> Date de céation</b>
                                                <span className="float-right">{dateToString(creation)}</span>
                                            </li>
                                        </ul>
                                        <strong><i className="fa fa-user-secret mr-1" /> Description</strong>
                                        <p className="text-muted">{description}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Sims */}
                            <div className="card custom-card-outline">
                                <div className="card-header" id="headingSims">
                                    <strong className="mb-0">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseSims" className='text-theme'>
                                            <i className='fa fa-sim-card' /> Puces ({formatNumber(sims.length)})
                                        </a>
                                    </strong>
                                </div>
                                <div id="collapseSims" className="collapse" aria-labelledby="headingSims" data-parent="#accordion">
                                    <div className='card-body'>
                                        <SimsListPlain sims={sims} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Prop types to ensure destroyed props data type
UsersDetailModal.propTypes = {
    user: PropTypes.object.isRequired
};

export default React.memo(UsersDetailModal);

import React from 'react';
import PropTypes from 'prop-types';

import {formatNumber, formatString} from "../../../helpers/functions";

// Component
function AgentsCard({agent, children}) {
    // Data
    const {avatar, reference, name, phone, sims, zone, status} = agent;

    // Render
    return (
        <div className="card custom-card-outline">
            <div className="card-body">
                <div className="row">
                    <div className="col-7">
                        {status
                            ? <i className='fa fa-lock-open text-success' />
                            : <i className='fa fa-lock text-danger' />
                        }
                        <h6><b>{formatString(name, 10)}</b></h6>
                        <p className="text-muted text-sm">
                            <i className="fa fa-edit" /> {reference} <br/>
                            <i className="fa fa-phone" /> {phone} <br/>
                            {zone && <><i className="fa fa-map" /> {zone.name}<br/></>}
                            {sims && <><i className="fa fa-sim-card" /> {formatNumber(sims.length)}</>}
                        </p>
                    </div>
                    <div className="col-5 text-center">
                        <img src={avatar} alt="..." className="img-circle img-fluid" />
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

// Prop types to ensure destroyed props data type
AgentsCard.propTypes = {
    agent: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

// Connect component to Redux
export default React.memo(AgentsCard);
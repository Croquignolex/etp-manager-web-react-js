import React from 'react';
import PropTypes from 'prop-types';

import {formatString} from "../../../helpers/functions";

// Component
function CollectorsCard({collector, children}) {
    // Data
    const {avatar, email, name, phone, zone, status} = collector;

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
                            <i className='fa fa-at' /> {formatString(email, 12)} <br/>
                            <i className="fa fa-phone" /> {phone} <br/>
                            {zone && <><i className="fa fa-map" /> {zone.name}</>}
                        </p>
                    </div>
                    <div className="col-5 text-center">
                        <img src={avatar} alt="..." className="img-circle img-fluid" />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="text-right">
                    {children}
                </div>
            </div>
        </div>
    )
}

// Prop types to ensure destroyed props data type
CollectorsCard.propTypes = {
    children: PropTypes.node.isRequired,
    collector: PropTypes.object.isRequired,
};

// Connect component to Redux
export default React.memo(CollectorsCard);
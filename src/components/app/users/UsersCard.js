import React from 'react';
import PropTypes from 'prop-types';

import {formatString, roleBadgeColor} from "../../../helpers/functions";

// Component
function UsersCard({user, children}) {
    // Data
    const {avatar, email, name, phone, role, status} = user;

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
                            <span className={`badge badge-${roleBadgeColor(role.name)}`}>{role.name}</span>
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
UsersCard.propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

// Connect component to Redux
export default React.memo(UsersCard);
import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {dateToString} from "../../functions/generalFunctions";
import {emitNotificationRead} from "../../redux/notifications/actions";

// Component
function FleetsCardsComponent({fleets, dispatch}) {
    // Render
    return (
        <div className="row">
            {fleets.map((item, key) => {
                return (
                    <div className="col-lg-4 col-md-6" key={key}>
                        <div className={`${item.read ? '' : 'bg-theme-light'} card`}>
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="far fa-clock mr-2" />
                                    {item.amount}
                                </h3>
                            </div>
                            <div className="card-body">{item.message}</div>
                        </div>
                    </div>
                )
            })}
            {fleets.length === 0 &&
                <div className="col-12">
                    <div className='alert custom-active text-center'>
                        Pas de demandes de flotte
                    </div>
                </div>
            }
        </div>
    )
}

// Prop types to ensure destroyed props data type
FleetsCardsComponent.propTypes = {
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default React.memo(FleetsCardsComponent);

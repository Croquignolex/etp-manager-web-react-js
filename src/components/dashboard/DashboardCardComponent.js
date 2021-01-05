import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function DashboardCardComponent({request, icon, label, color, data, url}) {
    // Render
    return (
        <>
            {requestLoading(request)  ? <div className='small-box'><LoaderComponent /></div> : (
                requestFailed(request) ? <ErrorAlertComponent message={request.message} /> : (
                    <div className={`small-box ${color}`}>
                        <div className="inner">
                            <h3>{data}</h3>
                            <p>{label}</p>
                        </div>
                        <div className="icon"><i className={icon} /></div>
                        <Link to={url} className="small-box-footer">
                            Détails <i className="fas fa-arrow-circle-right" />
                        </Link>
                    </div>
                )
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
DashboardCardComponent.propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    request: PropTypes.object.isRequired,
};

export default React.memo(DashboardCardComponent);
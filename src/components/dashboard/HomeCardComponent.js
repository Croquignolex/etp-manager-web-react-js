import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

// Component
function HomeCardComponent({label, color, url}) {
    // Render
    return (
        <Link to={url}>
            <div className="text-center p-lg-5 p-md-4 p-2">
                <div className={`rounded py-5 px-2 ${color}`}>
                    {label} <i className="fa fa-arrow-alt-circle-right" />
                </div>
            </div>
        </Link>
    )
}

// Prop types to ensure destroyed props data type
HomeCardComponent.propTypes = {
    url: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default React.memo(HomeCardComponent);

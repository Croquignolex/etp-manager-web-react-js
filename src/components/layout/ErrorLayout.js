import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import '../../assets/scss/error.scss';

// Component
function ErrorLayout({code, title, description}) {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404"/>
                    <h1>{code}</h1>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <Link to='/'>Retour</Link>
                </div>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
ErrorLayout.propTypes = {
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default React.memo(ErrorLayout)
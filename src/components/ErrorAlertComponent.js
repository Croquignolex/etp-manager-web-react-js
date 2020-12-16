import React from "react";
import PropTypes from "prop-types";
import {Alert} from "react-bootstrap";

import {playErrorSound} from "../functions/playSoundFunctions";

// Component
function ErrorAlertComponent({message}) {
    // Play sound
    playErrorSound();

    // Render
    return <Alert variant="danger" className='text-center mb-2'>{message}</Alert>;
}

// Prop types to ensure destroyed props data type
ErrorAlertComponent.propTypes = {
    message: PropTypes.string.isRequired
};

// Connect component to Redux
export default React.memo(ErrorAlertComponent);

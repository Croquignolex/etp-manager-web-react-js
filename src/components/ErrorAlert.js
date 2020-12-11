import PropTypes from "prop-types";
import {Alert} from "react-bootstrap";
import React, {useContext} from "react";
import {ErrorsContext} from "../helpers/contexts";
import {playErrorSound} from "../helpers/functions";

// Component
function ErrorAlert({scope}) {
    // Context states
    const errors = useContext(ErrorsContext);

    // Data
    const {variant, message, show} = errors.list.find(item => item.scope === scope);

    // Play sound
    show && playErrorSound();

    // Render
    return (
        <>
            {show &&
                <>
                    <Alert variant={variant} className='text-center mb-2'>
                        {message}
                    </Alert>
                </>
            }
        </>
    );
}

// Prop types to ensure destroyed props data type
ErrorAlert.propTypes = {
    scope: PropTypes.string.isRequired
};

// Connect component to Redux
export default React.memo(ErrorAlert);

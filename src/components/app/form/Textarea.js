import React  from 'react';
import PropTypes from 'prop-types';

import {getFieldColor} from "../../../helpers/functions";

// Component
function AppFormTextarea({id, label, input, handleInput}) {
    // Data
    const {val, message, isValid} = input;

    // Render
    return (
        <>
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                 <textarea rows='3'
                           id={id}
                           value={val ? val : ''}
                           style={getFieldColor(input)}
                           onChange={(e) => handleInput(true, e.target.value)}
                           className={`form-control ${!isValid && 'is-invalid'}`}
                 />
                <small className={'text-danger'}>{!isValid && message}</small>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
AppFormTextarea.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    handleInput: PropTypes.func.isRequired
};

export default React.memo(AppFormTextarea);
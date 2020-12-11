import React  from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import {getFieldColor} from "../../../helpers/functions";

// Component
function AppFormAmount({id, label, input, handleInput}) {
    // Data
    const {message, isValid} = input;

    // Render
    return (
        <>
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <NumberFormat
                    id={id}
                    value={input.val}
                    thousandSeparator={true}
                    style={getFieldColor(input)}
                    className={`form-control ${!isValid && 'is-invalid'}`}
                    onValueChange={({value}) => handleInput(true, value)}
                />
                <small className={'text-danger'}>{!isValid && message}</small>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
AppFormAmount.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    handleInput: PropTypes.func.isRequired
};

export default React.memo(AppFormAmount);
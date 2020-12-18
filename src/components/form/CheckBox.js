import React  from 'react';
import PropTypes from 'prop-types';

// Component
function AppFormCheckbox({id, input, center, handleInput}) {
    // Render
    return (
        <>
            <div className={`${center && 'text-center'} form-group`}>
                <div className="custom-control custom-switch custom-switch-on-success">
                    <input id={id}
                           checked={input}
                           type="checkbox"
                           className="custom-control-input"
                           onChange={() => handleInput(input)}
                    />
                    <label className="custom-control-label" htmlFor={id} />
                </div>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
AppFormCheckbox.propTypes = {
    center: PropTypes.bool,
    id: PropTypes.string.isRequired,
    input: PropTypes.bool.isRequired,
    handleInput: PropTypes.func.isRequired
};

// Prop types to ensure destroyed props data type
AppFormCheckbox.defaultProps = {
    center: true
};

export default React.memo(AppFormCheckbox);
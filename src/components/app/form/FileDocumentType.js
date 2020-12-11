import React  from 'react';
import PropTypes from 'prop-types';

// Component
function AppFormFileDocumentType({id, label, input, description, handleInput}) {
    // Data
    const {message, isValid} = input;

    // Render
    return (
        <>
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <div className="custom-file">
                    <input type='file'
                           onChange={(e) => handleInput(true, e.target.files[0])}
                    />
                </div>
                <small className={'text-danger'}>{!isValid && message}</small>
                <p className='text-primary'>
                    <small>
                        <strong>{description}</strong>
                    </small>
                </p>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
AppFormFileDocumentType.propTypes = {
    id: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired
};

AppFormFileDocumentType.defaultProps = {
    description: "Le fichier doit être de type PDF, PNG, JPG ou JPEG et avoir une taille inférieure à 10Mo"
};

export default React.memo(AppFormFileDocumentType);

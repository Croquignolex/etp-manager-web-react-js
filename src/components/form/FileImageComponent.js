import PropTypes from 'prop-types';
import React, {useState} from 'react';
import FileBase64 from 'react-file-base64';

// Component
function AppFormFileImageType({id, label, input, handleInput}) {
    //Local state
   const [preview, setPreview] = useState('');

    // Data
    const {message, isValid} = input;

    // Render
    return (
        <>
            <div className='col-sm-6'>
                <div className="form-group">
                    <label htmlFor={id}>{label}</label>
                    <div className="custom-file">
                        <FileBase64
                            multiple={false}
                            onDone={(e) => {
                                setPreview(e.base64)
                                handleInput(true, e.file)
                            }}
                        />
                    </div>
                    <small className={'text-danger'}>{!isValid && message}</small>
                    <p className='text-primary'>
                        <small>
                            <strong>
                                L'image doit être de type PNG, JPG ou JPEG et
                                avoir une taile inférieure à 2Mo
                            </strong>
                        </small>
                    </p>
                </div>
            </div>
            <div className='col-sm-6'>
                {preview &&
                    <img alt='...'
                         src={preview}
                         className='profile-user-img img-fluid'
                    />
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
AppFormFileImageType.propTypes = {
    id: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired
};

export default React.memo(AppFormFileImageType);

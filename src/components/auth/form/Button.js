import React  from 'react';
import PropTypes from 'prop-types';

// Component
function AuthFormButton({processing}) {
    // Render
    return (
        <div className="col-6">
            {processing ?
                (
                    <button disabled type="submit"
                            className="login-btn btn btn-block"
                    >
                        <img alt='...'
                             className="spinner-loader"
                             src={require('../../../assets/images/spinner-light.svg')}
                        />
                    </button>
                ) :
                (
                    <button type="submit"
                            className="login-btn btn btn-dark btn-block"
                    >
                        <i className='fa fa-sign-in' />&nbsp;
                        Connexion
                    </button>
                )
            }
        </div>
    )
}

// Prop types to ensure destroyed props data type
AuthFormButton.propTypes = {
    processing: PropTypes.bool.isRequired
};

export default React.memo(AuthFormButton);
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import Footer from "../components/Footer";
import Input from "../components/auth/form/Input";
import ErrorAlert from "../components/ErrorAlert";
import Button from "../components/auth/form/Button";
import {LOGIN_SCOPE} from "../constants/scopeConstants";
import {storeResetErrorData} from "../redux/errors/actions";
import {DEFAULT_FORM_DATA} from "../constants/defaultConstants";
import {emitAttemptUserAuthentication} from "../redux/user/actions";
import {phoneChecker, passwordChecker} from "../helpers/formsChecker";
import {shouldShowError, playWarningSound, processingRequest} from "../helpers/functions";

// Component
function LoginPage({match, errors, requests, dispatch}) {

    console.log({match});
    // Local state
    const [username, setUsername] = useState(DEFAULT_FORM_DATA);
    const [password, setPassword] = useState(DEFAULT_FORM_DATA);

    // Data
    const scope = LOGIN_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => { shouldResetErrorData(); };
        // eslint-disable-next-line
    }, [scope]);

    // Trigger login form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _username = phoneChecker(username);
        const _password = passwordChecker(password);
        // Set value
        setUsername(_username);
        setPassword(_password);
        const validationOK = _username.isValid && _password.isValid;
        // Check
        if(validationOK) {
            dispatch(emitAttemptUserAuthentication({
                phone: _username.val,
                password: _password.val
            }));
        } else playWarningSound();
    };

    // Render
    return (
        <div className="auth-home">
            <div className="login-box">
                <div className="login-logo">
                    <span><img alt="..." width="80" src={require('../assets/images/logo.png')} /></span>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Connectez-vous</p>
                        {shouldShowError(scope, errors.list) && <ErrorAlert scope={scope} />}
                        <form name="form" onSubmit={handleSubmit}>
                            <Input type='number'
                                   input={username}
                                   label='Téléphone'
                                   icon='fas fa-phone'
                                   handleInput={(isValid, val) => {
                                       shouldResetErrorData();
                                       setUsername({...username, isValid, val});
                                   }}
                            />
                            <Input type='password'
                                   input={password}
                                   icon='fas fa-lock'
                                   label='Mot de passe'
                                   handleInput={(isValid, val) => {
                                       shouldResetErrorData();
                                       setPassword({...username, isValid, val});
                                   }}
                            />
                            <div className="row mt-10">
                                <div className="col-6" />
                                <Button processing={processingRequest(scope, requests.list)} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer needAbsolutePosition={true} />
        </div>
    )
}

// Prop types to ensure destroyed props data type
LoginPage.propTypes = {
    match: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    requests: PropTypes.object.isRequired,
};

export default React.memo(LoginPage);
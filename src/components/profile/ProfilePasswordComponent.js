import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import {NotificationManager} from 'react-notifications';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitUserPasswordUpdate} from "../../redux/user/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {storeUserCheckRequestReset} from "../../redux/requests/actions";
import {storeResetUserPasswordEditErrorData} from "../../redux/errors/actions";
import {requestLoading, requestSucceeded} from "../../functions/generalFunctions";
import {playInfoSound, playWarningSound} from "../../functions/playSoundFunctions";
import {passwordChecker, passwordConfirmChecker} from "../../functions/checkerFunctions";

// Component
function ProfilePasswordComponent({error, request, dispatch}) {
    // Local state
    const [oldPassword, setOldPassword] = useState(DEFAULT_FORM_DATA);
    const [newPassword, setNewPassword] = useState(DEFAULT_FORM_DATA);
    const [confirmPassword, setConfirmPassword] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            playInfoSound();
            setOldPassword(DEFAULT_FORM_DATA);
            setNewPassword(DEFAULT_FORM_DATA);
            setConfirmPassword(DEFAULT_FORM_DATA);
            NotificationManager.info('Bravo!', 'Mot de passe mis à jour avec succès');
        }
    }, [request]);

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            dispatch(storeUserCheckRequestReset());
            dispatch(storeResetUserPasswordEditErrorData());
        };
        // eslint-disable-next-line
    }, []);

    const handleOldPasswordInput = (data) => {
        dispatch(storeResetUserPasswordEditErrorData());
        setOldPassword({...oldPassword, isValid: true, data})
    }

    const handleNewPasswordInput = (data) => {
        dispatch(storeResetUserPasswordEditErrorData());
        setNewPassword({...newPassword, isValid: true, data})
    }

    const handleConfirmPasswordInput = (data) => {
        dispatch(storeResetUserPasswordEditErrorData());
        setConfirmPassword({...confirmPassword, isValid: true, data})
    }

    // Trigger password form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(storeResetUserPasswordEditErrorData());
        // Check values
        const _oldPassword = passwordChecker(oldPassword);
        const _newPassword = passwordChecker(newPassword);
        const _confirmPassword = passwordConfirmChecker(confirmPassword, newPassword);
        // Set value
        setOldPassword(_oldPassword);
        setNewPassword(_newPassword);
        setConfirmPassword(_confirmPassword);
        const validationOK = (_oldPassword.isValid && _newPassword.isValid && _confirmPassword.isValid);
        // Check
        if(validationOK) {
            dispatch(emitUserPasswordUpdate({
                oldPassword: _oldPassword.val,
                newPassword: _newPassword.val,
            }));
        } else playWarningSound();
    };

    // Render
    return (
        <>
            {error.show && <ErrorAlertComponent message={error.message} />}
            {/* Password form */}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <InputComponent label='Ancien'
                                        type='password'
                                        input={oldPassword}
                                        id='inputOldPassword'
                                        handleInput={handleOldPasswordInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <InputComponent label='Nouveau'
                                        type='password'
                                        input={newPassword}
                                        id='inputNewPassword'
                                        handleInput={handleNewPasswordInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <InputComponent type='password'
                                        label='Confirmer'
                                        input={confirmPassword}
                                        id='inputConfirmPassword'
                                        handleInput={handleConfirmPasswordInput}
                        />
                    </div>
                </div>
                <div className="row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
ProfilePasswordComponent.propTypes = {
    error: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
};

export default React.memo(ProfilePasswordComponent);
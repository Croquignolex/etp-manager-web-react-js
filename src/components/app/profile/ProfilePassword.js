import React, {useContext, useEffect, useState} from 'react';

import Input from "../form/Input";
import Button from "../form/Button";
import ErrorAlert from "../../ErrorAlert";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUserPasswordUpdate} from "../../../redux/user/actions";
import {DEFAULT_FORM_DATA, PROFILE_PASSWORD_SCOPE} from "../../../helpers/constants";
import {passwordChecker, passwordConfirmChecker} from "../../../helpers/formsChecker";
import {ErrorsContext, DispatchContext, RequestsContext} from "../../../helpers/contexts";
import {
    shouldShowError,
    playWarningSound,
    succeededRequest,
    processingRequest
} from "../../../helpers/functions";

// Component
function ProfilePassword() {
    // Local state
    const [oldPassword, setOldPassword] = useState(DEFAULT_FORM_DATA);
    const [newPassword, setNewPassword] = useState(DEFAULT_FORM_DATA);
    const [confirmPassword, setConfirmPassword] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = PROFILE_PASSWORD_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            setOldPassword(DEFAULT_FORM_DATA);
            setNewPassword(DEFAULT_FORM_DATA);
            setConfirmPassword(DEFAULT_FORM_DATA);
        }
        // eslint-disable-next-line
    }, [requests]);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Trigger password form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _oldPassword = passwordChecker(oldPassword);
        const _newPassword = passwordChecker(newPassword);
        const _confirmPassword = passwordConfirmChecker(newPassword, confirmPassword);
        // Set value
        setOldPassword(_oldPassword);
        setNewPassword(_newPassword);
        setConfirmPassword(_confirmPassword);
        const validationOK = (
            _oldPassword.isValid && _newPassword.isValid && _confirmPassword.isValid
        );
        // Check
        if(validationOK)
            dispatch(emitUserPasswordUpdate({
                oldPassword: _oldPassword.val,
                newPassword: _newPassword.val,
            }));
        else playWarningSound();
    };

    // Render
    return (
        <>
            {shouldShowError(scope, errors.list) &&
                <ErrorAlert scope={scope} />
            }
            {/* Password form */}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Input label='Ancien'
                               type='password'
                               input={oldPassword}
                               id='inputOldPassword'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setOldPassword({...oldPassword, isValid, val})
                               }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Input label='Nouveau'
                               type='password'
                               input={newPassword}
                               id='inputNewPassword'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setNewPassword({...newPassword, isValid, val})
                               }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Input type='password'
                               label='Confirmer'
                               input={confirmPassword}
                               id='inputConfirmPassword'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setConfirmPassword({...confirmPassword, isValid, val})
                               }}
                        />
                    </div>
                </div>
                <div className="row">
                    <Button processing={processingRequest(scope, requests.list)} />
                </div>
            </form>
        </>
    )
}

export default React.memo(ProfilePassword);
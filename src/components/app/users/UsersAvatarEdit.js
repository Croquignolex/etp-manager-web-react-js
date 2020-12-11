import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import ErrorAlert from "../../ErrorAlert";
import FileImageType from "../form/FileImageType";
import {emitUserAvatarUpdate} from "../../../redux/user/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {requiredImageChecker} from "../../../helpers/formsChecker";
import {DEFAULT_FORM_DATA, PROFILE_AVATAR_SCOPE} from "../../../helpers/constants";
import {DispatchContext, ErrorsContext, RequestsContext} from "../../../helpers/contexts";
import {
    shouldShowError,
    playWarningSound,
    processingRequest
} from "../../../helpers/functions";

// Component
function UsersAvatarEdit() {
    // Local state
    const [avatar, setAvatar] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = PROFILE_AVATAR_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Trigger avatar form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _avatar = requiredImageChecker(avatar);
        // Set value
        setAvatar(_avatar);
        const validationOK = _avatar.isValid && _avatar.val;
        // Make sure file has been well parsed
        if(validationOK) dispatch(emitUserAvatarUpdate({avatar: _avatar.val}));
        else playWarningSound();
    };

    // Render
    return (
        <>
            {shouldShowError(scope, errors.list) &&
                <ErrorAlert scope={scope} />
            }
            {/* Avatar form */}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <FileImageType label='Image de profil' input={avatar} id='inputAvatar'
                          handleInput={(isValid, val) => {
                              shouldResetErrorData();
                              setAvatar({...avatar, isValid, val});
                          }}
                    />
                </div>
                <div className="form-group row">
                    <Button processing={processingRequest(scope, requests.list)} />
                </div>
            </form>
        </>
    )
}

export default React.memo(UsersAvatarEdit);
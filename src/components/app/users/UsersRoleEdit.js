import React, {useState, useEffect, useContext} from 'react';

import Loader from "../../Loader";
import Button from "../form/Button";
import ErrorAlert from "../../ErrorAlert";
import Select from "../../app/form/Select";
import {emitRolesFetch} from "../../../redux/roles/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {emitUpdateUserRole} from "../../../redux/users/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {
    shouldShowError,
    processingRequest,
    dataToArrayForSelect, playWarningSound
} from "../../../helpers/functions";
import {
    USER_SCOPE,
    ROLES_SCOPE,
    DEFAULT_FORM_DATA,
    USER_ROLE_EDIT_SCOPE
} from "../../../helpers/constants";
import {
    RolesContext,
    UsersContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";

// Component
function UserRoleEdit() {
    // Local state
    const [role, setRole] = useState(DEFAULT_FORM_DATA);

    // Context states
    const roles = useContext(RolesContext);
    const users = useContext(UsersContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const user = users.current;
    const parentScope = USER_SCOPE;
    const scope = USER_ROLE_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitRolesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setRole({...DEFAULT_FORM_DATA, val: user.role.id});
        // eslint-disable-next-line
    }, [user]);

    // Trigger operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _role = requiredChecker(role);
        // Set value
        setRole(_role);
        const validationOK = _role.isValid;
        // Check
        if(validationOK) {
            dispatch(emitUpdateUserRole({
                id: user.id,
                role: _role.val
            }))
        } else playWarningSound();
    };

    // Render
    return (
        <>
            {processingRequest(parentScope, requests.list) ? <Loader/> : (
                <>
                    {shouldShowError(scope, errors.list) &&
                        <ErrorAlert scope={scope} />
                    }
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <Select label='Rôle'
                                        input={role}
                                        id='inputRole'
                                        title='Choisir un rôle'
                                        data={dataToArrayForSelect(roles.list)}
                                        requestProcessing={processingRequest(ROLES_SCOPE, requests.list)}
                                        handleInput={(isValid, val) => {
                                            shouldResetErrorData();
                                            setRole({...role, isValid, val})
                                        }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <Button processing={processingRequest(scope, requests.list)} />
                        </div>
                    </form>
                </>
            )}
        </>
    )
}

export default React.memo(UserRoleEdit);
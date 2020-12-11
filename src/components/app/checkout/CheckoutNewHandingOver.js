import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import ErrorAlert from "../../ErrorAlert";
import {emitUsersFetch} from "../../../redux/users/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {emitNewHandover} from "../../../redux/handovers/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {
    MANAGER,
    USERS_SCOPE,
    DEFAULT_FORM_DATA,
    HANDOVER_NEW_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    succeededRequest,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    UserContext,
    UsersContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from "../../../helpers/contexts";
import DisabledInput from "../form/DisabledInput";
import {emitUserBalance} from "../../../redux/user/actions";

// Component
function CheckoutNewHandingOver({handleClose}) {
    // Local state
    const [done, setDone] = useState(false);
    const [manager, setManager] = useState(DEFAULT_FORM_DATA);

    // Context states
    const user =  useContext(UserContext);
    const users =  useContext(UsersContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = HANDOVER_NEW_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitUsersFetch());
        dispatch(emitUserBalance());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list) && done) {
            handleClose();
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _manager = requiredChecker(manager);
        // Set value
        setManager(_manager);
        const validationOK = (_manager.isValid);
        // Check
        if(validationOK) {
            dispatch(emitNewHandover({
                manager: _manager.val,
                amount: user.account.balance,
            }));
            setDone(true);
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {shouldShowError(scope, errors.list) &&
                <ErrorAlert scope={scope} />
            }
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <DisabledInput
                            label='Montant'
                            id='inputAmount'
                            val={user.account.balance}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Select input={manager}
                                id='inputSimManager'
                                label='Gestionnaire de flotte'
                                title='Choisir un gestionnaire de flotte'
                                requestProcessing={processingRequest(USERS_SCOPE, requests.list)}
                                data={dataToArrayForSelect(users.list.filter(_user => ((_user.role.name === MANAGER) && _user.id !== user.id)))}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setManager({...manager, isValid, val});
                                }}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <Button processing={processingRequest(scope, requests.list)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
CheckoutNewHandingOver.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default React.memo(CheckoutNewHandingOver);

import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateOperator} from "../../../redux/operators/actions";
import {
    OPERATOR_SCOPE,
    DEFAULT_FORM_DATA,
    OPERATOR_EDIT_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    processingRequest
} from "../../../helpers/functions";
import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    OperatorsContext
} from "../../../helpers/contexts";

// Component
function OperatorsEdit() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);

    // Data
    const scope = OPERATOR_EDIT_SCOPE;
    const parentScope = OPERATOR_SCOPE;
    const operator = operators.current;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        const {name, description} = operator;
        setName({...DEFAULT_FORM_DATA, val: name});
        setDescription({...DEFAULT_FORM_DATA, val: description});
        // eslint-disable-next-line
    }, [operator]);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Trigger operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        // Set value
        setName(_name);
        const validationOK = _name.isValid;
        // Check
        if(validationOK)
            dispatch(emitUpdateOperator({
                id: operator.id,
                name: _name.val,
                description: description.val
            }));
        else playWarningSound();
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
                                <Input label='Nom'
                                       type='text'
                                       input={name}
                                       id='inputName'
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setName({...name, isValid, val})
                                       }}
                                />
                            </div>
                            <div className='col-sm-6'>
                                <TextArea label='Description'
                                          input={description}
                                          id='inputDescription'
                                          handleInput={(isValid, val) => {
                                              shouldResetErrorData();
                                              setDescription({...description, isValid, val})
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

export default React.memo(OperatorsEdit);

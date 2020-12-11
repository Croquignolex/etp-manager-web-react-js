import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import {processingRequest} from "../../../helpers/functions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateCollector} from "../../../redux/collectors/actions";
import {playWarningSound, shouldShowError} from "../../../helpers/functions";
import {
    COLLECTOR_SCOPE,
    DEFAULT_FORM_DATA,
    COLLECTOR_EDIT_SCOPE,
} from "../../../helpers/constants";
import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    CollectorsContext,
} from "../../../helpers/contexts";

// Component
function CollectorsEdit() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [email, setEmail] = useState(DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const scope = COLLECTOR_EDIT_SCOPE;
    const parentScope = COLLECTOR_SCOPE;
    const userData = collectors.current;
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

    useEffect(() => {
        const {name, address, description, email} = userData;
        setName({...DEFAULT_FORM_DATA, val: name});
        setEmail({...DEFAULT_FORM_DATA, val: email});
        setAddress({...DEFAULT_FORM_DATA, val: address});
        setDescription({...DEFAULT_FORM_DATA, val: description});
        // eslint-disable-next-line
    }, [userData]);

    // Trigger user information form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        // Set value
        setName(_name);
        const validationOK = _name.isValid;
        // Check
        if(validationOK)
            dispatch(emitUpdateCollector({
                id: userData.id,
                name: _name.val,
                email: email.val,
                address: address.val,
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
                                <Input type='text'
                                       label='Email'
                                       input={email}
                                       id='inputEmail'
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setEmail({...email, isValid, val})
                                       }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <TextArea label='Adresse'
                                          input={address}
                                          id='inputAddress'
                                          handleInput={(isValid, val) => {
                                              shouldResetErrorData();
                                              setAddress({...address, isValid, val})
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

export default React.memo(CollectorsEdit);
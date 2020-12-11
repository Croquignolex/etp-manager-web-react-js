import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateCompany} from "../../../redux/companies/actions";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    COMPANY_SCOPE,
    DEFAULT_FORM_DATA,
    COMPANY_EDIT_SCOPE
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
    CompaniesContext
} from "../../../helpers/contexts";

// Component
function CompaniesEdit() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [phone, setPhone] = useState(DEFAULT_FORM_DATA);
    const [manager, setManager] = useState(DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const companies = useContext(CompaniesContext);

    // Data
    const scope = COMPANY_EDIT_SCOPE;
    const parentScope = COMPANY_SCOPE;
    const company = companies.current;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        const {name, description, phone, manager, address} = company;
        setName({...DEFAULT_FORM_DATA, val: name});
        setPhone({...DEFAULT_FORM_DATA, val: phone});
        setManager({...DEFAULT_FORM_DATA, val: manager});
        setAddress({...DEFAULT_FORM_DATA, val: address});
        setDescription({...DEFAULT_FORM_DATA, val: description});
        // eslint-disable-next-line
    }, [company]);

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
        const _phone = phoneChecker(phone);
        const _name = requiredChecker(name);
        const _manager = requiredChecker(manager);
        const _address = requiredChecker(address);
        // Set value
        setName(_name);
        setPhone(_phone);
        setManager(_manager);
        setAddress(_address);
        const validationOK = (
            _name.isValid && _phone.isValid &&
            _manager.isValid && _address.isValid
        );
        // Check
        if(validationOK)
            dispatch(emitUpdateCompany({
                id: company.id,
                name: _name.val,
                phone: _phone.val,
                address: _address.val,
                manager: _manager.val,
                description: description.val,
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
                                       input={manager}
                                       id='inputManager'
                                       label='Responsable'
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setManager({...manager, isValid, val})
                                       }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <Input type='number'
                                       input={phone}
                                       id='inputPhone'
                                       label='Téléphone'
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setPhone({...phone, isValid, val})
                                       }}
                                />
                            </div>
                            <div className='col-sm-6'>
                                <Input type='text'
                                       input={address}
                                       label='Adresse'
                                       id='inputAddress'
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setAddress({...address, isValid, val})
                                       }}
                                />
                            </div>
                        </div>
                        <div className='row'>
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

export default React.memo(CompaniesEdit);

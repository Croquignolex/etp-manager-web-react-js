import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import Input from "../../../components/app/form/Input";
import ErrorAlert from "../../../components/ErrorAlert";
import Button from "../../../components/app/form/Button";
import TextArea from "../../../components/app/form/Textarea";
import {emitNewCompany} from "../../../redux/companies/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import FileDocumentType from "../../../components/app/form/FileDocumentType";
import CompaniesHigherOrder from "../../../components/layout/CompaniesHigherOrder";
import {fileChecker, phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    COMPANY_NEW_PAGE,
    DEFAULT_FORM_DATA,
    COMPANY_NEW_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
} from "../../../helpers/functions";
import {
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";

// Component
function CompaniesNewPage() {
    // Local state
    const [doc, setDoc] = useState(DEFAULT_FORM_DATA);
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [phone, setPhone] = useState(DEFAULT_FORM_DATA);
    const [manager, setManager] = useState(DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = COMPANY_NEW_SCOPE;
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
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            setName(DEFAULT_FORM_DATA);
            setPhone(DEFAULT_FORM_DATA);
            setAddress(DEFAULT_FORM_DATA);
            setManager(DEFAULT_FORM_DATA);
            setDescription(DEFAULT_FORM_DATA);
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger new operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _document = fileChecker(doc);
        const _phone = phoneChecker(phone);
        const _name = requiredChecker(name);
        const _manager = requiredChecker(manager);
        const _address = requiredChecker(address);
        // Set value
        setName(_name);
        setPhone(_phone);
        setDoc(_document);
        setManager(_manager);
        setAddress(_address);
        const validationOK = (
            _name.isValid && _phone.isValid && _document.isValid &&
            _manager.isValid && _address.isValid
        );
        // Check
        if(validationOK)
            dispatch(emitNewCompany({
                name: _name.val,
                phone: _phone.val,
                address: _address.val,
                manager: _manager.val,
                document: _document.val,
                description: description.val,
            }));
        else playWarningSound();
    };

    // Render
    return (
        <div className="content-wrapper">
            <Header title={COMPANY_NEW_PAGE} icon={'fa fa-university'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-8 col-sm-10 offset-lg-2 offset-sm-1">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    <div className="tab-content">
                                        {shouldShowError(scope, errors.list) &&
                                            <ErrorAlert scope={scope} />
                                        }
                                        {/* Operator creation form */}
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
                                                <div className='col-sm-6'>
                                                    <FileDocumentType id='file' label='Document' input={doc}
                                                                      handleInput={(isValid, val) => {
                                                                          shouldResetErrorData();
                                                                          setDoc({...doc, isValid, val});
                                                                      }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Button processing={processingRequest(scope, requests.list)} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CompaniesHigherOrder(CompaniesNewPage);

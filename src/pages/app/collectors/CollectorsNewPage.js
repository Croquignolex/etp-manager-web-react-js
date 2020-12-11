import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import Input from "../../../components/app/form/Input";
import ErrorAlert from "../../../components/ErrorAlert";
import Button from "../../../components/app/form/Button";
import Select from "../../../components/app/form/Select";
import TextArea from "../../../components/app/form/Textarea";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitNewCollector} from "../../../redux/collectors/actions";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import CollectorsHigherOrder from "../../../components/layout/CollectorsHigherOrder";
import {
    ZONES_SCOPE,
    DEFAULT_PASSWORD,
    DEFAULT_FORM_DATA,
    COLLECTOR_NEW_PAGE,
    COLLECTOR_NEW_SCOPE
} from "../../../helpers/constants";
import {
    mappedZones,
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    ZonesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";

// Component
function CollectorsNewPage() {
    // Local state
    const [zone, setZone] = useState(DEFAULT_FORM_DATA);
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [phone, setPhone] = useState(DEFAULT_FORM_DATA);
    const [email, setEmail] = useState(DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const zones = useContext(ZonesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = COLLECTOR_NEW_SCOPE;
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
            setEmail(DEFAULT_FORM_DATA);
            setAddress(DEFAULT_FORM_DATA);
            setDescription(DEFAULT_FORM_DATA);
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger new operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _phone = phoneChecker(phone);
        const _name = requiredChecker(name);
        const _zone = requiredChecker(zone);
        // Set value
        setName(_name);
        setZone(_zone);
        setPhone(_phone);
        const validationOK = (
            _zone.isValid &&
            _name.isValid && _phone.isValid
        );
        // Check
        if(validationOK)
            dispatch(emitNewCollector({
                name: _name.val,
                zone: _zone.val,
                email: email.val,
                phone: _phone.val,
                address: address.val,
                password: DEFAULT_PASSWORD,
                description: description.val,
            }));
        else playWarningSound();
    };

    // Render
    return (
        <div className="content-wrapper">
            <Header title={COLLECTOR_NEW_PAGE} icon={'fa fa-user-clock'} />
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
                                            </div>
                                            <div className='row'>
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
                                                <div className='col-sm-6'>
                                                    <Select label='Zone'
                                                            input={zone}
                                                            id='inputZone'
                                                            title='Choisir une zone'
                                                            data={dataToArrayForSelect(mappedZones(zones.list))}
                                                            requestProcessing={processingRequest(ZONES_SCOPE, requests.list)}
                                                            handleInput={(isValid, val) => {
                                                                shouldResetErrorData();
                                                                setZone({...zone, isValid, val})
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

export default CollectorsHigherOrder(CollectorsNewPage);

import React, {useContext, useEffect, useState} from 'react';

import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import DisabledInput from "../form/DisabledInput";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitAddZoneCollectors} from "../../../redux/zones/actions";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    DEFAULT_PASSWORD,
    DEFAULT_FORM_DATA,
    ZONES_ADD_COLLECTORS_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
} from "../../../helpers/functions";
import {
    ZonesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
} from "../../../helpers/contexts";

// Component
function ZonesAddCollector() {
    // Local state
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
    const zone = zones.current;
    const scope = ZONES_ADD_COLLECTORS_SCOPE;
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

    // Trigger add sim form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _phone = phoneChecker(phone);
        const _name = requiredChecker(name);
        // Set value
        setName(_name);
        setPhone(_phone);
        const validationOK = _name.isValid && _phone.isValid;
        // Check
        if(validationOK)
            dispatch(emitAddZoneCollectors({
                id: zone.id,
                name: _name.val,
                email: email.val,
                phone: _phone.val,
                address: address.val,
                password:DEFAULT_PASSWORD,
                description: description.val,
            }));
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
                        <DisabledInput label='Zone'
                                       id='inputZone'
                                       val={zone.name}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Input label='Nom'
                               type='text'
                               input={name}
                               id='inputCollectorName'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setName({...name, isValid, val})
                               }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Input type='number'
                               input={phone}
                               label='Téléphone'
                               id='inputCollectorPhone'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setPhone({...phone, isValid, val})
                               }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Input type='email'
                               label='Email'
                               input={email}
                               id='inputCollectorEmail'
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
                                  id='inputCollectorAddress'
                                  handleInput={(isValid, val) => {
                                      shouldResetErrorData();
                                      setAddress({...address, isValid, val})
                                  }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <TextArea label='Description'
                                  input={description}
                                  id='inputCollectorDescription'
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
    )
}

export default React.memo(ZonesAddCollector);

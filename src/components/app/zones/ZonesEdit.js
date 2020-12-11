import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import {emitUpdateZone} from "../../../redux/zones/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {DEFAULT_FORM_DATA, ZONE_EDIT_SCOPE} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    processingRequest
} from "../../../helpers/functions";
import {
    ZonesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";

// Component
function ZonesEdit({parentScope}) {
    // Local state
    const [map, setMap] = useState(DEFAULT_FORM_DATA);
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const zones = useContext(ZonesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const zone = zones.current;
    const scope = ZONE_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        const {map, name, reference, description} = zone;
        setMap({...DEFAULT_FORM_DATA, val: map});
        setName({...DEFAULT_FORM_DATA, val: name});
        setReference({...DEFAULT_FORM_DATA, val: reference});
        setDescription({...DEFAULT_FORM_DATA, val: description});
        // eslint-disable-next-line
    }, [zone]);

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
            dispatch(emitUpdateZone({
                id: zone.id,
                map: map.val,
                name: _name.val,
                reference: reference.val,
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
                                       label='Référence'
                                       input={reference}
                                       id='inputReference'
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setReference({...reference, isValid, val})
                                       }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <TextArea input={map}
                                          id='inputMap'
                                          label='Url de la map google'
                                          handleInput={(isValid, val) => {
                                              shouldResetErrorData();
                                              setMap({...map, isValid, val})
                                          }}
                                />
                            </div>
                            <div className='col-sm-6'>
                                <TextArea label='Description'
                                          input={description}
                                          id='inputZoneDescription'
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

// Prop types to ensure destroyed props data type
ZonesEdit.propTypes = {
    parentScope: PropTypes.string.isRequired
};

export default React.memo(ZonesEdit);
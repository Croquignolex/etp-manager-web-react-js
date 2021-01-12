import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import TextareaComponent from "../form/TextareaComponent";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function AgentPrimaryInfoEditComponent({request, agent, dispatch}) {
    // Local state
    const [name, setName] = useState({...DEFAULT_FORM_DATA, data: agent.name});
    const [email, setEmail] = useState({...DEFAULT_FORM_DATA, data: agent.email});
    const [address, setAddress] = useState({...DEFAULT_FORM_DATA, data: agent.address});
    const [description, setDescription] = useState({...DEFAULT_FORM_DATA, data: agent.description});

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        //dispatch(storeAgentRequestReset());
    };

    const handleNameInput = (data) => {
        shouldResetErrorData();
        setName({...name, isValid: true, data})
    }

    const handleEmailInput = (data) => {
        shouldResetErrorData();
        setEmail({...email, isValid: true, data})
    }

    const handleAddressInput = (data) => {
        shouldResetErrorData();
        setAddress({...address, isValid: true, data})
    }

    const handleDescriptionInput = (data) => {
        shouldResetErrorData();
        setDescription({...description, isValid: true, data})
    }

    // Trigger user information form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        // Set value
        setName(_name);
        const validationOK = _name.isValid;
        // Check
        /*if(validationOK)
            dispatch(emitUpdateAgent({
                id: userData.id,
                name: _name.val,
                email: email.val,
                town: DEFAULT_TOWN,
                address: address.val,
                reference: reference.val,
                country: DEFAULT_COUNTRY,
                description: description.val
            }));
        else playWarningSound();*/
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <InputComponent label='Nom'
                                        type='text'
                                        input={name}
                                        id='inputName'
                                        handleInput={handleNameInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        label='Email'
                                        input={email}
                                        id='inputEmail'
                                        handleInput={handleEmailInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <TextareaComponent label='Adresse'
                                           input={address}
                                           id='inputAddress'
                                           handleInput={handleAddressInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <TextareaComponent label='Description'
                                           input={description}
                                           id='inputDescription'
                                           handleInput={handleDescriptionInput}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
AgentPrimaryInfoEditComponent.propTypes = {
    agent: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
};

export default React.memo(AgentPrimaryInfoEditComponent);

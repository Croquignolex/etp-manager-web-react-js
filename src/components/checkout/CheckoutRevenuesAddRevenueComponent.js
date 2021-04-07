import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import TextareaComponent from "../form/TextareaComponent";
import {emitAddRevenue} from "../../redux/revenues/actions";
import FileDocumentComponent from "../form/FileDocumentComponent";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAddRevenueRequestReset} from "../../redux/requests/revenues/actions";
import {fileChecker, requiredChecker, requiredFileChecker} from "../../functions/checkerFunctions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function CheckoutRevenuesAddRevenueComponent({request, dispatch, handleClose}) {
    // Local state
    const [doc, setDoc] = useState(DEFAULT_FORM_DATA);
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [reason, setReason] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleReasonInput = (data) => {
        shouldResetErrorData();
        setReason({...reason, isValid: true, data})
    }

    const handleNameInput = (data) => {
        shouldResetErrorData();
        setName({...name, isValid: true, data})
    }

    const handleDescriptionInput = (data) => {
        shouldResetErrorData();
        setDescription({...description, isValid: true, data})
    }

    const handleFileInput = (data) => {
        shouldResetErrorData();
        setDoc({...doc, isValid: true, data})
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddRevenueRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        const _doc = fileChecker(doc);
        const _amount = requiredChecker(amount);
        const _reason = requiredChecker(reason);
        // Set value
        setDoc(_doc);
        setName(_name);
        setAmount(_amount);
        setReason(_reason);
        const validationOK = (_amount.isValid && _name.isValid && _doc.isValid && _reason.isValid);
        // Check
        if(validationOK) {
            dispatch(emitAddRevenue({
                name: _name.data,
                receipt: _doc.data,
                amount: _amount.data,
                reason: _reason.data,
                description: description.data
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputAmount'
                                         label='Montant à encaisser'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <InputComponent label='Nom'
                                        type='text'
                                        input={name}
                                        id='inputName'
                                        handleInput={handleNameInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <TextareaComponent input={reason}
                                           id='inputReason'
                                           handleInput={handleReasonInput}
                                           label="Raison de l'encaissement"
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
                <div className='row'>
                    <div className='col'>
                        <FileDocumentComponent id='file'
                                               input={doc}
                                               label='Réçus (facultatif)'
                                               handleInput={handleFileInput}
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
CheckoutRevenuesAddRevenueComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default React.memo(CheckoutRevenuesAddRevenueComponent);

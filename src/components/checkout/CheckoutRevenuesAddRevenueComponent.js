import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import TextareaComponent from "../form/TextareaComponent";
import {emitAddRevenue} from "../../redux/revenues/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAddRevenueRequestReset} from "../../redux/requests/revenues/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";
import {emitAllVendorsFetch} from "../../redux/vendors/actions";
import {storeAllVendorsRequestReset} from "../../redux/requests/vendors/actions";
import {dataToArrayForSelect} from "../../functions/arrayFunctions";
import SelectComponent from "../form/SelectComponent";
import CheckBoxComponent from "../form/CheckBoxComponent";

// Component
function CheckoutRevenuesAddRevenueComponent({request, vendors, dispatch, handleClose, allVendorsRequests}) {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [vendor, setVendor] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [reason, setReason] = useState(DEFAULT_FORM_DATA);
    const [forVendor, setForVendor] = useState(false);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        dispatch(emitAllVendorsFetch());
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

    const handleDirectPaySelect = (data) => {
        shouldResetErrorData();
        setForVendor(!data)
    }

    const handleVendorInput = (data) => {
        shouldResetErrorData();
        setVendor({...vendor, isValid: true, data})
    }

    const handleDescriptionInput = (data) => {
        shouldResetErrorData();
        setDescription({...description, isValid: true, data})
    }

    // Build select options
    const vendorsSelectOptions = useMemo(() => {
        return dataToArrayForSelect(vendors)
    }, [vendors]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddRevenueRequestReset());
        dispatch(storeAllVendorsRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        const _amount = requiredChecker(amount);
        const _reason = requiredChecker(reason);
        const _vendor = requiredChecker(vendor);
        // Set value
        setName(_name);
        setAmount(_amount);
        setReason(_reason);
        setVendor(_vendor);
        const validationOK = (
            forVendor
                ? (_amount.isValid && _name.isValid && _vendor.isValid)
                : (_amount.isValid && _name.isValid && _reason.isValid)
        );
        // Check
        if(validationOK) {
            dispatch(emitAddRevenue({
                name: _name.data,
                vendor: _vendor.data,
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
            {requestFailed(allVendorsRequests) && <ErrorAlertComponent message={allVendorsRequests.message} />}
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
                        {forVendor ? (
                            <SelectComponent input={vendor}
                                             id='inputVendor'
                                             label='Fournisseur'
                                             title='Choisir un fournicceur'
                                             options={vendorsSelectOptions}
                                             handleInput={handleVendorInput}
                                             requestProcessing={requestLoading(allVendorsRequests)}
                            />
                        ) : (
                            <InputComponent label='Nom'
                                            type='text'
                                            input={name}
                                            id='inputName'
                                            handleInput={handleNameInput}
                            />
                        )}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <TextareaComponent input={reason}
                                           id='inputReason'
                                           handleInput={handleReasonInput}
                                           label="Motif de l'encaissement"
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
                    <div className='col-sm-6'>
                        <label htmlFor="inputAutoPay">Depuis un fournisseur?</label>
                        <CheckBoxComponent input={forVendor}
                                           id='inputAutoPay'
                                           handleInput={handleDirectPaySelect}
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
    vendors: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allVendorsRequests: PropTypes.object.isRequired,
};

export default React.memo(CheckoutRevenuesAddRevenueComponent);

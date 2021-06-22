import PropTypes from "prop-types";
import React, {useEffect, useState, useMemo} from 'react';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import TextareaComponent from "../form/TextareaComponent";
import {emitAddExpense} from "../../redux/expenses/actions";
import {emitAllVendorsFetch} from "../../redux/vendors/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAllVendorsRequestReset} from "../../redux/requests/vendors/actions";
import {storeAddExpenseRequestReset} from "../../redux/requests/expenses/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";
import CheckBoxComponent from "../form/CheckBoxComponent";
import {dataToArrayForSelect} from "../../functions/arrayFunctions";
import SelectComponent from "../form/SelectComponent";

// Component
function CheckoutExpensesAddExpenseComponent({request, vendors, dispatch, handleClose, allVendorsRequests}) {
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
        setForVendor(!data);
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
        dispatch(storeAddExpenseRequestReset());
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
            dispatch(emitAddExpense({
                amount: _amount.data,
                reason: _reason.data,
                description: description.data,
                name: forVendor ? null : _name.data,
                vendor: forVendor ? _vendor.data : null
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
                                         label='Montant à decaisser'
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
                                           label="Motif du déciassement"
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
                        <label htmlFor="inputAutoPay">Vers un fournisseur?</label>
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
CheckoutExpensesAddExpenseComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    vendors: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allVendorsRequests: PropTypes.object.isRequired,
};

export default React.memo(CheckoutExpensesAddExpenseComponent);

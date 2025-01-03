import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitFetchUserBalance} from "../../redux/user/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {emitImproveHandover} from "../../redux/handovers/actions";
import {emitAllManagersFetch} from "../../redux/managers/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {dataToArrayForSelect} from "../../functions/arrayFunctions";
import {storeAllManagersRequestReset} from "../../redux/requests/managers/actions";
import {storeImproveHandoverRequestReset} from "../../redux/requests/handovers/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function CheckoutHandoversImproveHandoverComponent({user, balance, request, managers, allManagersRequests, dispatch, handleClose}) {
    // Local state
    const [manager, setManager] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState({...DEFAULT_FORM_DATA, data: balance});

    // Local effects
    useEffect(() => {
        dispatch(emitAllManagersFetch());
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
            dispatch(emitFetchUserBalance());
            handleClose();
        }
        // eslint-disable-next-line
    }, [request]);

    const handleManagerSelect = (data) => {
        shouldResetErrorData();
        setManager({...manager,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    // Build select options
    const managerSelectOptions = useMemo(() => {
        return dataToArrayForSelect(managers.filter(item => item.id !== user.id))
    }, [managers, user.id]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllManagersRequestReset());
        dispatch(storeImproveHandoverRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        const _manager = requiredChecker(manager);
        // Set value
        setAmount(_amount);
        setManager(_manager);
        const validationOK = (_amount.isValid && _manager.isValid);
        // Check
        if(validationOK) {
            dispatch(emitImproveHandover({
                amount: _amount.data,
                receiver: _manager.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allManagersRequests) && <ErrorAlertComponent message={allManagersRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={manager}
                                         id='inputSimManager'
                                         label='Gestionnaire de flotte'
                                         title='Choisir un gestionnaire'
                                         options={managerSelectOptions}
                                         handleInput={handleManagerSelect}
                                         requestProcessing={requestLoading(allManagersRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputAmount'
                                         label='Montant à transférer'
                                         handleInput={handleAmountInput}
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
CheckoutHandoversImproveHandoverComponent.propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
    request: PropTypes.object.isRequired,
    managers: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    allManagersRequests: PropTypes.object.isRequired,
};

export default React.memo(CheckoutHandoversImproveHandoverComponent);

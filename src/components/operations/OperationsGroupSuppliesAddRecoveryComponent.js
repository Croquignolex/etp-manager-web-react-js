import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import DisabledInput from "../form/DisabledInput";
import AmountComponent from "../form/AmountComponent";
import ButtonComponent from "../form/ButtonComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {emitGroupSupplyAddRecovery} from "../../redux/supplies/actions";
import {storeRecoverRequestReset} from "../../redux/requests/recoveries/actions";
import {
    applySuccess,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";

// Component
function OperationsGroupSuppliesAddRecoveryComponent({supply, request, dispatch, handleClose}) {
    // Local state
    const [amount, setAmount] = useState({
        ...DEFAULT_FORM_DATA,
        data: supply.reduce((acc, val) => acc + parseInt(val.remaining, 10), 0)
    });

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

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeRecoverRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        // Set value
        setAmount(_amount);
        const validationOK = (_amount.isValid);
        // Check
        if(validationOK) {
            const ids = [];
            supply.forEach(item => {
                ids.push(item.id);
            });
            dispatch(emitGroupSupplyAddRecovery({
                ids,
                amount: _amount.data
            }));
        }
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <DisabledInput id='inputAgent'
                                       label='Agent/Ressource'
                                       val={supply[0].agent.name}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <DisabledInput id='inputNumber'
                                       val={supply.length}
                                       label='Flottages groupés'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Montant'
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
OperationsGroupSuppliesAddRecoveryComponent.propTypes = {
    supply: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default React.memo(OperationsGroupSuppliesAddRecoveryComponent);

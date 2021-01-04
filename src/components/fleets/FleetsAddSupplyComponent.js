import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {FLEET_SIMS_TYPE} from "../../constants/typeConstants";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeFleetSupplyRequestReset} from "../../redux/requests/fleets/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function FleetsAddSupplyComponent({item, request, sims, simsRequests, dispatch, handleClose}) {
    // Local state
    const [sim, setSim] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState({...DEFAULT_FORM_DATA, data: item.remaining});

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);

    const handleSimSelect = (data) => {
        shouldResetErrorData();
        setSim({...sim,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const improveSimSelectOptions = () => {
        return dataToArrayForSelect(mappedSims(sims.filter(item => FLEET_SIMS_TYPE.includes(item.type.name))))
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        requestFailed(request) && dispatch(storeFleetSupplyRequestReset());
        requestFailed(simsRequests.all) && dispatch(storeAllSimsRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _sim = requiredChecker(sim);
        const _amount = requiredChecker(amount);
        // Set value
        setAmount(_amount);
        const validationOK = _amount.isValid && _sim.isValid;
        // Check
        if(validationOK) {
           /* dispatch(emitFleetAddSupplyByManager({
                sim: _sim.val,
                amount: _amount.val,
                id: fleet.id,
            }));*/
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(simsRequests.all) && <ErrorAlertComponent message={simsRequests.all.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={sim}
                                         label='Puce'
                                         id='inputSim'
                                         title='Choisir une puce'
                                         handleInput={handleSimSelect}
                                         options={improveSimSelectOptions}
                                         requestProcessing={requestLoading(simsRequests.all)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputAmount'
                                         label='Montant à flotter'
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
FleetsAddSupplyComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    simsRequests: PropTypes.object.isRequired,
};

export default React.memo(FleetsAddSupplyComponent);

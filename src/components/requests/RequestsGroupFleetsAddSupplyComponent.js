import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import DisabledInput from "../form/DisabledInput";
import ButtonComponent from "../form/ButtonComponent";
import SelectComponent from "../form/SelectComponent";
import AmountComponent from "../form/AmountComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAllFleetSimsFetch} from "../../redux/sims/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {emitGroupFleetAddSupply} from "../../redux/fleets/actions";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAllFleetSimsRequestReset} from "../../redux/requests/sims/actions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeFleetSupplyRequestReset} from "../../redux/requests/fleets/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function RequestsGroupFleetsAddSupplyComponent({fleet, request, sims, simsRequests, dispatch, handleClose}) {
    // Local state
    const [sim, setSim] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState({
        ...DEFAULT_FORM_DATA,
        data: fleet.reduce((acc, val) => acc + parseInt(val.amount, 10), 0)
    });

    // Local effects
    useEffect(() => {
        dispatch(emitAllFleetSimsFetch());
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

    const handleSimSelect = (data) => {
        shouldResetErrorData();
        setSim({...sim, isValid: true, data})
    }

    // Build select options
    const simSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(
            sims.filter(item => fleet[0].operator.id === item.operator.id)
        ))
    }, [sims, fleet]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeFleetSupplyRequestReset());
        dispatch(storeAllFleetSimsRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _sim = requiredChecker(sim);
        const _amount = requiredChecker(amount);
        // Set value
        setSim(_sim);
        setAmount(_amount);
        const validationOK = (_amount.isValid && _sim.isValid);
        const ids = [];
        fleet.forEach(item => {
            ids.push(item.id);
        });
        // Check
        if(validationOK) {
            dispatch(emitGroupFleetAddSupply({
                ids,
                sim: _sim.data,
                amount: _amount.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(simsRequests) && <ErrorAlertComponent message={simsRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className='col-sm-6'>
                        <DisabledInput id='inputAgent'
                                       val={fleet[0].agent.name}
                                       label='Agent/Ressource'
                        />
                    </div>
                    <div className='col-sm-6'>
                        <DisabledInput id='inputNumber'
                                       val={fleet.length}
                                       label='Demandes groupées'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={sim}
                                         id='inputSim'
                                         label='Compte flottage'
                                         title='Choisir un compte'
                                         options={simSelectOptions}
                                         handleInput={handleSimSelect}
                                         requestProcessing={requestLoading(simsRequests)}
                        />
                    </div>
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
RequestsGroupFleetsAddSupplyComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    fleet: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    simsRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsGroupFleetsAddSupplyComponent);

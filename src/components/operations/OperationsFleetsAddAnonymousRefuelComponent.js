import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAllZonesFetch} from "../../redux/zones/actions";
import {emitAllFleetSimsFetch} from "../../redux/sims/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {emitAddAnonymousRefuel} from "../../redux/refuels/actions";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {phoneChecker, requiredChecker} from "../../functions/checkerFunctions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAllFleetSimsRequestReset} from "../../redux/requests/sims/actions";
import {storeAddAnonymousRefuelRequestReset} from "../../redux/requests/refuels/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function OperationsFleetsAddAnonymousRefuelComponent({request, sims, simsRequests, zones, zonesRequests, dispatch, handleClose}) {
    // Local state
    const [zone, setZone] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [sender, setSender] = useState(DEFAULT_FORM_DATA);
    const [senderSim, setSenderSim] = useState(DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        dispatch(emitAllZonesFetch());
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

    const handleIncomingSelect = (data) => {
        shouldResetErrorData();
        setIncomingSim({...incomingSim,  isValid: true, data})
    }

    const handleZoneSelect = (data) => {
        shouldResetErrorData();
        setZone({...zone, isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleSenderInput = (data) => {
        shouldResetErrorData();
        setSender({...sender, isValid: true, data})
    }

    const handleSenderSimInput = (data) => {
        shouldResetErrorData();
        setSenderSim({...senderSim, isValid: true, data})
    }

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims))
    }, [sims]);

    // Build select options
    const zoneSelectOptions = useMemo(() => {
        return dataToArrayForSelect(zones)
    }, [zones]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllFleetSimsRequestReset());
        dispatch(storeAddAnonymousRefuelRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _zone = requiredChecker(zone);
        const _amount = requiredChecker(amount);
        const _sender = requiredChecker(sender);
        const _senderSim = phoneChecker(senderSim);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setAmount(_amount);
        setSender(_sender);
        setIncomingSim(_incomingSim);
        const validationOK = (
            _amount.isValid && _sender.isValid && _zone.isValid &&
            _incomingSim.isValid && _senderSim.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitAddAnonymousRefuel({
                zone: _zone.data,
                sender: _sender.data,
                amount: _amount.data,
                sim: _incomingSim.data,
                senderSim: _senderSim.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(simsRequests) && <ErrorAlertComponent message={simsRequests.message} />}
            {requestFailed(zonesRequests) && <ErrorAlertComponent message={zonesRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Montant à déstocker'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        input={sender}
                                        id='inputAnonymousName'
                                        label="Nom de l'agent anonyme"
                                        handleInput={handleSenderInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        input={senderSim}
                                        id='inputAnonymousSim'
                                        label="Compte de l'agent anonyme"
                                        handleInput={handleSenderSimInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimManger'
                                         label='Compte recepteur'
                                         title='Choisir un compte'
                                         options={incomingSelectOptions}
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(simsRequests)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={zone}
                                         label='Zone'
                                         id='inputZone'
                                         title='Choisir une zone'
                                         options={zoneSelectOptions}
                                         handleInput={handleZoneSelect}
                                         requestProcessing={requestLoading(zonesRequests)}
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
OperationsFleetsAddAnonymousRefuelComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    zones: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    simsRequests: PropTypes.object.isRequired,
    zonesRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsFleetsAddAnonymousRefuelComponent);

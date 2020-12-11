import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import {emitSimsFetch} from "../../../redux/sims/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitFleetAddSupplyByManager} from "../../../redux/fleets/actions";
import {
    SIMS_SCOPE,
    FLEET_SIMS_TYPE,
    DEFAULT_FORM_DATA,
    FLEET_ADD_SUPPLY_SCOPE
} from "../../../helpers/constants";
import {
    mappedSims,
    shouldShowError,
    playWarningSound,
    succeededRequest,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    SimsContext,
    ErrorsContext,
    FleetsContext,
    DispatchContext,
    RequestsContext
} from "../../../helpers/contexts";

// Component
function FleetsAddSupply({remainingAmount, handleClose}) {
    // Local state
    const [sim, setSim] = useState(DEFAULT_FORM_DATA);
    const [done, setDone] = useState(false);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);

    // Context states
    const sims = useContext(SimsContext);
    const fleets = useContext(FleetsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const fleet = fleets.current;
    const scope = FLEET_ADD_SUPPLY_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitSimsFetch());
        setAmount({...amount, val: remainingAmount});
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            if(done) {
                setAmount({...amount, val: remainingAmount});
                handleClose()
            }
        }
        // eslint-disable-next-line
    }, [requests]);

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
            dispatch(emitFleetAddSupplyByManager({
                sim: _sim.val,
                amount: _amount.val,
                id: fleet.id,
            }));
            setDone(true)
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {shouldShowError(scope, errors.list) &&
                <ErrorAlert scope={scope} />
            }
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Select label='Puce'
                                input={sim}
                                id='inputSim'
                                title='Choisir une puce'
                                requestProcessing={processingRequest(SIMS_SCOPE, requests.list)}
                                data={dataToArrayForSelect(mappedSims(sims.list.filter(item => FLEET_SIMS_TYPE.includes(item.type.name))))}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setSim({...sim, isValid, val});
                                }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Amount
                            input={amount}
                            id='inputAmount'
                            label='Montant à envoye'
                            handleInput={(isValid, val) => {
                                shouldResetErrorData();
                                setAmount({...amount, isValid, val})
                            }}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <Button processing={processingRequest(scope, requests.list)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
FleetsAddSupply.propTypes = {
    remainingAmount: PropTypes.number.isRequired,
};

export default React.memo(FleetsAddSupply);

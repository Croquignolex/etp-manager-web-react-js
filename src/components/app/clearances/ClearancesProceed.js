import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitClearanceProceedByCollector} from "../../../redux/clearances/actions";
import {
    DEFAULT_FORM_DATA,
    CLEARANCE_PROCEED_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    succeededRequest,
    processingRequest,
} from "../../../helpers/functions";
import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    ClearancesContext,
} from "../../../helpers/contexts";

// Component
function ClearancesProceed({id}) {
    // Local state
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);
    const clearances = useContext(ClearancesContext);

    // Data
    const scope = CLEARANCE_PROCEED_SCOPE;
    const remainingAmount = clearances.list.find(clearance => clearance.id === id).remaining;
    // const operationsFleet = operationsFleets.current;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
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
            setAmount({...amount, val: remainingAmount});
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger clearance proceed form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        // Set value
        setAmount(_amount);
        const validationOK = _amount.isValid;
        // Check
        if(validationOK)
            dispatch(emitClearanceProceedByCollector({
                id,
                amount: _amount.val,
            }));
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
                        <Amount
                            input={amount}
                            id='inputAmount'
                            label= 'Montant en ma possession'
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
ClearancesProceed.propTypes = {
    id: PropTypes.string.isRequired
};

export default React.memo(ClearancesProceed);
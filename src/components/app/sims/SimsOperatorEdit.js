import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Select from "../form/Select";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import {requiredChecker} from "../../../helpers/formsChecker";
import {emitUpdateSimOperator} from "../../../redux/sims/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitOperatorsFetch} from "../../../redux/operators/actions";
import {
    shouldShowError,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    SIM_SCOPE,
    OPERATORS_SCOPE,
    DEFAULT_FORM_DATA,
    SIM_OPERATOR_EDIT_SCOPE
} from "../../../helpers/constants";
import {
    SimsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    OperatorsContext,
} from "../../../helpers/contexts";

// Component
function SimsOperatorEdit() {
    // Local state
    const [operator, setOperator] = useState(DEFAULT_FORM_DATA);

    // Context states
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);

    // Data
    const sim = sims.current;
    const parentScope = SIM_SCOPE;
    const scope = SIM_OPERATOR_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitOperatorsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setOperator({...DEFAULT_FORM_DATA, val: sim.operator.id});
        // eslint-disable-next-line
    }, [sim]);

    // Trigger operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _operator = requiredChecker(operator);
        // Set value
        setOperator(_operator);
        const validationOK = _operator.isValid;
        // Check
        if(validationOK)
            dispatch(emitUpdateSimOperator({
                id: sim.id,
                operator: _operator.val
            }));
        else playWarningSound();
    };

    // Render
    return (
        <>
            {processingRequest(parentScope, requests.list) ? <Loader/> : (
                <>
                    {shouldShowError(scope, errors.list) &&
                        <ErrorAlert scope={scope} />
                    }
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <Select label='Opérateur'
                                        input={operator}
                                        id='inputOperator'
                                        title='Choisir un opérateur'
                                        data={dataToArrayForSelect(operators.list)}
                                        requestProcessing={processingRequest(OPERATORS_SCOPE, requests.list)}
                                        handleInput={(isValid, val) => {
                                            shouldResetErrorData();
                                            setOperator({...operator, isValid, val})
                                        }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <Button processing={processingRequest(scope, requests.list)} />
                        </div>
                    </form>
                </>
            )}
        </>
    )
}

export default React.memo(SimsOperatorEdit);

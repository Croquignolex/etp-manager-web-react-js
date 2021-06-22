import PropTypes from "prop-types";
import React, {useEffect, useState, useMemo} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitUpdateSimOperator} from "../../redux/sims/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {emitAllOperatorsFetch} from "../../redux/operators/actions";
import {dataToArrayForSelect} from "../../functions/arrayFunctions";
import {storeEditSimOperatorRequestReset} from "../../redux/requests/sims/actions";
import {storeAllOperatorsRequestReset} from "../../redux/requests/operators/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function SimOperatorEditComponent({request, sim, operators, dispatch,
                                      handleClose, allOperatorsRequests}) {
    // Local state
    const [operator, setOperator] = useState({...DEFAULT_FORM_DATA, data: sim.operator.id});

    // Local effects
    useEffect(() => {
        dispatch(emitAllOperatorsFetch());
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

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllOperatorsRequestReset());
        dispatch(storeEditSimOperatorRequestReset());
    };

    // Build select options
    const operatorsSelectOptions = useMemo(() => {
        return dataToArrayForSelect(operators);
    }, [operators]);

    const handleOperatorSelect = (data) => {
        shouldResetErrorData();
        setOperator({...operator, isValid: true, data})
    }

    // Trigger user information form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _operator = requiredChecker(operator);
        // Set value
        setOperator(_operator);
        const validationOK = _operator.isValid;
        // Check
        if(validationOK) {
            dispatch(emitUpdateSimOperator({id: sim.id, operator: _operator.data}))
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={operator}
                                         label='Opérateur'
                                         id='inputOperator'
                                         title='Choisir un opérateur'
                                         options={operatorsSelectOptions}
                                         handleInput={handleOperatorSelect}
                                         requestProcessing={requestLoading(allOperatorsRequests)}
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
SimOperatorEditComponent.propTypes = {
    sim: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    operators: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    allOperatorsRequests: PropTypes.object.isRequired,
};

export default React.memo(SimOperatorEditComponent);

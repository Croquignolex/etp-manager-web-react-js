import React, {useContext, useEffect, useState} from 'react';

import Select from "../form/Select";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import DisabledInput from "../form/DisabledInput";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitSimsTypesFetch} from "../../../redux/simsTypes/actions";
import {emitOperatorsFetch} from "../../../redux/operators/actions";
import {emitAddCompanySims} from "../../../redux/companies/actions";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    CORPORATE_TYPE,
    OPERATORS_SCOPE,
    DEFAULT_FORM_DATA,
    COMPANY_ADD_SIMS_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    OperatorsContext,
    CompaniesContext
} from "../../../helpers/contexts";

// Component
function CompaniesAddSim() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [number, setNumber] = useState(DEFAULT_FORM_DATA);
    const [operator, setOperator] = useState(DEFAULT_FORM_DATA);
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);
    const companies = useContext(CompaniesContext);

    // Data
    const company = companies.current;
    const scope = COMPANY_ADD_SIMS_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitOperatorsFetch());
        dispatch(emitSimsTypesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            setName(DEFAULT_FORM_DATA);
            setNumber(DEFAULT_FORM_DATA);
            setReference(DEFAULT_FORM_DATA);
            setDescription(DEFAULT_FORM_DATA);
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger add sim form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        const _number = phoneChecker(number);
        const _operator = requiredChecker(operator);
        // Set value
        setName(_name);
        setOperator(_operator);
        setNumber(_number);
        const validationOK = (_name.isValid && _number.isValid && _operator.isValid);
        // Check
        if(validationOK)
            dispatch(emitAddCompanySims({
                id: company.id,
                name: _name.val,
                number: _number.val,
                operator: _operator.val,
                reference: reference.val,
                description: description.val
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
                        <DisabledInput label='Entrerpise'
                                       id='inputCompany'
                                       val={company.name}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <DisabledInput label='Type'
                                       id='inputType'
                                       val={CORPORATE_TYPE}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Select label='Opérateur'
                                input={operator}
                                id='inputOperator'
                                title='Choisir un oprétateur'
                                data={dataToArrayForSelect(operators.list)}
                                requestProcessing={processingRequest(OPERATORS_SCOPE, requests.list)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setOperator({...operator, isValid, val})
                                }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Input type='text'
                               input={reference}
                               id='inputSimsReference'
                               label='Référence'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setReference({...reference, isValid, val})
                               }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Input label='Nom'
                               type='text'
                               input={name}
                               id='inputSimsName'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setName({...name, isValid, val})
                               }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Input type='number'
                               input={number}
                               id='inputNumber'
                               label='Numéro'
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setNumber({...number, isValid, val})
                               }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <TextArea label='Description'
                                  input={description}
                                  id='inputSimsDescription'
                                  handleInput={(isValid, val) => {
                                      shouldResetErrorData();
                                      setDescription({...description, isValid, val})
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

export default React.memo(CompaniesAddSim);

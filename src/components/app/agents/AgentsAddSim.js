import React, {useContext, useEffect, useState} from 'react';

import Select from "../form/Select";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import DisabledInput from "../form/DisabledInput";
import {emitAddAgentSims} from "../../../redux/agents/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitSimsTypesFetch} from "../../../redux/simsTypes/actions";
import {emitOperatorsFetch} from "../../../redux/operators/actions";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    AGENT_SIMS_TYPE,
    OPERATORS_SCOPE,
    SIMS_TYPES_SCOPE,
    DEFAULT_FORM_DATA,
    AGENT_ADD_SIMS_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    OperatorsContext,
    SimsTypesContext
} from "../../../helpers/contexts";

// Component
function AgentsAddSim() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [number, setNumber] = useState(DEFAULT_FORM_DATA);
    const [operator, setOperator] = useState(DEFAULT_FORM_DATA);
    const [simsType, setSimsType] = useState(DEFAULT_FORM_DATA);
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);
    const simsTypes = useContext(SimsTypesContext);

    // Data
    const agent = agents.current;
    const scope = AGENT_ADD_SIMS_SCOPE;
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
        const _simsType = requiredChecker(simsType);
        // Set value
        setName(_name);
        setOperator(_operator);
        setNumber(_number);
        setSimsType(_simsType);
        const validationOK = (
            _simsType.isValid && _name.isValid &&
            _number.isValid && _operator.isValid
        );

        // Check
        if(validationOK)
            dispatch(emitAddAgentSims({
                id: agent.id,
                name: _name.val,
                number: _number.val,
                simType: _simsType.val,
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
                        <DisabledInput label='Agent'
                                       id='inputAgent'
                                       val={agent.name}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Select label='Type'
                                input={simsType}
                                id='inputType'
                                title='Choisir un type'
                                requestProcessing={processingRequest(SIMS_TYPES_SCOPE, requests.list)}
                                data={dataToArrayForSelect(simsTypes.list.filter(item => AGENT_SIMS_TYPE.includes(item.name)))}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setSimsType({...simsType, isValid, val});
                                }}
                        />
                    </div>
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

export default React.memo(AgentsAddSim);
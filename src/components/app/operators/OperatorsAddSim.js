import React, {useContext, useEffect, useState} from 'react';

import Select from "../form/Select";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import TextArea from "../../app/form/Textarea";
import DisabledInput from "../form/DisabledInput";
import {emitAgentsFetch} from "../../../redux/agents/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitSimsTypesFetch} from "../../../redux/simsTypes/actions";
import {emitCompaniesFetch} from "../../../redux/companies/actions";
import {emitAddOperatorSims} from "../../../redux/operators/actions";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    AGENTS_SCOPE,
    COMPANIES_SCOPE,
    SIMS_TYPES_SCOPE,
    DEFAULT_FORM_DATA,
    OPERATOR_ADD_SIMS_SCOPE
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
    SimsTypesContext,
    CompaniesContext,
} from "../../../helpers/contexts";

// Component
function OperatorsAddSim() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [number, setNumber] = useState(DEFAULT_FORM_DATA);
    const [company, setCompany] = useState(DEFAULT_FORM_DATA);
    const [simsType, setSimsType] = useState(DEFAULT_FORM_DATA);
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);
    const [needAgent, setNeedAgent] = useState(false);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);
    const [needCompany, setNeedCompany] = useState(false);

    // Context states
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);
    const simsTypes = useContext(SimsTypesContext);
    const companies = useContext(CompaniesContext);

    // Data
    const operator = operators.current;
    const simsTypesList = simsTypes.list;
    const scope = OPERATOR_ADD_SIMS_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitAgentsFetch());
        dispatch(emitCompaniesFetch());
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
        const _agent = requiredChecker(agent);
        const _company = requiredChecker(company);
        const _simsType = requiredChecker(simsType);
        // Set value
        setName(_name);
        setAgent(_agent);
        setNumber(_number);
        setCompany(_company);
        setSimsType(_simsType);
        const validationOK = needAgent
            ? (_simsType.isValid && _name.isValid && _number.isValid && _agent.isValid)
            : (needCompany
                    ? (_simsType.isValid && _name.isValid && _number.isValid && _company.isValid)
                    : (_simsType.isValid && _name.isValid && _number.isValid)
            );
        // Check
        if(validationOK) {
            dispatch(emitAddOperatorSims({
                name: _name.val,
                id: operator.id,
                number: _number.val,
                simType: _simsType.val,
                reference: reference.val,
                description: description.val,
                agent: needAgent ? _agent.val : '',
                company: needCompany ? _company.val : '',
            }));
        } else playWarningSound();
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
                        <DisabledInput label='Opérateur'
                                       id='inputOperator'
                                       val={operator.name}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Select label='Type'
                                input={simsType}
                                id='inputType'
                                title='Choisir un type'
                                data={dataToArrayForSelect(simsTypesList)}
                                requestProcessing={processingRequest(SIMS_TYPES_SCOPE, requests.list)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setSimsType({...simsType, isValid, val});
                                    const simsTypeData = simsTypesList.find(item => item.id === val);
                                    setNeedAgent(simsTypeData.needAgent)
                                    setNeedCompany(simsTypeData.needCompany)
                                }}
                        />
                    </div>
                    {needAgent &&
                        <div className='col-sm-6'>
                            <Select label='Agent'
                                    input={agent}
                                    id='inputAgent'
                                    title='Choisir un agent'
                                    data={dataToArrayForSelect(agents.list)}
                                    requestProcessing={processingRequest(AGENTS_SCOPE, requests.list)}
                                    handleInput={(isValid, val) => {
                                        shouldResetErrorData();
                                        setAgent({...agent, isValid, val})
                                    }}
                            />
                        </div>
                    }
                    {needCompany &&
                        <div className='col-sm-6'>
                            <Select input={company}
                                    id='inputCompany'
                                    label='Entreprise'
                                    title='Choisir une entreprise'
                                    data={dataToArrayForSelect(companies.list)}
                                    requestProcessing={processingRequest(COMPANIES_SCOPE, requests.list)}
                                    handleInput={(isValid, val) => {
                                        shouldResetErrorData();
                                        setCompany({...company, isValid, val})
                                    }}
                            />
                        </div>
                    }
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
                               id='inputReference'
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

export default React.memo(OperatorsAddSim);

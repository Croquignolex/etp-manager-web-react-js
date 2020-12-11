import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import {emitNewSim} from "../../../redux/sims/actions";
import Input from "../../../components/app/form/Input";
import ErrorAlert from "../../../components/ErrorAlert";
import Button from "../../../components/app/form/Button";
import Select from "../../../components/app/form/Select";
import TextArea from "../../../components/app/form/Textarea";
import {storeResetErrorData} from "../../../redux/errors/actions";
import SimsHigherOrder from "../../../components/layout/SimsHigherOrder";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect,
} from "../../../helpers/functions";
import {
    ErrorsContext,
    AgentsContext,
    RequestsContext,
    DispatchContext,
    OperatorsContext,
    SimsTypesContext,
    CompaniesContext,
    CollectorsContext,
} from "../../../helpers/contexts";
import {
    AGENTS_SCOPE,
    SIM_NEW_PAGE,
    SIM_NEW_SCOPE,
    COMPANIES_SCOPE,
    OPERATORS_SCOPE,
    SIMS_TYPES_SCOPE,
    DEFAULT_FORM_DATA, COLLECTORS_SCOPE
} from "../../../helpers/constants";

// Component
function SimsNewPage() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [number, setNumber] = useState(DEFAULT_FORM_DATA);
    const [company, setCompany] = useState(DEFAULT_FORM_DATA);
    const [simsType, setSimsType] = useState(DEFAULT_FORM_DATA);
    const [operator, setOperator] = useState(DEFAULT_FORM_DATA);
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);
    const [collector, setCollector] = useState(DEFAULT_FORM_DATA);
    const [needAgent, setNeedAgent] = useState(false);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);
    const [needCompany, setNeedCompany] = useState(false);
    const [needCollector, setNeedCollector] = useState(false);

    // Context states
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);
    const simsTypes = useContext(SimsTypesContext);
    const companies = useContext(CompaniesContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const scope = SIM_NEW_SCOPE;
    const simsTypesList = simsTypes.list;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
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

    // Trigger sim form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        // Validation
        const _name = requiredChecker(name);
        const _number = phoneChecker(number);
        const _agent = requiredChecker(agent);
        const _company = requiredChecker(company);
        const _simsType = requiredChecker(simsType);
        const _operator = requiredChecker(operator);
        const _collector = requiredChecker(collector);
        // Set value
        setName(_name);
        setAgent(_agent);
        setNumber(_number);
        setCompany(_company);
        setSimsType(_simsType);
        setOperator(_operator);
        setCollector(_collector);
        // Constraint
        let validationOK = (_simsType.isValid && _name.isValid && _number.isValid && _operator.isValid);
        if(needCompany) validationOK = validationOK && _company.isValid;
        else if(needCollector) validationOK = validationOK && _collector.isValid;
        else if(needCompany) validationOK = validationOK && _company.isValid;
        // Check
        if(validationOK) {
            dispatch(emitNewSim({
                name: _name.val,
                number: _number.val,
                simType: _simsType.val,
                operator: _operator.val,
                reference: reference.val,
                description: description.val,
                agent: needAgent ? _agent.val : '',
                company: needCompany ? _company.val : '',
                collector: needCollector ? _collector.val : '',
            }));
        } else playWarningSound();
    };

    // Render
    return (
        <div className="content-wrapper">
            <Header title={SIM_NEW_PAGE} icon={'fa fa-sim-card'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-8 offset-2">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    <div className="tab-content">
                                        {shouldShowError(scope, errors.list) &&
                                            <ErrorAlert scope={scope} />
                                        }
                                        <form onSubmit={handleSubmit}>
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
                                                                setNeedCompany(simsTypeData.needCompany)
                                                                setNeedCollector(simsTypeData.needCollector)
                                                            }}
                                                    />
                                                </div>
                                            </div>
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
                                                {needCollector &&
                                                    <div className='col-sm-6'>
                                                        <Select input={collector}
                                                                id='inputCollector'
                                                                label='Responsable de zone'
                                                                title='Choisir un responsable de zone'
                                                                data={dataToArrayForSelect(collectors.list)}
                                                                requestProcessing={processingRequest(COLLECTORS_SCOPE, requests.list)}
                                                                handleInput={(isValid, val) => {
                                                                    shouldResetErrorData();
                                                                    setCollector({...collector, isValid, val})
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SimsHigherOrder(SimsNewPage);

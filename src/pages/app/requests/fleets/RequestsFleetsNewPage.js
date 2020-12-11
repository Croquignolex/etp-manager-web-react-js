import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../../components/app/Header";
import ErrorAlert from "../../../../components/ErrorAlert";
import Select from "../../../../components/app/form/Select";
import Button from "../../../../components/app/form/Button";
import Amount from "../../../../components/app/form/Amount";
import {requiredChecker} from "../../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../../redux/errors/actions";
import {emitNewFleetByAgent, emitNewFleetByCollector} from "../../../../redux/fleets/actions";
import RequestsFleetsHigherOrder from "../../../../components/layout/RequestsFleetsHigherOrder";
import {
    UserContext,
    AgentsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from "../../../../helpers/contexts";
import {
    AGENT_ROLE,
    AGENTS_SCOPE,
    COLLECTOR_ROLE,
    FLEET_NEW_SCOPE,
    DEFAULT_FORM_DATA,
    REQUESTS_FLEET_NEW_PAGE,
} from "../../../../helpers/constants";
import {
    mappedSims,
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect,
} from "../../../../helpers/functions";

// Component
function RequestsFleetsNewPage() {
    // Local state
    const [sims, setSims] = useState([]);
    const [sim, setSim] = useState(DEFAULT_FORM_DATA);
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);

    // Context states
    const user = useContext(UserContext);
    const agents = useContext(AgentsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = FLEET_NEW_SCOPE;
    const agentProcess = AGENT_ROLE.includes(user.role.name);
    const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        agentProcess && setSims(mappedSims(user.sims));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            setAmount(DEFAULT_FORM_DATA);
        }
        // eslint-disable-next-line
    }, [requests]);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Trigger fleet form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _sim = requiredChecker(sim);
        const _agent = requiredChecker(agent);
        const _amount = requiredChecker(amount);
        // Set value
        setSim(_sim);
        setAmount(_amount);
        collectorProcess && setAgent(_agent);
        const validationOK = collectorProcess
            ? (_amount.isValid && _sim.isValid && _agent.isValid)
            : (_amount.isValid && _sim.isValid);
        // Check
        if(validationOK) {
            agentProcess && dispatch(emitNewFleetByAgent({sim: _sim.val, amount: _amount.val}));
            collectorProcess && dispatch(emitNewFleetByCollector({sim: _sim.val, amount: _amount.val, agent: _agent.val}));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header title={REQUESTS_FLEET_NEW_PAGE} icon={'fa fa-rss'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-lg-8 col-sm-10 offset-lg-2 offset-sm-1">
                                <div className="card custom-card-outline">
                                    <div className="card-body">
                                        <div className="tab-content">
                                            {shouldShowError(scope, errors.list) &&
                                                <ErrorAlert scope={scope} />
                                            }
                                            <form onSubmit={handleSubmit}>
                                                {collectorProcess &&
                                                    <div className='row'>
                                                        <div className='col-sm-6'>
                                                            <Select label='Agent'
                                                                    input={agent}
                                                                    id='inputAgent'
                                                                    title='Choisir un agent'
                                                                    data={dataToArrayForSelect(agents.list)}
                                                                    requestProcessing={processingRequest(AGENTS_SCOPE, requests.list)}
                                                                    handleInput={(isValid, val) => {
                                                                        shouldResetErrorData();
                                                                        setAgent({...agent, isValid, val});
                                                                        const selectedAgent = agents.list.find(agent => agent.id === val);
                                                                        setSims(mappedSims(selectedAgent.sims));
                                                                    }}
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                                <div className='row'>
                                                    <div className='col-sm-6'>
                                                        <Amount
                                                            input={amount}
                                                            id='inputAmount'
                                                            label='Montant'
                                                            handleInput={(isValid, val) => {
                                                                shouldResetErrorData();
                                                                setAmount({...amount, isValid, val})
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <Select label='Puce'
                                                                input={sim}
                                                                id='inputSim'
                                                                title='Choisir une puce'
                                                                requestProcessing={agentProcess ? false : processingRequest(AGENTS_SCOPE, requests.list)}
                                                                data={dataToArrayForSelect(sims)}
                                                                handleInput={(isValid, val) => {
                                                                    shouldResetErrorData();
                                                                    setSim({...sim, isValid, val})
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
        </>
    )
}

export default RequestsFleetsHigherOrder(RequestsFleetsNewPage);

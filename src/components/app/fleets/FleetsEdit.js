import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import {emitAgentsFetch} from "../../../redux/agents/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateFleetByAgent, emitUpdateFleetByCollector} from "../../../redux/fleets/actions";
import {
    AGENT_ROLE,
    FLEET_SCOPE,
    AGENTS_SCOPE,
    COLLECTOR_ROLE,
    FLEET_EDIT_SCOPE,
    DEFAULT_FORM_DATA,
} from "../../../helpers/constants";
import {
    mappedSims,
    shouldShowError,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    UserContext,
    FleetsContext,
    AgentsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    ClearancesContext,
} from "../../../helpers/contexts";
import {
    emitUpdateClearanceByAgent,
    emitUpdateClearanceByCollector
} from "../../../redux/clearances/actions";

// Component
function FleetsEdit({parentScope}) {
    // Local state
    const [sims, setSims] = useState([]);
    const [sim, setSim] = useState(DEFAULT_FORM_DATA);
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);

    // Context states
    const user = useContext(UserContext);
    const agents = useContext(AgentsContext);
    const fleets = useContext(FleetsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);
    const clearances = useContext(ClearancesContext);

    // Data
    const scope = FLEET_EDIT_SCOPE;
    const fleetProcess = parentScope === FLEET_SCOPE;
    const agentProcess = AGENT_ROLE.includes(user.role.name);
    const fleet = fleetProcess ? fleets.current : clearances.current;
    const collectorProcess = COLLECTOR_ROLE.includes(user.role.name);
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        setSim({...DEFAULT_FORM_DATA, val: fleet.sim.id});
        setAgent({...DEFAULT_FORM_DATA, val: fleet.agent.id});
        setAmount({...DEFAULT_FORM_DATA, val: fleet.amount});
        collectorProcess && setSims(extractSelectedAgent(agents.list, fleet.agent.id));
        // eslint-disable-next-line
    }, [fleet, agents]);

    useEffect(() => {
        agentProcess && setSims(mappedSims(user.sims));
        // Chose user for collector create by collector
        collectorProcess && dispatch(emitAgentsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Trigger sim form submit
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
            if(fleetProcess) {
                agentProcess && dispatch(emitUpdateFleetByAgent({
                    id: fleet.id,
                    sim: _sim.val,
                    amount: _amount.val
                }));
                collectorProcess && dispatch(emitUpdateFleetByCollector({
                    id: fleet.id,
                    sim: _sim.val,
                    agent: _agent.val,
                    amount: _amount.val
                }));
            } else {
                agentProcess && dispatch(emitUpdateClearanceByAgent({
                    id: fleet.id,
                    sim: _sim.val,
                    amount: _amount.val
                }));
                collectorProcess && dispatch(emitUpdateClearanceByCollector({
                    id: fleet.id,
                    sim: _sim.val,
                    agent: _agent.val,
                    amount: _amount.val
                }));
            }
        }
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
                                                setSims(extractSelectedAgent(agents.list, val));
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
                                    label='Montant à récouvrir'
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
                                        data={dataToArrayForSelect(sims)}
                                        requestProcessing={agentProcess ? false : processingRequest(AGENTS_SCOPE, requests.list)}
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
                </>
            )}
        </>
    )
}

// Extract selected agent
function extractSelectedAgent(agents, needle) {
    const selectedAgent = agents.find(agent => agent.id === needle);
    return selectedAgent ? mappedSims(selectedAgent.sims) : [];
}

// Prop types to ensure destroyed props data type
FleetsEdit.propTypes = {
    parentScope: PropTypes.string.isRequired
};

export default React.memo(FleetsEdit);
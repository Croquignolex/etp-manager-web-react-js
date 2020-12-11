import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import {emitSimsFetch} from "../../../redux/sims/actions";
import {emitAgentsFetch} from "../../../redux/agents/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitNetworkNewSupply, emitNewSupply} from "../../../redux/supplies/actions";
import {
    COLLECTOR,
    SIMS_SCOPE,
    AGENTS_SCOPE,
    FLEET_SIMS_TYPE,
    SUPPLY_NEW_SCOPE,
    DEFAULT_FORM_DATA
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
    AgentsContext,
    DispatchContext,
    RequestsContext, UserContext,
} from "../../../helpers/contexts";
import PropTypes from "prop-types";

// Component
function OperationsFleetNewSupply({handleClose}) {
    // Local state
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [done, setDone] = useState(false);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [agentSim, setAgentSim] = useState(DEFAULT_FORM_DATA);
    const [agentSims, setAgentSims] = useState([]);
    const [managerSim, setManagerSim] = useState(DEFAULT_FORM_DATA);

    // Context states
    const user = useContext(UserContext);
    const sims = useContext(SimsContext);
    const agents = useContext(AgentsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = SUPPLY_NEW_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitSimsFetch());
        dispatch(emitAgentsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list) && done) {
            handleClose();
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _agent = requiredChecker(agent);
        const _amount = requiredChecker(amount);
        const _agentSim = requiredChecker(agentSim);
        const _managerSim = requiredChecker(managerSim);
        // Set value
        setAgent(_agent);
        setAmount(_amount);
        setAgentSim(_agentSim);
        setManagerSim(_managerSim);
        const validationOK = (
            _amount.isValid && _agent.isValid &&
            _agentSim.isValid && _managerSim.isValid
        );
        // Check
        if(validationOK) {
            if(user.role.name === COLLECTOR) {
                dispatch(emitNetworkNewSupply({
                    agent: _agent.val,
                    amount: _amount.val,
                    agentSim: _agentSim.val,
                    collectorSim: _managerSim.val,
                }));
            } else {
                dispatch(emitNewSupply({
                    agent: _agent.val,
                    amount: _amount.val,
                    agentSim: _agentSim.val,
                    managerSim: _managerSim.val,
                }));
            }
            setDone(true);
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
                                    setAgentSims(mappedSims(selectedAgent.sims));
                                }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Amount
                            input={amount}
                            id='inputAmount'
                            label='Montant à envoyer'
                            handleInput={(isValid, val) => {
                                shouldResetErrorData();
                                setAmount({...amount, isValid, val})
                            }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Select input={managerSim}
                                id='inputSimManager'
                                title='Choisir une puce'
                                label='Puce de flottage'
                                requestProcessing={processingRequest(SIMS_SCOPE, requests.list)}
                                data={
                                    dataToArrayForSelect(mappedSims(
                                        (user.role.name === COLLECTOR)
                                        ? user.sims
                                        : sims.list.filter(item => FLEET_SIMS_TYPE.includes(item.type.name))
                                    ))
                                }
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setManagerSim({...managerSim, isValid, val});
                                }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Select label="Puce de l'agent"
                                input={agentSim}
                                id='inputSimAgent'
                                title='Choisir une puce'
                                requestProcessing={processingRequest(AGENTS_SCOPE, requests.list)}
                                data={dataToArrayForSelect(agentSims)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setAgentSim({...agentSim, isValid, val})
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
OperationsFleetNewSupply.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default React.memo(OperationsFleetNewSupply);

import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import {emitSimsFetch} from "../../../redux/sims/actions";
import {emitAgentsFetch} from "../../../redux/agents/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitNewFleetRecovery} from "../../../redux/recoveries/actions";
import {emitSuppliesFetchByCollector} from "../../../redux/supplies/actions";
import {
    SIMS_SCOPE,
    AGENTS_SCOPE,
    SUPPLIES_SCOPE,
    FLEET_SIMS_TYPE,
    DEFAULT_FORM_DATA,
    FLEETS_RECOVERY_NEW_SCOPE
} from "../../../helpers/constants";
import {
    mappedSims,
    mappedAmounts,
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
    RequestsContext,
    SuppliesContext,
} from "../../../helpers/contexts";
import DisabledInput from "../form/DisabledInput";

// Component
function RecoveriesFleetNew({selectedSupply, handleClose}) {
    // Local state
    const [done, setDone] = useState(false);
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [supply, setSupply] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [agentSims, setAgentSims] = useState([]);
    const [agentSim, setAgentSim] = useState(DEFAULT_FORM_DATA);
    const [managerSim, setManagerSim] = useState(DEFAULT_FORM_DATA);
    const [agentSupplies, setAgentSupplies] = useState([]);

    // Context states
    const sims = useContext(SimsContext);
    const agents = useContext(AgentsContext);
    const errors = useContext(ErrorsContext);
    const supplies = useContext(SuppliesContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = FLEETS_RECOVERY_NEW_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitSimsFetch());
        dispatch(emitAgentsFetch());
        if(selectedSupply.remaining) {
            setSupply({...supply, val: selectedSupply.id});
            setAgent({...agent, val: selectedSupply.agent.id});
            setAmount({...amount, val: selectedSupply.remaining});
        } else {
            dispatch(emitSuppliesFetchByCollector())
        }
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            if(done) {
                setAmount(DEFAULT_FORM_DATA);
                handleClose();
            }
        }
        if(succeededRequest(AGENTS_SCOPE, requests.list) && selectedSupply.remaining) {
            const selectedAgent = agents.list.find(_agent => _agent.id === agent.val);
            setAgentSims(mappedSims(selectedAgent.sims));
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _agent = requiredChecker(agent);
        const _supply = requiredChecker(supply);
        const _amount = requiredChecker(amount);
        const _agentSim = requiredChecker(agentSim);
        const _managerSim = requiredChecker(managerSim);
        // Set value
        setAgent(_agent);
        setSupply(_supply);
        setAmount(_amount);
        setAgentSim(_agentSim);
        setManagerSim(_managerSim);
        const validationOK = (
            _amount.isValid && _agent.isValid &&
            _supply.isValid && _agentSim.isValid &&
            _managerSim.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitNewFleetRecovery({
                supply: _supply.val,
                amount: _amount.val,
                agentSim: _agentSim.val,
                managerSim: _managerSim.val,
            }));
            setDone(true)
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
                        {!selectedSupply.remaining
                            ?  <Select label='Agent'
                                       input={agent}
                                       id='inputAgent'
                                       title='Choisir un agent'
                                       data={dataToArrayForSelect(agents.list)}
                                       requestProcessing={processingRequest(AGENTS_SCOPE, requests.list)}
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setAgent({...agent, isValid, val});
                                           const selectedAgent = agents.list.find(_agent => _agent.id === val);
                                           setAgentSims(mappedSims(selectedAgent.sims));
                                           const selectedSupplies = supplies.list.filter(supply => supply.agent.id === selectedAgent.id);
                                           setAgentSupplies(mappedAmounts(selectedSupplies))
                                       }}
                            />
                            : <DisabledInput label='Agent'
                                             id='inputAgent'
                                             val={selectedSupply.agent.name}
                            />
                        }

                    </div>
                    <div className='col-sm-6'>
                        {!selectedSupply.remaining
                            ? <Select input={supply}
                                      label='Flottage'
                                      id='inputSupply'
                                      title='Choisir un flottage'
                                      data={dataToArrayForSelect(agentSupplies)}
                                      requestProcessing={processingRequest(SUPPLIES_SCOPE, requests.list)}
                                      handleInput={(isValid, val) => {
                                          shouldResetErrorData();
                                          setSupply({...supply, isValid, val});
                                          setAmount({...amount, val: supplies.list.find(supply => supply.id === val).remaining})
                                      }}
                            />
                            :  <DisabledInput label='Flottage'
                                              id='inputSupply'
                                              val={mappedAmounts([selectedSupply])[0].name}
                            />
                        }
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Select input={managerSim}
                                id='inputSimManager'
                                title='Choisir une puce'
                                label='Puce de flottage'
                                requestProcessing={processingRequest(SIMS_SCOPE, requests.list)}
                                data={dataToArrayForSelect(mappedSims(sims.list.filter(item => FLEET_SIMS_TYPE.includes(item.type.name))))}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setManagerSim({...managerSim, isValid, val});
                                }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Select input={agentSim}
                                id='inputSimAgent'
                                label="Puce de l'agent"
                                title='Choisir une puce'
                                data={dataToArrayForSelect(agentSims)}
                                requestProcessing={processingRequest(AGENTS_SCOPE, requests.list)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setAgentSim({...agentSim, isValid, val})
                                }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Amount
                            input={amount}
                            id='inputAmount'
                            label='Montant à retourner'
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
RecoveriesFleetNew.propTypes = {
    selectedSupply: PropTypes.object,
    handleClose: PropTypes.func.isRequired
};

// Default props
RecoveriesFleetNew.defaultProps = {
    selectedSupply: {}
};

export default React.memo(RecoveriesFleetNew);

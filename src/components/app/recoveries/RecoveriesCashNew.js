import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import DisabledInput from "../form/DisabledInput";
import FileDocumentType from "../form/FileDocumentType";
import {emitAgentsFetch} from "../../../redux/agents/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitNewCashRecovery} from "../../../redux/recoveries/actions";
import {emitSuppliesFetchByCollector} from "../../../redux/supplies/actions";
import {requiredChecker, requiredFileChecker} from "../../../helpers/formsChecker";
import {
    AGENTS_SCOPE,
    SUPPLIES_SCOPE,
    DEFAULT_FORM_DATA,
    CASH_RECOVERY_NEW_SCOPE,
    DEFAULT_OBJECT_FORM_DATA
} from "../../../helpers/constants";
import {
    mappedAmounts,
    shouldShowError,
    playWarningSound,
    succeededRequest,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    ErrorsContext,
    AgentsContext,
    DispatchContext,
    RequestsContext,
    SuppliesContext,
} from "../../../helpers/contexts";

// Component
function RecoveriesCashNew({selectedSupply, handleClose}) {
    // Local state
    const [done, setDone] = useState(false);
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [supply, setSupply] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [receipt, setReceipt] = useState(DEFAULT_OBJECT_FORM_DATA);

    // Context states
    const agents = useContext(AgentsContext);
    const errors = useContext(ErrorsContext);
    const supplies = useContext(SuppliesContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = CASH_RECOVERY_NEW_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        if(selectedSupply.remaining) {
            setSupply({...supply, val: selectedSupply.id});
            setAgent({...agent, val: selectedSupply.agent.id});
            setAmount({...amount, val: selectedSupply.remaining});
        } else {
            dispatch(emitAgentsFetch());
            dispatch(emitSuppliesFetchByCollector());
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
        // eslint-disable-next-line
    }, [requests]);

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _agent = requiredChecker(agent);
        const _supply = requiredChecker(supply);
        const _amount = requiredChecker(amount);
        const _receipt = requiredFileChecker(receipt);
        // Set value
        setSupply(_supply);
        setAgent(_agent);
        setAmount(_amount);
        setReceipt(_receipt);
        const validationOK = (
            _amount.isValid && _agent.isValid &&
            _supply.isValid && _receipt.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitNewCashRecovery({
                supply: _supply.val,
                amount: _amount.val,
                receipt: _receipt.val
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
                                    requestProcessing={processingRequest(SUPPLIES_SCOPE, requests.list)}
                                    data={dataToArrayForSelect(mappedAmounts(supplies.list.filter(supply => supply.agent.id === agent.val)))}
                                    handleInput={(isValid, val) => {
                                        shouldResetErrorData();
                                        setSupply({...supply, isValid, val});
                                        setAmount({...amount, val: supplies.list.find(supply => supply.id === val).remaining})
                                    }}
                            />
                            : <DisabledInput label='Flottage'
                                             id='inputSupply'
                                             val={mappedAmounts([selectedSupply])[0].name}
                            />
                        }
                    </div>
                </div>
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
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <FileDocumentType id='file' label='Récus' input={receipt}
                                          handleInput={(isValid, val) => {
                                              shouldResetErrorData();
                                              setReceipt({...receipt, isValid, val});
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
RecoveriesCashNew.propTypes = {
    selectedSupply: PropTypes.object,
    handleClose: PropTypes.func.isRequired
};

// Default props
RecoveriesCashNew.defaultProps = {
    selectedSupply: {}
};

export default React.memo(RecoveriesCashNew);

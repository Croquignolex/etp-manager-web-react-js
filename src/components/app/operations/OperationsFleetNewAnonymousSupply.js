import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Input from "../form/Input";
import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import {emitSimsFetch} from "../../../redux/sims/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitNewAnonymousFleet} from "../../../redux/anonymous/actions";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    MANAGER,
    FLEET_TYPE,
    SIMS_SCOPE,
    MASTER_TYPE,
    DEFAULT_FORM_DATA,
    ANONYMOUS_NEW_SCOPE, COLLECTOR
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
    UserContext,
    SimsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from "../../../helpers/contexts";

// Component
function OperationsFleetNewAnonymousSupply({handleClose}) {
    // Local state
    const [done, setDone] = useState(false);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [receiver, setReceiver] = useState(DEFAULT_FORM_DATA);
    const [outgoingSim, setOutgoingSim] = useState(DEFAULT_FORM_DATA);
    const [receiverSim, setReceiverSim] = useState(DEFAULT_FORM_DATA);

    // Context states
    const user = useContext(UserContext);
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const role = user.role.name;
    const scope = ANONYMOUS_NEW_SCOPE;
    const managerProcess = (role === MANAGER);
    const collectorProcess = (role === COLLECTOR);
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitSimsFetch());
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

    // Extract outgoing sims
    const extractOutgoingSim = () => {
        let returnedSims;

        if(collectorProcess) {
            returnedSims = user.sims;
        } else if(managerProcess) {
            returnedSims = sims.list.filter(item => FLEET_TYPE === item.type.name);
        } else {
            returnedSims = sims.list.filter(item => MASTER_TYPE === item.type.name);
        }

        return dataToArrayForSelect(mappedSims(returnedSims));
    }

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        const _receiver = requiredChecker(receiver);
        const _receiverSim = phoneChecker(receiverSim);
        const _outgoingSim = requiredChecker(outgoingSim);
        // Set value
        setAmount(_amount);
        setReceiver(_receiver);
        setReceiverSim(_receiverSim);
        setOutgoingSim(_outgoingSim);
        const validationOK = (_amount.isValid && _receiver.isValid && _outgoingSim.isValid && _receiverSim.isValid);
        // Check
        if(validationOK) {
            dispatch(emitNewAnonymousFleet({
                amount: _amount.val,
                sim: _outgoingSim.val,
                receiver: _receiver.val,
                receiverSim: _receiverSim.val,
            }))
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
                        <Select input={outgoingSim}
                                label='Puce émettrice'
                                id='inputSimSupervisor'
                                title='Choisir une puce'
                                data={extractOutgoingSim()}
                                requestProcessing={processingRequest(SIMS_SCOPE, requests.list)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setOutgoingSim({...outgoingSim, isValid, val});
                                }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Amount
                            input={amount}
                            id='inputAmount'
                            label='Montant à tranferer'
                            handleInput={(isValid, val) => {
                                shouldResetErrorData();
                                setAmount({...amount, isValid, val})
                            }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Input type='text'
                               input={receiver}
                               id='inputAnonymousName'
                               label="Nom de l'agent anonyme"
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setReceiver({...receiver, isValid, val})
                               }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Input type='text'
                               input={receiverSim}
                               id='inputAnonymousSim'
                               label="Puce de l'agent anonyme"
                               handleInput={(isValid, val) => {
                                   shouldResetErrorData();
                                   setReceiverSim({...receiverSim, isValid, val})
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
OperationsFleetNewAnonymousSupply.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default React.memo(OperationsFleetNewAnonymousSupply);

import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import {emitSimsFetch} from "../../../redux/sims/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {
    emitNewTransferManager,
    emitNewTransferCollector,
    emitNewTransferBySupervisorForManager,
    emitNewTransferBySupervisorForCollector
} from "../../../redux/transfers/actions";
import {
    MANAGER,
    COLLECTOR,
    ADMIN_ROLE,
    FLEET_TYPE,
    SIMS_SCOPE,
    MASTER_TYPE,
    COLLECTOR_TYPE,
    FLEET_SIMS_TYPE,
    DEFAULT_FORM_DATA,
    TRANSFER_NEW_SCOPE,
    FLEET_COLLECTOR_TYPE
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
function OperationsFleetNewTransfer({handleClose}) {
    // Local state
    const [done, setDone] = useState(false);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [outgoingSim, setOutgoingSim] = useState(DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);

    // Context states
    const user = useContext(UserContext);
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const role = user.role.name;
    const scope = TRANSFER_NEW_SCOPE;
    const managerProcess = (role === MANAGER);
    const collectorProcess = (role === COLLECTOR);
    const adminProcess = ADMIN_ROLE.includes(role);
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

    // Extract incoming sims
    const extractIncomingSim = () => {
        let returnedSims;

        if(collectorProcess) {
            returnedSims = sims.list.filter(item => FLEET_SIMS_TYPE.includes(item.type.name));
        } else if(managerProcess) {
            returnedSims = sims.list.filter(item => COLLECTOR_TYPE === item.type.name);
        } else {
            returnedSims = sims.list.filter(item => FLEET_COLLECTOR_TYPE.includes(item.type.name));
        }

        return dataToArrayForSelect(mappedSims(returnedSims));
    }

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        const _incomingSim = requiredChecker(incomingSim);
        const _outgoingSim = requiredChecker(outgoingSim);
        // Set value
        setAmount(_amount);
        setIncomingSim(_incomingSim);
        setOutgoingSim(_outgoingSim);
        const validationOK = (_amount.isValid && _incomingSim.isValid && _outgoingSim.isValid);
        // Check
        if(validationOK) {
            // For supervisor and admin
            if(adminProcess) {
                const selectedSim = sims.list.find(item => item.id === _incomingSim.val)
                if(selectedSim.type.name === COLLECTOR_TYPE){
                    dispatch(emitNewTransferBySupervisorForCollector({
                        amount: _amount.val,
                        collectorSim: _incomingSim.val,
                        supervisorSim: _outgoingSim.val,
                    }))
                } else if(selectedSim.type.name === FLEET_TYPE) {
                    dispatch(emitNewTransferBySupervisorForManager({
                        amount: _amount.val,
                        managerSim: _incomingSim.val,
                        supervisorSim: _outgoingSim.val,
                    }))
                }
            }
            // For manager
            managerProcess && dispatch(emitNewTransferManager({
                amount: _amount.val,
                managerSim: _outgoingSim.val,
                collectorSim: _incomingSim.val,
            }));
            // For collector
            collectorProcess && dispatch(emitNewTransferCollector({
                amount: _amount.val,
                collectorSim: _outgoingSim.val,
                managerOrSupervisorSim: _incomingSim.val,
            }));
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
                        <Select input={incomingSim}
                                id='inputSimManager'
                                label='Puce receptrice'
                                title='Choisir une puce'
                                data={extractIncomingSim()}
                                requestProcessing={processingRequest(SIMS_SCOPE, requests.list)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setIncomingSim({...incomingSim, isValid, val});
                                }}
                        />
                    </div>
                </div>
                <div className='row'>
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
                <div className="form-group row">
                    <Button processing={processingRequest(scope, requests.list)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsFleetNewTransfer.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default React.memo(OperationsFleetNewTransfer);

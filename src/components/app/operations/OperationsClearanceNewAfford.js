import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import FileDocumentType from "../form/FileDocumentType";
import {emitSimsFetch} from "../../../redux/sims/actions";
import {emitNewAfford} from "../../../redux/refuels/actions";
import {emitAgentsFetch} from "../../../redux/agents/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {requiredChecker, requiredFileChecker} from "../../../helpers/formsChecker";
import {
    VENDORS,
    SIMS_SCOPE,
    MASTER_TYPE,
    AFFORD_NEW_SCOPE,
    DEFAULT_FORM_DATA,
    DEFAULT_OBJECT_FORM_DATA
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
    DispatchContext,
    RequestsContext,
} from "../../../helpers/contexts";

// Component
function OperationsClearanceNewAfford({handleClose}) {
    // Local state
    const [done, setDone] = useState(false);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [vendor, setVendor] = useState(DEFAULT_FORM_DATA);
    const [managerSim, setManagerSim] = useState(DEFAULT_FORM_DATA);
    const [receipt, setReceipt] = useState(DEFAULT_OBJECT_FORM_DATA);

    // Context states
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = AFFORD_NEW_SCOPE;
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
        const _vendor = requiredChecker(vendor);
        const _amount = requiredChecker(amount);
        const _receipt = requiredFileChecker(receipt);
        const _managerSim = requiredChecker(managerSim);
        // Set value
        setVendor(vendor);
        setAmount(_amount);
        setReceipt(_receipt);
        setManagerSim(_managerSim);
        const validationOK = (
            _amount.isValid && _vendor.isValid &&
            _managerSim.isValid && _receipt.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitNewAfford({
                amount: _amount.val,
                sim: _managerSim.val,
                receipt: _receipt.val,
                vendor: _vendor.val,
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
                        <Amount
                            input={amount}
                            id='inputAmount'
                            label='Montant à approvisionner'
                            handleInput={(isValid, val) => {
                                shouldResetErrorData();
                                setAmount({...amount, isValid, val})
                            }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Select input={vendor}
                                id='inputVendor'
                                label='Fournisseur'
                                requestProcessing={false}
                                title='Choisir un fournisseur'
                                data={dataToArrayForSelect(VENDORS)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setVendor({...vendor, isValid, val});
                                }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Select input={managerSim}
                                id='inputSimManager'
                                title='Choisir une puce'
                                label='Puce Master'
                                requestProcessing={processingRequest(SIMS_SCOPE, requests.list)}
                                data={dataToArrayForSelect(mappedSims(sims.list.filter(item => MASTER_TYPE === item.type.name)))}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setManagerSim({...managerSim, isValid, val});
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
OperationsClearanceNewAfford.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default React.memo(OperationsClearanceNewAfford);

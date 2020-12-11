import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Button from "../form/Button";
import Select from "../form/Select";
import Amount from "../form/Amount";
import ErrorAlert from "../../ErrorAlert";
import FileDocumentType from "../form/FileDocumentType";
import {emitNewOutlay} from "../../../redux/outlays/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitCollectorsFetch} from "../../../redux/collectors/actions";
import {fileChecker, requiredChecker} from "../../../helpers/formsChecker";
import {DEFAULT_FORM_DATA, COLLECTORS_SCOPE, OUTLAY_NEW_SCOPE} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    succeededRequest,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    CollectorsContext,
} from "../../../helpers/contexts";

// Component
function CheckoutNewOutlay({handleClose}) {
    // Local state
    const [doc, setDoc] = useState(DEFAULT_FORM_DATA);
    const [done, setDone] = useState(false);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [collector, setCollector] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);
    const collectors =  useContext(CollectorsContext);

    // Data
    const scope = OUTLAY_NEW_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitCollectorsFetch());
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
        const _document = fileChecker(doc);
        const _amount = requiredChecker(amount);
        const _collector = requiredChecker(collector);
        // Set value
        setDoc(_document);
        setAmount(_amount);
        setCollector(_collector);
        const validationOK = (_amount.isValid && _collector.isValid && _document.isValid);
        // Check
        if(validationOK) {
            dispatch(emitNewOutlay({
                amount: _amount.val,
                receipt: _document.val,
                collector: _collector.val,
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
                        <Select input={collector}
                                id='inputSimManager'
                                label='Responsable de zone'
                                title='Choisir un responsable'
                                data={dataToArrayForSelect(collectors.list)}
                                requestProcessing={processingRequest(COLLECTORS_SCOPE, requests.list)}
                                handleInput={(isValid, val) => {
                                    shouldResetErrorData();
                                    setCollector({...collector, isValid, val});
                                }}
                        />
                    </div>
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
                </div>
                <div className='row'>
                    <div className='col'>
                        <FileDocumentType id='file' label='Document' input={doc}
                                          handleInput={(isValid, val) => {
                                              shouldResetErrorData();
                                              setDoc({...doc, isValid, val});
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
CheckoutNewOutlay.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default React.memo(CheckoutNewOutlay);

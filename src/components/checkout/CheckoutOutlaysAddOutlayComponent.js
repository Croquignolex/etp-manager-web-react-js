import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAddOutlay} from "../../redux/outlays/actions";
import FileDocumentComponent from "../form/FileDocumentComponent";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {dataToArrayForSelect} from "../../functions/arrayFunctions";
import {storeAddOutlayRequestReset} from "../../redux/requests/outlays/actions";
import {requiredChecker, requiredFileChecker} from "../../functions/checkerFunctions";
import {storeAllCollectorsRequestReset} from "../../redux/requests/collectors/actions";
import {
    applySuccess,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";

// Component
function CheckoutOutlaysAddOutlayComponent({request, collectors, allCollectorsRequests, dispatch, handleClose}) {
    // Local state
    const [doc, setDoc] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [collector, setCollector] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);

    const handleCollectorSelect = (data) => {
        shouldResetErrorData();
        setCollector({...collector,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleFileInput = (data) => {
        shouldResetErrorData();
        setDoc({...doc, isValid: true, data})
    }

    // Build select options
    const collectorSelectOptions = useMemo(() => {
        return dataToArrayForSelect(collectors)
    }, [collectors]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddOutlayRequestReset());
        dispatch(storeAllCollectorsRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _doc = requiredFileChecker(doc);
        const _amount = requiredChecker(amount);
        const _collector = requiredChecker(collector);
        // Set value
        setDoc(_doc);
        setAmount(_amount);
        setCollector(_collector);
        const validationOK = (_amount.isValid && _collector.isValid && _doc.isValid);
        // Check
        if(validationOK) {
            dispatch(emitAddOutlay({
                receipt: _doc.data,
                amount: _amount.data,
                collector: _collector.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allCollectorsRequests) && <ErrorAlertComponent message={allCollectorsRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={collector}
                                         id='inputSimManager'
                                         label='Responsable de zone'
                                         title='Choisir un responsable'
                                         options={collectorSelectOptions}
                                         handleInput={handleCollectorSelect}
                                         requestProcessing={requestLoading(allCollectorsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputAmount'
                                         label='Montant à décaisser'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <FileDocumentComponent id='file'
                                               input={doc}
                                               label='Réçus'
                                               handleInput={handleFileInput}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
CheckoutOutlaysAddOutlayComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    collectors: PropTypes.array.isRequired,
    allCollectorsRequests: PropTypes.object.isRequired,
};

export default React.memo(CheckoutOutlaysAddOutlayComponent);

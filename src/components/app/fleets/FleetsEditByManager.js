import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Input from "../../app/form/Input";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateFleetByManager} from "../../../redux/fleets/actions";
import {DEFAULT_FORM_DATA, FLEET_EDIT_SCOPE} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    processingRequest,
} from "../../../helpers/functions";
import {
    ErrorsContext,
    FleetsContext,
    DispatchContext,
    RequestsContext
} from "../../../helpers/contexts";

// Component
function FleetsEditByManager({parentScope}) {
    // Local state
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const fleets = useContext(FleetsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const fleet = fleets.current;
    const scope = FLEET_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        setReference({...DEFAULT_FORM_DATA, val: fleet.reference});
        // eslint-disable-next-line
    }, [fleet]);

    useEffect(() => {
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
        const _reference = requiredChecker(reference);
        // Set value
        setReference(_reference);
        const validationOK =  _reference.isValid;
        // Check
        if(validationOK)
            dispatch(emitUpdateFleetByManager({
                id: fleet.id,
                reference: _reference.val,
            }));
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
                        <div className='row'>
                            <div className='col-sm-6'>
                                <Input type='text'
                                       label='Référence'
                                       input={reference}
                                       id='inputReference'
                                       handleInput={(isValid, val) => {
                                           shouldResetErrorData();
                                           setReference({...reference, isValid, val})
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

// Prop types to ensure destroyed props data type
FleetsEditByManager.propTypes = {
    parentScope: PropTypes.string.isRequired
};

export default React.memo(FleetsEditByManager);

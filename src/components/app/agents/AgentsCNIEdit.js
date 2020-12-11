import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import FileImageType from "../form/FileImageType";
import {processingRequest} from "../../../helpers/functions";
import {emitUpdateAgentCNI} from "../../../redux/agents/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {requiredImageChecker} from "../../../helpers/formsChecker";
import {playWarningSound, shouldShowError} from "../../../helpers/functions";
import {
    AGENT_SCOPE,
    DEFAULT_FORM_DATA,
    AGENT_CNI_EDIT_SCOPE,
} from "../../../helpers/constants";
import {
    AgentsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from "../../../helpers/contexts";

// Component
function AgentsCNIEdit() {
    // Local state
    const [backIDCard, setBackIDCard] = useState(DEFAULT_FORM_DATA);
    const [frontIDCard, setFrontIDCard] = useState(DEFAULT_FORM_DATA);

    // Context states
    const agents = useContext(AgentsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const parentScope = AGENT_SCOPE;
    const userData = agents.current;
    const scope = AGENT_CNI_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Trigger user information form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _backIDCard = requiredImageChecker(backIDCard);
        const _frontIDCard = requiredImageChecker(frontIDCard);
        // Set value
        setBackIDCard(_backIDCard);
        setFrontIDCard(_frontIDCard);
        const validationOK = _backIDCard.isValid && _frontIDCard.isValid;
        // Check
        if(validationOK)
            dispatch(emitUpdateAgentCNI({
                id: userData.id,
                backIDCard: _backIDCard.val,
                frontIDCard: _frontIDCard.val,
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
                            <FileImageType id='inputFrontIDCard' label='Image avant CNI' input={frontIDCard}
                                  handleInput={(isValid, val) => {
                                      shouldResetErrorData();
                                      setFrontIDCard({...frontIDCard, val});
                                  }}
                            />
                        </div>
                        <div className='row'>
                            <FileImageType id='inputBackIDCard' label='Image arrière CNI' input={backIDCard}
                                  handleInput={(isValid, val) => {
                                      shouldResetErrorData();
                                      setBackIDCard({...backIDCard, isValid, val});
                                  }}
                            />
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

export default React.memo(AgentsCNIEdit);
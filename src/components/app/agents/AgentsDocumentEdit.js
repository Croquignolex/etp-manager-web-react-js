import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import FileDocumentType from "../form/FileDocumentType";
import {processingRequest} from "../../../helpers/functions";
import {requiredFileChecker} from "../../../helpers/formsChecker";
import {emitUpdateAgentFile} from "../../../redux/agents/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateCompanyFile} from "../../../redux/companies/actions";
import {playWarningSound, shouldShowError} from "../../../helpers/functions";
import {
    AGENT_SCOPE,
    COMPANY_SCOPE,
    DEFAULT_FORM_DATA,
    AGENT_FILE_EDIT_SCOPE,
} from "../../../helpers/constants";
import {
    AgentsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    CompaniesContext,
} from "../../../helpers/contexts";

// Component
function AgentsDocumentEdit({parentScope}) {
    // Local state
    const [document, setDocument] = useState(DEFAULT_FORM_DATA);

    // Context states
    const agents = useContext(AgentsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const companies = useContext(CompaniesContext);

    // Data
    const scope = AGENT_FILE_EDIT_SCOPE;
    const id = (parentScope === AGENT_SCOPE) ? agents.current.id : companies.current.id;
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
        const _document = requiredFileChecker(document);
        // Set value
        setDocument(_document);
        const validationOK = _document.isValid;
        // Check
        if(validationOK) {
            const data = {id, document: document.val};
            (parentScope === AGENT_SCOPE) && dispatch(emitUpdateAgentFile(data));
            (parentScope === COMPANY_SCOPE) && dispatch(emitUpdateCompanyFile(data));
        }

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
                                <FileDocumentType id='file' label='Document' input={document}
                                                  handleInput={(isValid, val) => {
                                                      shouldResetErrorData();
                                                      setDocument({...document, isValid, val});
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
AgentsDocumentEdit.propTypes = {
    parentScope: PropTypes.string.isRequired
};

export default React.memo(AgentsDocumentEdit);

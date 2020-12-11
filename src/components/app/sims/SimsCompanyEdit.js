import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Select from "../form/Select";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateCompanyAgent} from "../../../redux/sims/actions";
import {emitCompaniesFetch} from "../../../redux/companies/actions";
import {
    SIM_SCOPE,
    COMPANIES_SCOPE,
    DEFAULT_FORM_DATA,
    SIM_COMPANY_EDIT_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    SimsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    CompaniesContext,
} from "../../../helpers/contexts";

// Component
function SimsCompanyEdit() {
    // Local state
    const [company, setCompany] = useState(DEFAULT_FORM_DATA);

    // Context states
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const companies = useContext(CompaniesContext);

    // Data
    const sim = sims.current;
    const parentScope = SIM_SCOPE;
    const scope = SIM_COMPANY_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        setCompany({...DEFAULT_FORM_DATA, val: sim.company.id});
        // eslint-disable-next-line
    }, [sim]);

    useEffect(() => {
        dispatch(emitCompaniesFetch());
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
        const _company = requiredChecker(company);
        // Set value
        setCompany(_company);
        const validationOK = _company.isValid;
        // Check
        if(validationOK)
            dispatch(emitUpdateCompanyAgent({
                id: sim.id,
                company: _company.val
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
                                <Select input={company}
                                        id='inputCompany'
                                        label='Entreprise'
                                        title='Choisir une entreprise'
                                        data={dataToArrayForSelect(companies.list)}
                                        requestProcessing={processingRequest(COMPANIES_SCOPE, requests.list)}
                                        handleInput={(isValid, val) => {
                                            shouldResetErrorData();
                                            setCompany({...company, isValid, val})
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

export default React.memo(SimsCompanyEdit);

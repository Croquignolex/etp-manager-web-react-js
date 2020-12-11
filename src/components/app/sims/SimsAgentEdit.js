import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../Loader";
import Select from "../form/Select";
import ErrorAlert from "../../ErrorAlert";
import Button from "../../app/form/Button";
import {requiredChecker} from "../../../helpers/formsChecker";
import {emitAgentsFetch} from "../../../redux/agents/actions";
import {emitUpdateSimAgent} from "../../../redux/sims/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {
    SIM_SCOPE,
    AGENTS_SCOPE,
    DEFAULT_FORM_DATA,
    SIM_AGENT_EDIT_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    SimsContext,
    AgentsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from "../../../helpers/contexts";

// Component
function SimsAgentEdit() {
    // Local state
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);

    // Context states
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const sim = sims.current;
    const parentScope = SIM_SCOPE;
    const scope = SIM_AGENT_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        setAgent({...DEFAULT_FORM_DATA, val: sim.agent.id});
        // eslint-disable-next-line
    }, [sim]);

    useEffect(() => {
        dispatch(emitAgentsFetch());
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
        const _agent = requiredChecker(agent);
        // Set value
        setAgent(_agent);
        const validationOK = _agent.isValid;
        // Check
        if(validationOK)
            dispatch(emitUpdateSimAgent({
                id: sim.id,
                agent: _agent.val
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
                                <Select label='Agent'
                                        input={agent}
                                        id='inputAgent'
                                        title='Choisir un agent'
                                        data={dataToArrayForSelect(agents.list)}
                                        requestProcessing={processingRequest(AGENTS_SCOPE, requests.list)}
                                        handleInput={(isValid, val) => {
                                            shouldResetErrorData();
                                            setAgent({...agent, isValid, val})
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

export default React.memo(SimsAgentEdit);

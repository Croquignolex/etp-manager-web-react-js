import PropTypes from 'prop-types';
import React, {useState, useEffect, useContext} from 'react';

import Loader from "../../Loader";
import Button from "../form/Button";
import ErrorAlert from "../../ErrorAlert";
import Select from "../../app/form/Select";
import {emitZonesFetch} from "../../../redux/zones/actions";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitUpdateAgentZone} from "../../../redux/agents/actions";
import {emitUpdateCollectorZone} from "../../../redux/collectors/actions";
import {
    shouldShowError,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    ZONES_SCOPE,
    COLLECTOR_SCOPE,
    DEFAULT_FORM_DATA,
    USER_ZONE_EDIT_SCOPE
} from "../../../helpers/constants";
import {
    ZonesContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    CollectorsContext
} from "../../../helpers/contexts";

// Component
function UsersZoneEdit({parentScope}) {
    // Local state
    const [zone, setZone] = useState(DEFAULT_FORM_DATA);

    // Context states
    const zones = useContext(ZonesContext);
    const agents = useContext(AgentsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const user = (parentScope === COLLECTOR_SCOPE) ? collectors.current : agents.current;
    const scope = USER_ZONE_EDIT_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        dispatch(emitZonesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setZone({...DEFAULT_FORM_DATA, val: user.zone.id});
        // eslint-disable-next-line
    }, [user]);

    // Trigger operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _zone = requiredChecker(zone);
        // Set value
        setZone(_zone);
        const validationOK = _zone.isValid;
        // Check
        if(validationOK) {
            const data = {id: user.id, zone: _zone.val};
            (parentScope === COLLECTOR_SCOPE)
                ? dispatch(emitUpdateCollectorZone(data))
                : dispatch(emitUpdateAgentZone(data))
        } else playWarningSound();
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
                                <Select label='Zone'
                                        input={zone}
                                        id='inputZone'
                                        title='Choisir une zone'
                                        data={dataToArrayForSelect(zones.list)}
                                        requestProcessing={processingRequest(ZONES_SCOPE, requests.list)}
                                        handleInput={(isValid, val) => {
                                            shouldResetErrorData();
                                            setZone({...zone, isValid, val})
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
UsersZoneEdit.propTypes = {
    parentScope: PropTypes.string.isRequired,
};

// Connect component to Redux
export default React.memo(UsersZoneEdit);
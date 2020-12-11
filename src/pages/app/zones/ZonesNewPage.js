import { useHistory } from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import Input from "../../../components/app/form/Input";
import ErrorAlert from "../../../components/ErrorAlert";
import {emitNewZone} from "../../../redux/zones/actions";
import Button from "../../../components/app/form/Button";
import TextArea from "../../../components/app/form/Textarea";
import {requiredChecker} from "../../../helpers/formsChecker";
import {storeResetErrorData} from "../../../redux/errors/actions";
import ZonesHigherOrder from "../../../components/layout/ZonesHigherOrder";
import {
    ZonesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
} from "../../../helpers/contexts";
import {
    ZONE_NEW_PAGE,
    ZONE_NEW_SCOPE,
    DEFAULT_FORM_DATA,
    ZONE_EDIT_PAGE_PATH
} from "../../../helpers/constants";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
    extractGoogleMapUrl
} from "../../../helpers/functions";

// Component
function ZonesNewPage() {
    // Local state
    const [map, setMap] = useState(DEFAULT_FORM_DATA);
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const zones = useContext(ZonesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    // Data
    const scope = ZONE_NEW_SCOPE;
    const history = useHistory();

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            /*setMap(DEFAULT_FORM_DATA);
            setName(DEFAULT_FORM_DATA);
            setReference(DEFAULT_FORM_DATA);
            setDescription(DEFAULT_FORM_DATA);*/
            history.push(`${ZONE_EDIT_PAGE_PATH}/${zones.current.id}`)
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        // Set value
        setName(_name);
        const validationOK = _name.isValid;
        // Check
        if(validationOK) {
            dispatch(emitNewZone({
                map: map.val,
                name: _name.val,
                reference: reference.val,
                description: description.val
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <div className="content-wrapper">
            <Header title={ZONE_NEW_PAGE} icon={'fa fa-map'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-8 offset-2">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    <div className="tab-content">
                                        {shouldShowError(scope, errors.list) &&
                                            <ErrorAlert scope={scope} />
                                        }
                                        <form onSubmit={handleSubmit}>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <Input label='Nom'
                                                           type='text'
                                                           input={name}
                                                           id='inputName'
                                                           handleInput={(isValid, val) => {
                                                               shouldResetErrorData();
                                                               setName({...name, isValid, val})
                                                           }}
                                                    />
                                                </div>
                                                <div className='col-sm-6'>
                                                    <Input type='text'
                                                           input={reference}
                                                           id='inputReference'
                                                           label='Référence'
                                                           handleInput={(isValid, val) => {
                                                               shouldResetErrorData();
                                                               setReference({...reference, isValid, val})
                                                           }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <TextArea input={map}
                                                              id='inputMap'
                                                              label='Url de la map google'
                                                              handleInput={(isValid, val) => {
                                                                  shouldResetErrorData();
                                                                  setMap({...map, isValid, val})
                                                              }}
                                                    />
                                                </div>
                                                <div className='col-sm-6'>
                                                    <TextArea label='Description'
                                                              input={description}
                                                              id='inputDescription'
                                                              handleInput={(isValid, val) => {
                                                                  shouldResetErrorData();
                                                                  setDescription({...description, isValid, val})
                                                              }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Button processing={processingRequest(scope, requests.list)} />
                                            </div>
                                        </form>
                                        {map.val &&
                                        <div className="col-6 offset-3">
                                            <div className="card">
                                                <iframe src={extractGoogleMapUrl(map.val)}
                                                        className='widget-user-header'
                                                        style={{border:0}}
                                                        allowFullScreen={true}
                                                        title="googleMap"
                                                />
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ZonesHigherOrder(ZonesNewPage);
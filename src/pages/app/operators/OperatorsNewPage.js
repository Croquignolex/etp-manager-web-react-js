import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import Input from "../../../components/app/form/Input";
import ErrorAlert from "../../../components/ErrorAlert";
import Button from "../../../components/app/form/Button";
import TextArea from "../../../components/app/form/Textarea";
import {requiredChecker} from "../../../helpers/formsChecker";
import {emitNewOperator} from "../../../redux/operators/actions";
import {storeResetErrorData} from "../../../redux/errors/actions";
import OperatorsHigherOrder from "../../../components/layout/OperatorsHigherOrder";
import {DispatchContext, ErrorsContext, RequestsContext} from "../../../helpers/contexts";
import {
    DEFAULT_FORM_DATA,
    OPERATOR_NEW_PAGE,
    OPERATOR_NEW_SCOPE
} from "../../../helpers/constants";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest
} from "../../../helpers/functions";

// Component
function OperatorsNewPage() {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = OPERATOR_NEW_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useLayoutEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            setName(DEFAULT_FORM_DATA);
            setDescription(DEFAULT_FORM_DATA);
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger new operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        // Set value
        setName(_name);
        const validationOK = _name.isValid;
        // Check
        if(validationOK) {
            dispatch(emitNewOperator({
                name: _name.val,
                description: description.val
            }))
        } else playWarningSound();
    };

    // Render
    return (
        <div className="content-wrapper">
            <Header title={OPERATOR_NEW_PAGE} icon={'fa fa-globe'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-8 col-sm-10 offset-lg-2 offset-sm-1">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    <div className="tab-content">
                                        {shouldShowError(scope, errors.list) &&
                                        <ErrorAlert scope={scope} />
                                        }
                                        {/* Operator creation form */}
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

export default OperatorsHigherOrder(OperatorsNewPage);
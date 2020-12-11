import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import Input from "../../../components/app/form/Input";
import ErrorAlert from "../../../components/ErrorAlert";
import {emitNewUser} from "../../../redux/users/actions";
import Button from "../../../components/app/form/Button";
import Select from "../../../components/app/form/Select";
import TextArea from "../../../components/app/form/Textarea";
import {storeResetErrorData} from "../../../redux/errors/actions";
import UsersHigherOrder from "../../../components/layout/UsersHigherOrder";
import {phoneChecker, requiredChecker} from "../../../helpers/formsChecker";
import {
    ROLES_SCOPE,
    USER_NEW_PAGE,
    USER_NEW_SCOPE,
    DEFAULT_PASSWORD,
    DEFAULT_FORM_DATA
} from "../../../helpers/constants";
import {
    shouldShowError,
    succeededRequest,
    playWarningSound,
    processingRequest,
    dataToArrayForSelect
} from "../../../helpers/functions";
import {
    RolesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";

// Component
function UsersNewPage() {
    // Local state
    const [role, setRole] = useState(DEFAULT_FORM_DATA);
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [post, setPost] = useState(DEFAULT_FORM_DATA);
    const [phone, setPhone] = useState(DEFAULT_FORM_DATA);
    const [email, setEmail] = useState(DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const roles = useContext(RolesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = USER_NEW_SCOPE;
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

    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(succeededRequest(scope, requests.list)) {
            setPost(DEFAULT_FORM_DATA);
            setName(DEFAULT_FORM_DATA);
            setPhone(DEFAULT_FORM_DATA);
            setEmail(DEFAULT_FORM_DATA);
            setAddress(DEFAULT_FORM_DATA);
            setDescription(DEFAULT_FORM_DATA);
        }
        // eslint-disable-next-line
    }, [requests]);

    // Trigger new operator form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _phone = phoneChecker(phone);
        const _name = requiredChecker(name);
        const _role = requiredChecker(role);
        // Set value
        setName(_name);
        setRole(_role);
        setPhone(_phone);
        const validationOK = (
            _name.isValid && _phone.isValid && _role.isValid
        );
        // Check
        if(validationOK)
            dispatch(emitNewUser({
                post: post.val,
                name: _name.val,
                role: _role.val,
                email: email.val,
                phone: _phone.val,
                address: address.val,
                password: DEFAULT_PASSWORD,
                description: description.val,
            }));
        else playWarningSound();
    };

    // Render
    return (
        <div className="content-wrapper">
            <Header title={USER_NEW_PAGE} icon={'fa fa-user-plus'} />
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
                                                    <Input type='number'
                                                           input={phone}
                                                           id='inputPhone'
                                                           label='Téléphone'
                                                           handleInput={(isValid, val) => {
                                                               shouldResetErrorData();
                                                               setPhone({...phone, isValid, val})
                                                           }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <Input type='text'
                                                           label='Email'
                                                           input={email}
                                                           id='inputEmail'
                                                           handleInput={(isValid, val) => {
                                                               shouldResetErrorData();
                                                               setEmail({...email, isValid, val})
                                                           }}
                                                    />
                                                </div>
                                                <div className='col-sm-6'>
                                                    <Input type='text'
                                                           input={post}
                                                           label='Poste'
                                                           id='inputPost'
                                                           handleInput={(isValid, val) => {
                                                               shouldResetErrorData();
                                                               setPost({...post, isValid, val})
                                                           }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <Select label='Rôle'
                                                            input={role}
                                                            id='inputRole'
                                                            title='Choisir un rôle'
                                                            data={dataToArrayForSelect(roles.list)}
                                                            requestProcessing={processingRequest(ROLES_SCOPE, requests.list)}
                                                            handleInput={(isValid, val) => {
                                                                shouldResetErrorData();
                                                                setRole({...role, isValid, val})
                                                            }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <TextArea label='Adresse'
                                                              input={address}
                                                              id='inputAddress'
                                                              handleInput={(isValid, val) => {
                                                                  shouldResetErrorData();
                                                                  setAddress({...address, isValid, val})
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

export default UsersHigherOrder(UsersNewPage);

import PropTypes from "prop-types";
import React, {useState, useEffect} from 'react';
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";

// Component
function ProfileEditComponent({error, request, dispatch}) {
// Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [post, setPost] = useState(DEFAULT_FORM_DATA);
    const [email, setEmail] = useState(DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const {name, post, address, description, email} = userData;
        setName({...DEFAULT_FORM_DATA, val: name});
        setPost({...DEFAULT_FORM_DATA, val: post});
        setEmail({...DEFAULT_FORM_DATA, val: email});
        setAddress({...DEFAULT_FORM_DATA, val: address});
        setDescription({...DEFAULT_FORM_DATA, val: description});
        // eslint-disable-next-line
    }, [userData]);

    // Trigger user information form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        // Set value
        setName(_name);
        const validationOK = _name.isValid;
        // Check
        if(validationOK) {
            const data = {
                post: post.val,
                name: _name.val,
                email: email.val,
                address: address.val,
                description: description.val
            };
            (parentScope === USER_SCOPE) && dispatch(emitUpdateUser({
                ...data,
                id: userData.id
            }));
            (parentScope === PROFILE_SCOPE) && dispatch(emitUserInformationUpdate(data));
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
                                <Input label='Poste'
                                       type='text'
                                       input={post}
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
                </>
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
ProfileEditComponent.propTypes = {
    error: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
};

export default React.memo(ProfileEditComponent);

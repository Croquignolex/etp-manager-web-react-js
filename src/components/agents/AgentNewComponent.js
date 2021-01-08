import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import {emitNewAgent} from "../../redux/agents/actions";
import * as constants from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAllZonesRequestReset} from "../../redux/requests/zones/actions";
import {storeAddAgentRequestReset} from "../../redux/requests/agents/actions";
import {applySuccess, requestLoading, requestSucceeded} from "../../functions/generalFunctions";
import {fileChecker, imageChecker, phoneChecker, requiredChecker} from "../../functions/checkerFunctions";

// Component
function AgentCardComponent({type, zones, request, dispatch, handleClose}) {
    // Local state
    const [doc, setDoc] = useState(constants.DEFAULT_FORM_DATA);
    const [zone, setZone] = useState(constants.DEFAULT_FORM_DATA);
    const [name, setName] = useState(constants.DEFAULT_FORM_DATA);
    const [phone, setPhone] = useState(constants.DEFAULT_FORM_DATA);
    const [email, setEmail] = useState(constants.DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(constants.DEFAULT_FORM_DATA);
    const [backIDCard, setBackIDCard] = useState(constants.DEFAULT_FORM_DATA);
    const [frontIDCard, setFrontIDCard] = useState(constants.DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(constants.DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);

    const handleNameInput = (data) => {
        shouldResetErrorData();
        setName({...name, isValid: true, data})
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddAgentRequestReset());
        dispatch(storeAllZonesRequestReset());
    };

    // Trigger new agent form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _document = fileChecker(doc);
        const _phone = phoneChecker(phone);
        const _name = requiredChecker(name);
        const _zone = requiredChecker(zone);
        const _backIDCard = imageChecker(backIDCard);
        const _frontIDCard = imageChecker(frontIDCard);
        // Set value
        setName(_name);
        setZone(_zone);
        setPhone(_phone);
        setDoc(_document);
        setBackIDCard(_backIDCard);
        setFrontIDCard(_frontIDCard);
        const validationOK = (
            _name.isValid && _phone.isValid &&
            _document.isValid && _zone.isValid &&
            _backIDCard.isValid && _frontIDCard.isValid
        );
        // Check
        if(validationOK)
            dispatch(emitNewAgent({
                reference: type,
                name: _name.data,
                zone: _zone.data,
                email: email.data,
                phone: _phone.data,
                address: address.data,
                document: _document.data,
                backIDCard: _backIDCard.data,
                town: constants.DEFAULT_TOWN,
                description: description.data,
                frontIDCard: _frontIDCard.data,
                country: constants.DEFAULT_COUNTRY,
                password: constants.DEFAULT_PASSWORD,
            }));
        else playWarningSound();
    };

    // Render
    return (
         <div className="row">
             <div className="col">
                 <form onSubmit={handleSubmit}>
                     <div className='row'>
                         <div className='col-sm-6'>
                             <InputComponent type='text'
                                             label='Nom'
                                             input={name}
                                             id='inputName'
                                             handleInput={handleNameInput}
                             />
                         </div>
                     </div>
                     {/*<div className='row'>*/}
                     {/*    <div className='col-sm-6'>*/}
                     {/*        <InputComponent label='Nom'*/}
                     {/*               type='text'*/}
                     {/*               input={name}*/}
                     {/*               id='inputName'*/}
                     {/*               handleInput={(isValid, val) => {*/}
                     {/*                   shouldResetErrorData();*/}
                     {/*                   setName({...name, isValid, val})*/}
                     {/*               }}*/}
                     {/*        />*/}
                     {/*    </div>*/}
                     {/*    <div className='col-sm-6'>*/}
                     {/*        <InputComponent type='number'*/}
                     {/*               input={phone}*/}
                     {/*               id='inputPhone'*/}
                     {/*               label='Téléphone'*/}
                     {/*               handleInput={(isValid, val) => {*/}
                     {/*                   shouldResetErrorData();*/}
                     {/*                   setPhone({...phone, isValid, val})*/}
                     {/*               }}*/}
                     {/*        />*/}
                     {/*    </div>*/}
                     {/*</div>*/}
                     {/*<div className='row'>*/}
                     {/*    <div className='col-sm-6'>*/}
                     {/*        <InputComponent type='text'*/}
                     {/*               label='Email'*/}
                     {/*               input={email}*/}
                     {/*               id='inputEmail'*/}
                     {/*               handleInput={(isValid, val) => {*/}
                     {/*                   shouldResetErrorData();*/}
                     {/*                   setEmail({...email, isValid, val})*/}
                     {/*               }}*/}
                     {/*        />*/}
                     {/*    </div>*/}
                     {/*    <div className='col-sm-6'>*/}
                     {/*        <Select label='Zone'*/}
                     {/*                input={zone}*/}
                     {/*                id='inputZone'*/}
                     {/*                title='Choisir une zone'*/}
                     {/*                data={dataToArrayForSelect(mappedZones(zones.list))}*/}
                     {/*                requestProcessing={processingRequest(ZONES_SCOPE, requests.list)}*/}
                     {/*                handleInput={(isValid, val) => {*/}
                     {/*                    shouldResetErrorData();*/}
                     {/*                    setZone({...zone, isValid, val})*/}
                     {/*                }}*/}
                     {/*        />*/}
                     {/*    </div>*/}
                     {/*</div>*/}
                     {/*<div className='row'>*/}
                     {/*    <div className='col-sm-6'>*/}
                     {/*        <TextArea label='Adresse'*/}
                     {/*                  input={address}*/}
                     {/*                  id='inputAddress'*/}
                     {/*                  handleInput={(isValid, val) => {*/}
                     {/*                      shouldResetErrorData();*/}
                     {/*                      setAddress({...address, isValid, val})*/}
                     {/*                  }}*/}
                     {/*        />*/}
                     {/*    </div>*/}
                     {/*    <div className='col-sm-6'>*/}
                     {/*        <TextArea label='Description'*/}
                     {/*                  input={description}*/}
                     {/*                  id='inputDescription'*/}
                     {/*                  handleInput={(isValid, val) => {*/}
                     {/*                      shouldResetErrorData();*/}
                     {/*                      setDescription({...description, isValid, val})*/}
                     {/*                  }}*/}
                     {/*        />*/}
                     {/*    </div>*/}
                     {/*</div>*/}
                     {/*<div className='row'>*/}
                     {/*    <FileImageType id='inputFrontIDCard' label='Image avant CNI' input={frontIDCard}*/}
                     {/*                   handleInput={(isValid, val) => {*/}
                     {/*                       shouldResetErrorData();*/}
                     {/*                       setFrontIDCard({...frontIDCard, val});*/}
                     {/*                   }}*/}
                     {/*    />*/}
                     {/*</div>*/}
                     {/*<div className='row'>*/}
                     {/*    <FileImageType id='inputBackIDCard' label='Image arrière CNI' input={backIDCard}*/}
                     {/*                   handleInput={(isValid, val) => {*/}
                     {/*                       shouldResetErrorData();*/}
                     {/*                       setBackIDCard({...backIDCard, isValid, val});*/}
                     {/*                   }}*/}
                     {/*    />*/}
                     {/*</div>*/}
                     {/*<div className='row'>*/}
                     {/*    <div className='col-sm-6'>*/}
                     {/*        <FileDocumentType id='file' label='Document' input={doc}*/}
                     {/*                          handleInput={(isValid, val) => {*/}
                     {/*                              shouldResetErrorData();*/}
                     {/*                              setDoc({...doc, isValid, val});*/}
                     {/*                          }}*/}
                     {/*        />*/}
                     {/*    </div>*/}
                     {/*</div>*/}
                     <div className="form-group row">
                         <ButtonComponent processing={requestLoading(request)} />
                     </div>
                 </form>
             </div>
         </div>
    )
}

// Prop types to ensure destroyed props data type
AgentCardComponent.propTypes = {
    zones: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default React.memo(AgentCardComponent);

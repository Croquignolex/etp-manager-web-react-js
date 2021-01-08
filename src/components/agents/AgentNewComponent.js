import React, {useState} from 'react';
import PropTypes from "prop-types";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";

// Component
function AgentCardComponent({type, zones, request, dispatch, handleClose}) {
    // Local state
    const [doc, setDoc] = useState(DEFAULT_FORM_DATA);
    const [zone, setZone] = useState(DEFAULT_FORM_DATA);
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [phone, setPhone] = useState(DEFAULT_FORM_DATA);
    const [email, setEmail] = useState(DEFAULT_FORM_DATA);
    const [address, setAddress] = useState(DEFAULT_FORM_DATA);
    const [reference, setReference] = useState(DEFAULT_FORM_DATA);
    const [backIDCard, setBackIDCard] = useState(DEFAULT_FORM_DATA);
    const [frontIDCard, setFrontIDCard] = useState(DEFAULT_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Render
    return (
         <div></div>
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

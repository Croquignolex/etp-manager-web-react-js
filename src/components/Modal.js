import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {Modal} from "react-bootstrap";

import {DANGER, INFO, SUCCESS, WARNING} from "../helpers/constants";

// Component
function CustomModal({modal, handleModal, handleClose}) {
    // Data
    const {show, body, type, header, id} = modal;
    const modalItemClass = useMemo(() => {
        switch(type) {
            case INFO: return {button: 'btn btn-info btn-sm', background: 'bg-primary text-white'};
            case DANGER: return {button: 'btn btn-danger btn-sm', background: 'bg-danger text-white'};
            case SUCCESS: return {button: 'btn btn-success btn-sm', background: 'bg-success text-white'};
            case WARNING: return {button: 'btn btn-warning btn-sm', background: 'bg-warning text-white'};
            default: return {button: '', background: ''};
        }
    }, [type]);

    // Render
    return (
        <Modal show={show} onHide={handleClose}>
            {/* Header */}
            <Modal.Header closeButton><h6>{header}</h6></Modal.Header>
            {/* Body */}
            <Modal.Body className={modalItemClass.background}>{body}</Modal.Body>
            {/* Footer */}
            <Modal.Footer>
                <button onClick={() => handleModal(id)} className={modalItemClass.button}>
                    <i className='fa fa-thumbs-up' /> Valider
                </button>
                <button onClick={handleClose} className='btn btn-sm btn-light'>
                    <i className='fa fa-thumbs-down' /> Annuler
                </button>
            </Modal.Footer>
        </Modal>
    );
}

// Prop types to ensure destroyed props data type
CustomModal.propTypes = {
    modal: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired
};

export default React.memo(CustomModal);

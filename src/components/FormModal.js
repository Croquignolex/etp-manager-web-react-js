import React from "react";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";

// Component
function CustomFormModal({modal, children, handleClose}) {
    // Data
    const {show, header} = modal;

    // Render
    return (
        <Modal show={show} onHide={handleClose} size='xl'>
            {/* Header */}
            <Modal.Header closeButton className='custom-card-outline'>
                <h6><strong className='text-theme'>{header}</strong></h6>
            </Modal.Header>
            {/* Body */}
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
}

// Prop types to ensure destroyed props data type
CustomFormModal.propTypes = {
    modal: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default React.memo(CustomFormModal);

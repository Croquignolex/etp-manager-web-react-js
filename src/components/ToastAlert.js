import React from "react";
import PropTypes from "prop-types";
import {Toast} from "react-bootstrap";

import {storeResetToastData} from "../redux/toast/actions";

// Component
function ToastAlert({toast, playSound, dispatch}) {
    // Data
    const {show, title, body, delay, icon, sound, headerClass} = toast;

    // Play the corresponding sound
    (show && playSound) && sound.play();

    // Render
    return (
        <>
            {show &&
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        top: 30,
                        right: 10,
                        zIndex: '9999',
                        width: '350px',
                        position: 'fixed'
                    }}
                >
                    <Toast onClose={() => dispatch(storeResetToastData())} show={show} delay={delay} autohide>
                        <Toast.Header className={headerClass}>
                            <strong className="mr-auto">
                                <i className={icon}/>
                                &nbsp;
                                {title}
                            </strong>
                        </Toast.Header>
                        <Toast.Body>{body}</Toast.Body>
                    </Toast>
                </div>
            }
        </>
    );
}

// Prop types to ensure destroyed props data type
ToastAlert.propTypes = {
    toast: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    playSound: PropTypes.bool.isRequired,
};

export default React.memo(ToastAlert);
import PropTypes from "prop-types";
import React, {useEffect} from 'react';
import {NotificationManager} from 'react-notifications';

import '../assets/scss/footer.scss';

import LoaderComponent from "../components/LoaderComponent";
import {playSuccessSound} from "../functions/playSoundFunctions";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import {emitAttemptUserAuthentication} from "../redux/user/actions";
import {DEFAULT_GUEST_MESSAGE} from "../constants/defaultConstants";
import {requestFailed, requestLoading, requestSucceeded} from "../functions/generalFunctions";
import {storeUserCheckRequestFailed, storeUserCheckRequestReset} from "../redux/requests/actions";

// Component
function CheckUserPage({location, request, dispatch}) {
    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            playSuccessSound();
            NotificationManager.info(request.message);
        }
    }, [request]);

    // local effects
    useEffect(() => {
        // Extract token from URL
        const token = (new URLSearchParams(location.search)).get('token');
        if(token === null) {
            // Display unauthenticated error
            dispatch(storeUserCheckRequestFailed({message: DEFAULT_GUEST_MESSAGE}))
        }
        else {
            // Attempt to authenticate user
            dispatch(emitAttemptUserAuthentication({token}))
        }
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            dispatch(storeUserCheckRequestReset());
        };
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto">
                    <img alt="..." src={require('../assets/images/manager.png')} className="img-fluid" />
                </div>
                <div className="col-12 mt-4">
                    {requestLoading(request) && <LoaderComponent />}
                    {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
                </div>
            </div>
            <footer className="app-footer text-right">
                <small><strong>Copyright &copy; 2020.</strong>&nbsp;&nbsp;All rights reserved.</small>
            </footer>
        </div>
    )
}

// Prop types to ensure destroyed props data type
CheckUserPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default React.memo(CheckUserPage);
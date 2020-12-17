import PropTypes from "prop-types";
import React, {useEffect, useLayoutEffect} from 'react';

import Footer from "../components/Footer";
import LoaderComponent from "../components/LoaderComponent";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import {emitAttemptUserAuthentication} from "../redux/user/actions";
import {requestLoading, setPageTitle} from "../functions/generalFunctions";
import {storeResetUserCheckErrorData, storeSetUserCheckErrorData} from "../redux/errors/actions";

// Component
function CheckUserPage({location, errors, requests, dispatch}) {
    // local effects
    useLayoutEffect(() => {
        setPageTitle("Redirection");
    }, []);

    useEffect(() => {
        // Extract token from URL
        const token = (new URLSearchParams(location.search)).get('token');
        if(token === null) {
            // Display unauthenticated error
            dispatch(storeSetUserCheckErrorData({message: 'unauthenticated'}))
        }
        else {
            // Attempt to authenticate user
            dispatch(emitAttemptUserAuthentication({token}))
        }
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            dispatch(storeResetUserCheckErrorData());
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
                    {requestLoading(requests) && <LoaderComponent />}
                    {errors.userCheck.show && <ErrorAlertComponent message={errors.userCheck.message} />}
                </div>
            </div>
            <Footer needAbsolutePosition={true} />
        </div>
    )
}

// Prop types to ensure destroyed props data type
CheckUserPage.propTypes = {
    errors: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    requests: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default React.memo(CheckUserPage);
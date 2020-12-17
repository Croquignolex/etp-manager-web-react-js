import PropTypes from "prop-types";
import React, {useEffect, useLayoutEffect} from 'react';

import Footer from "../components/Footer";
import {setPageTitle} from "../functions/generalFunctions";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import {storeResetUserCheckErrorData} from "../redux/errors/actions";

// Component
function CheckUserPage({location, errors, requests, dispatch}) {
    //console.log((new URLSearchParams(location.search)).get('token'))

    // local effects
    useLayoutEffect(() => {
        setPageTitle("Redirection");
    }, []);

    useEffect(() => {

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

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
                <div className="col-6 offset-3">
                    <img alt="..." src={require('../assets/images/manager.png')} className="img-fluid" />
                </div>
                <div className="col-12 mt-4">
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
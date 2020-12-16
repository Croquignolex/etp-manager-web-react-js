import PropTypes from "prop-types";
import React, {useEffect} from 'react';

import Footer from "../components/Footer";
import {shouldShowError} from "../helpers/functions";
import {storeResetErrorData} from "../redux/errors/actions";

// Component
function CheckUserPage({match, errors, requests, dispatch}) {
    // Data
    /*const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };*/

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            // shouldResetErrorData();
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
                    <div className="alert alert-danger">ffffffffffffffffffffffff</div>
                </div>
            </div>
            <Footer needAbsolutePosition={true} />
        </div>
    )
}

// Prop types to ensure destroyed props data type
CheckUserPage.propTypes = {
    match: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    requests: PropTypes.object.isRequired,
};

export default React.memo(CheckUserPage);
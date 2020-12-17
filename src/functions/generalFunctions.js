import {API_SERVER_URL, APP_NAME} from "../constants/generalConstants";

// Add app name on page title
export function setPageTitle(title) {
    document.title = `${title} - ${APP_NAME}`;
}

// Check if request has succeeded
export function requestSucceeded(requests) {
    const {failed, loading, succeeded} = requests
    return succeeded && !failed && !loading;
}

// Check if request has failed
export function requestFailed(requests) {
    const {failed, loading, succeeded} = requests
    return !succeeded && failed && !loading;
}

// Check if request is in loading
export function requestLoading(requests) {
    const {failed, loading, succeeded} = requests
    return !succeeded && !failed && loading;
}

// Get user profile image
export function getProfileImageFromServer(image) {
    const defaultImage = require('../assets/images/default.jpg');
    return (image === null) ? defaultImage : `${API_SERVER_URL}/storage/${image}`;
}

// Get CNI image
export function getCNIImageFromServer(image, scope) {
    const defaultImage = require('../assets/images/no-image.jpg');
    return (image === null) ? defaultImage : `${API_SERVER_URL}/storage/${image}`;
}
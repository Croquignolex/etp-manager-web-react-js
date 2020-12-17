import {APP_NAME} from "../constants/generalConstants";

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
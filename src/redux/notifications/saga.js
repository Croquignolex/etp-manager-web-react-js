import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {BASE_URL} from "../../constants/generalConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {sortByCreationDate} from "../../functions/generalFunctions";
import {playSuccessSound} from "../../functions/playSoundFunctions";
import {UNREAD_NOTIFICATIONS_API_PATH} from "../../constants/apiConstants";
import {storeSetUnreadNotificationsData, EMIT_UNREAD_NOTIFICATIONS_FETCH} from './actions'
import {LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS} from "../../constants/localStorageConstants";
import {getLocaleStorageItem, setLocaleStorageItem} from "../../functions/localStorageFunctions";
import {
    CASH_RECOVERY_NOTIFICATION,
    REQUEST_FLEET_NOTIFICATION,
    FLEET_RECOVERY_NOTIFICATION,
    FLEET_OPERATION_NOTIFICATION,
    REQUEST_CLEARANCE_NOTIFICATION,
    CLEARANCE_OPERATION_NOTIFICATION
} from "../../constants/typeConstants";
import {
    DASHBOARD_PAGE_PATH,
    REQUESTS_FLEETS_PAGE_PATH,
    RECOVERIES_CASH_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE_PATH
} from "../../constants/pagePathConstants";

// Fetch notifications from API
/*export function* emitNotificationsFetch() {
    yield takeLatest(EMIT_NOTIFICATIONS_FETCH, function*() {
        const scope = NOTIFICATIONS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, NOTIFICATIONS_API_PATH);
            const notifications = extractNotificationsData(apiResponse.notifications);
            // Fire event to redux
            yield put(storeSetNotificationsData({notifications}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}*/

// Fetch unread notifications from API
export function* emitUnreadNotificationsFetch() {
    yield takeLatest(EMIT_UNREAD_NOTIFICATIONS_FETCH, function*() {
        try {
            // Fire event for request
            const apiResponse = yield call(apiGetRequest, UNREAD_NOTIFICATIONS_API_PATH);
            const notifications = extractNotificationsData(apiResponse.notifications);
            const currentNotifications = notifications.length;
            // Notification sound
            const receivedNotifications = yield call(getLocaleStorageItem, LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS);
            if(receivedNotifications != null && receivedNotifications) {
                if(currentNotifications > receivedNotifications) {
                    playSuccessSound()
                    // Only show desktop notification if focus is lost
                    let hidden;
                    if (typeof document.hidden !== "undefined") hidden = "hidden";
                    else if (typeof document.msHidden !== "undefined") hidden = "msHidden";
                    else if (typeof document.webkitHidden !== "undefined") hidden = "webkitHidden";
                    // Show desktop notification & focus on tab after user click on the notification
                    if (document[hidden]) {
                        if (Notification.permission === "granted") {
                            const options = {
                                body: notifications[0].message,
                                icon: `${BASE_URL}/logo.png`
                            };
                            const notification = new Notification("Notification MMAC", options);
                            notification.onclick = (e)  => {
                                window.open(`${BASE_URL}${notifications[0].url}`);
                            };
                        }
                   }
                }
            }
            // Keep data
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS, currentNotifications);
            // Fire event to redux
            yield put(storeSetUnreadNotificationsData({notifications}));
        } catch (message) {}
    });
}

// Fetch read notification from API
/*export function* emitNotificationRead() {
    yield takeLatest(EMIT_READ_NOTIFICATION, function*({id}) {
        const scope = UNREAD_NOTIFICATIONS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiGetRequest, `${READ_NOTIFICATIONS_API_PATH}/${id}`);
            // Update received notification number
            const receivedNotifications = yield call(getLocaleStorageItem, LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS);
            if(receivedNotifications != null && receivedNotifications) {
                yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS, (receivedNotifications - 1));
            }
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}*/

// Delete notification from API
/*export function* emitNotificationDelete() {
    yield takeLatest(EMIT_NOTIFICATION_DELETE, function*({id}) {
        const scope = NOTIFICATIONS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetNotificationActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_NOTIFICATIONS_API_PATH}/${id}`);
            const notifications = extractNotificationsData(apiResponse.notifications);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Notification supprimée avec succès`
            }));
            // Fire event to redux
            yield put(storeSetNotificationsData({notifications}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetNotificationActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}*/


// Extract notification data
function extractNotificationData(apiNotification) {
    let notification = {
        id: '', url: '', message: '', creation: '', className: '', read: false
    };
    const notificationDetail = getNotificationDetail(apiNotification.type);
    if(apiNotification) {
        notification.actionLoader = false;
        notification.id = apiNotification.id.toString();
        notification.creation = apiNotification.created_at;
        notification.read = apiNotification.read_at !== null;
        notification.className = notificationDetail.className;
        notification.message = apiNotification.data.Notification.message;
        notification.url = notificationDetail.url;
    }
    return notification;
}

// Extract notifications data
function extractNotificationsData(apiNotifications) {
    const notifications = [];
    if(apiNotifications) {
        apiNotifications.forEach(data => {
            notifications.push(extractNotificationData(data));
        });
    }
    sortByCreationDate(notifications);
    return notifications;
}

// URL
function getNotificationDetail(notificationType) {
    switch (notificationType) {
        case CASH_RECOVERY_NOTIFICATION: return {url: RECOVERIES_CASH_PAGE_PATH, className: 'text-primary'};
        case REQUEST_FLEET_NOTIFICATION: return {url: REQUESTS_FLEETS_PAGE_PATH, className: 'text-dark'};
        case FLEET_RECOVERY_NOTIFICATION: return {url: RECOVERIES_FLEETS_PAGE_PATH, className: 'text-info'};
        case FLEET_OPERATION_NOTIFICATION: return {url: OPERATIONS_FLEETS_PAGE_PATH, className: 'text-warning'};
        case REQUEST_CLEARANCE_NOTIFICATION: return {url: REQUESTS_CLEARANCES_PAGE_PATH, className: 'text-success'};
        case CLEARANCE_OPERATION_NOTIFICATION: return {url: OPERATIONS_CLEARANCES_PAGE_PATH, className: 'text-danger'};
        default: return {url: DASHBOARD_PAGE_PATH, className: 'text-secondary'};
    }
}

// Combine to export all functions at once
export default function* sagaNotifications() {
    yield all([
        fork(emitUnreadNotificationsFetch),
    ]);
}
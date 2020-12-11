import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {
    apiGetRequest,
    apiPostRequest,
    playSuccessSound,
    sortByCreationDate,
    getLocaleStorageItem,
    setLocaleStorageItem
} from "../../helpers/functions";
import {
    EMIT_READ_NOTIFICATION,
    EMIT_NOTIFICATIONS_FETCH,
    EMIT_NOTIFICATION_DELETE,
    storeSetNotificationsData,
    storeSetNotificationActionData,
    storeSetUnreadNotificationsData,
    EMIT_UNREAD_NOTIFICATIONS_FETCH
} from './actions'
import {
    BASE_URL,
    DASHBOARD_PAGE_PATH,
    NOTIFICATIONS_SCOPE,
    NOTIFICATIONS_API_PATH,
    REQUESTS_FLEETS_PAGE_PATH,
    RECOVERIES_CASH_PAGE_PATH,
    UNREAD_NOTIFICATIONS_SCOPE,
    REQUEST_FLEET_NOTIFICATION,
    CASH_RECOVERY_NOTIFICATION,
    OPERATIONS_FLEETS_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
    FLEET_RECOVERY_NOTIFICATION,
    READ_NOTIFICATIONS_API_PATH,
    FLEET_OPERATION_NOTIFICATION,
    REQUESTS_CLEARANCES_PAGE_PATH,
    UNREAD_NOTIFICATIONS_API_PATH,
    DELETE_NOTIFICATIONS_API_PATH,
    REQUEST_CLEARANCE_NOTIFICATION,
    OPERATIONS_CLEARANCES_PAGE_PATH,
    CLEARANCE_OPERATION_NOTIFICATION,
    LOCAL_STORAGE_USER_RECEIVED_NOTIFICATIONS
} from "../../helpers/constants";
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed
} from "../requests/actions";

// Fetch notifications from API
export function* emitNotificationsFetch() {
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
}

// Fetch unread notifications from API
export function* emitUnreadNotificationsFetch() {
    yield takeLatest(EMIT_UNREAD_NOTIFICATIONS_FETCH, function*() {
        const scope = UNREAD_NOTIFICATIONS_SCOPE;
        try {
            // Fire event for request
            // yield put(storeRequestInit({scope}));
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
                                icon: `${BASE_URL}/logo-square.png`
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
            // Fire event for request
            // yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            // yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch read notification from API
export function* emitNotificationRead() {
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
}

// Delete notification from API
export function* emitNotificationDelete() {
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
}


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

// Combine to export all functions at once
export default function* sagaNotifications() {
    yield all([
        fork(emitNotificationRead),
        fork(emitNotificationsFetch),
        fork(emitNotificationDelete),
        fork(emitUnreadNotificationsFetch),
    ]);
}
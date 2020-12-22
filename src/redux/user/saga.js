import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'

import {AUTH_URL} from "../../constants/generalConstants";
import {apiPostRequest} from "../../functions/axiosFunctions";
import {getProfileImageFromServer} from "../../functions/generalFunctions";
import {storeResetSettingsData, storeSetSettingsData} from "../settings/actions";
import {storeSetUserCheckErrorData, storeSetUserPasswordEditErrorData} from "../errors/actions";
import {LOCAL_STORAGE_USER_DATA, LOCAL_STORAGE_SETTINGS} from "../../constants/localStorageConstants";
import {
    LOGOUT_API_PATH,
    EDIT_PASSWORD_API_PATH,
    AUTHENTICATION_API_PATH
} from "../../constants/apiConstants";
import {
    storeUserCheckRequestInit,
    storeUserCheckRequestFailed,
    storeUserPasswordEditRequestInit,
    storeUserPasswordEditRequestFailed,
    storeUserPasswordEditRequestSucceed
} from "../requests/actions";
import {
    setLocaleStorageItem,
    getLocaleStorageItem,
    removeAllLocaleStorageItems
} from "../../functions/localStorageFunctions";
import {
    EMIT_USER_LOGOUT,
    storeResetUserData,
    storeSetUserFullData,
    EMIT_USER_PASSWORD_UPDATE,
    EMIT_CHECK_USER_AUTHENTICATION,
    EMIT_ATTEMPT_USER_AUTHENTICATION
} from "./actions";

// Check user authentication from data in local storage
export function* emitCheckUserAuthentication() {
    yield takeEvery(EMIT_CHECK_USER_AUTHENTICATION, function*() {
        try {
            // Fetch user auth in locale storage
            const userData = yield call(getLocaleStorageItem, LOCAL_STORAGE_USER_DATA);
            const settingsData = yield call(getLocaleStorageItem, LOCAL_STORAGE_SETTINGS);
            // Check auth
            if(userData != null && settingsData !== null && userData.auth) {
                // Deconstruction
                const {cards, charts, bars, sound, session} = settingsData;
                const {name, post, email, phone, avatar, address, creation} = userData;
                // Fire event to redux for settings data
                yield put(storeSetSettingsData({
                    id: settingsData.id,
                    description: settingsData.description,
                    cards, charts, bars, sound, session
                }))
                // Fire event to redux for user data
                yield put(storeSetUserFullData({
                    id: userData.id,
                    description: userData.description,
                    address, post, name, phone, email, avatar, creation,
                }));
            } else {
                yield put(storeResetUserData());
                yield put(storeResetSettingsData());
            }
        } catch (e) {
            yield put(storeResetUserData());
            yield put(storeResetSettingsData());
        }
    });
}

// Attempt user authentication from API
export function* emitAttemptUserAuthentication() {
    yield takeLatest(EMIT_ATTEMPT_USER_AUTHENTICATION, function*({token}) {
        try {
            // Fire event for request
            yield put(storeUserCheckRequestInit());
            // Put token in local storage for a check
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DATA, {token});
            // API call
            const apiResponse = yield call(apiPostRequest, AUTHENTICATION_API_PATH);
            // Extract data
            const {userData, settingsData} = extractUserAndSettingsData(apiResponse);
            // Deconstruction
            const {cards, charts, bars, sound, session} = settingsData;
            const {name, post, email, phone, avatar, address, creation} = userData;
            // Set user data into local storage
            yield call(setLocaleStorageItem, LOCAL_STORAGE_SETTINGS, settingsData);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DATA, {...userData, token});
            // Fire event to redux for settings data
            yield put(storeSetSettingsData({
                id: settingsData.id,
                description: settingsData.description,
                cards, charts, bars, sound, session
            }))
            // Fire event to redux for user data
            yield put(storeSetUserFullData({
                id: userData.id,
                description: userData.description,
                address, post, name, phone, email, avatar, creation,
            }));
        } catch (message) {
            // Fire event for request
            yield put(storeUserCheckRequestFailed());
            yield put(storeSetUserCheckErrorData({message}));
        }
    });
}

// Update user password from API
export function* emitUserPasswordUpdate() {
    yield takeLatest(EMIT_USER_PASSWORD_UPDATE, function*({oldPassword, newPassword}) {
        try {
            // Fire event for request
            yield put(storeUserPasswordEditRequestInit());
            const data = {current_pass: oldPassword, new_pass: newPassword};
            // API call
            yield call(apiPostRequest, EDIT_PASSWORD_API_PATH, data);
            // Fire event for request
            yield put(storeUserPasswordEditRequestSucceed());
        } catch (message) {
            // Fire event for request
            yield put(storeUserPasswordEditRequestFailed());
            yield put(storeSetUserPasswordEditErrorData({message}));
        }
    });
}

// Remove user data present into local storage while logout from API
export function* emitUserLogout() {
    yield takeLatest(EMIT_USER_LOGOUT, function*() {
        try {
            // Logout in API (Do not wait API response)
            call(apiPostRequest, LOGOUT_API_PATH);
            // Remove all data in locale storage
            yield call(removeAllLocaleStorageItems);
            // Redirect to auth page
            window.location.replace(AUTH_URL);
        } catch (e) {}
    });
}

/*
// Update user information from API
export function* emitUserInformationUpdate() {
    yield takeLatest(EMIT_USER_INFORMATION_UPDATE, function*({name, post, address,
                                                                 email, description}) {
        const scope = USER_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = {name, email, poste: post, adresse: address, description};
            // API call
            yield call(apiPostRequest, EDIT_PROFILE_API_PATH, data);
            // Set user data into local storage
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_NAME, name);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_POST, post);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_EMAIL, email);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_ADDRESS, address);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DESCRIPTION, description);
            // Fire event at redux for information toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Information du profil mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetUserInformationData({name, post, address, email, description}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update user avatar from API
export function* emitUserAvatarUpdate() {
    yield takeLatest(EMIT_USER_AVATAR_UPDATE, function*({avatar}) {
        const scope = PROFILE_AVATAR_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('base_64_image', avatar);
            // API call
            yield call(apiPostRequest, EDIT_AVATAR_API_PATH, data);
            // Set user data into local storage
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_AVATAR, avatar);
            // Fire event at redux for information toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Avatar mis à jour avec succès`
            }));
            yield put(storeSetUserAvatarData({avatar}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update user setting from API
export function* emitUserSettingUpdate() {
    yield takeLatest(EMIT_USER_SETTING_UPDATE, function*({cards, charts, bars,
                                                             sound, session, description}) {
        const scope = SETTINGS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const setting = {cards, charts, bars, sound, session, description};
            // API call
            yield call(apiPostRequest, EDIT_SETTING_API_PATH, setting);
            // Set user data into local storage
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_SETTING, setting);
            // Fire event at redux for information toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Paramètres mis à jour avec succès`
            }));
            yield put(storeSetUserSettingData(setting));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Get user balance & keep into store and local storage
export function* emitUserBalance() {
    yield takeLatest(EMIT_USER_BALANCE, function*() {
        const scope = USER_BALANCE_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, BALANCE_API_PATH);
            // Extract balance
            const accountData = apiResponse.caisse;
            let account = {id: '', balance: 0}
            if(accountData) {
                account = {
                    balance: apiResponse.caisse.solde,
                    id: apiResponse.caisse.id.toString(),
                };
            }
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_BALANCE, account.balance);
            // Fire event to redux
            yield put(storeSetUserBalance({account}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}
*/

// Extract user data & settings
function extractUserAndSettingsData(apiResponse) {
    const {user, settings} = apiResponse;
    return {
        userData: {
            auth: true,
            name: user.name,
            post: user.poste,
            email: user.email,
            phone: user.phone,
            address: user.adresse,
            id: user.id.toString(),
            creation: user.created_at,
            description: user.description,
            avatar: getProfileImageFromServer(user.avatar)
        },
        settingsData: {
            session: settings.session,
            id: settings.id.toString(),
            sound: settings.sound === 1,
            bars: JSON.parse(settings.bars),
            cards: JSON.parse(settings.cards),
            description: settings.description,
            charts: JSON.parse(settings.charts)
        }
    }
}

// Combine to export all functions at once
export default function* sagaUser() {
    yield all([
        fork(emitUserLogout),
        fork(emitUserPasswordUpdate),
        fork(emitCheckUserAuthentication),
        fork(emitAttemptUserAuthentication),
    ]);
}
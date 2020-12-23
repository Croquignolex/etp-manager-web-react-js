import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'

import {AUTH_URL} from "../../constants/generalConstants";
import {USER_ROLE} from "../../constants/defaultConstants";
import {apiPostRequest} from "../../functions/axiosFunctions";
import {getProfileImageFromServer} from "../../functions/generalFunctions";
import {storeResetSettingsData, storeSetSettingsData} from "../settings/actions";
import {LOCAL_STORAGE_USER_DATA, LOCAL_STORAGE_SETTINGS} from "../../constants/localStorageConstants";
import {
    LOGOUT_API_PATH,
    EDIT_AVATAR_API_PATH,
    EDIT_PROFILE_API_PATH,
    EDIT_PASSWORD_API_PATH,
    AUTHENTICATION_API_PATH
} from "../../constants/apiConstants";
import {
    setLocaleStorageItem,
    getLocaleStorageItem,
    removeAllLocaleStorageItems
} from "../../functions/localStorageFunctions";
import {
    EMIT_USER_LOGOUT,
    storeResetUserData,
    storeSetUserFullData,
    storeSetUserAvatarData,
    EMIT_USER_AVATAR_UPDATE,
    EMIT_USER_PASSWORD_UPDATE,
    storeSetUserInformationData,
    EMIT_USER_INFORMATION_UPDATE,
    EMIT_CHECK_USER_AUTHENTICATION,
    EMIT_ATTEMPT_USER_AUTHENTICATION
} from "./actions";
import {
    storeUserCheckRequestInit,
    storeUserCheckRequestFailed,
    storeUserCheckRequestSucceed,
    storeUserAvatarEditRequestInit,
    storeUserProfileEditRequestInit,
    storeUserPasswordEditRequestInit,
    storeUserAvatarEditRequestFailed,
    storeUserProfileEditRequestFailed,
    storeUserAvatarEditRequestSucceed,
    storeUserPasswordEditRequestFailed,
    storeUserProfileEditRequestSucceed,
    storeUserPasswordEditRequestSucceed
} from "../requests/actions";

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
            const data = {role: USER_ROLE};
            // API call
            const apiResponse = yield call(apiPostRequest, AUTHENTICATION_API_PATH, data);
            // Extract data
            const {userData, settingsData, roleData} = extractUserAndSettingsData(apiResponse.data);
            // Deconstruction
            if(roleData === data.role) {
                const {cards, charts, bars, sound, session} = settingsData;
                const {name, post, email, phone, avatar, address, creation} = userData;
                // Set user data into local storage
                yield call(setLocaleStorageItem, LOCAL_STORAGE_SETTINGS, settingsData);
                yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DATA, {...userData, token});
                // Fire event for request
                yield put(storeUserCheckRequestSucceed({message: apiResponse.message}));
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
            }
            else yield put(storeUserCheckRequestFailed({message: "Utilisateur non authorisé sur ce rôle"}));
        } catch (message) {
            // Fire event for request
            yield put(storeUserCheckRequestFailed({message}));
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
            const apiResponse = yield call(apiPostRequest, EDIT_PASSWORD_API_PATH, data);
            // Fire event for request
            yield put(storeUserPasswordEditRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeUserPasswordEditRequestFailed({message}));
        }
    });
}

// Update user information from API
export function* emitUserInformationUpdate() {
    yield takeLatest(EMIT_USER_INFORMATION_UPDATE, function*({name, post, address, email, description}) {
        try {
            // Fire event for request
            yield put(storeUserProfileEditRequestInit());
            const data = {name, email, poste: post, adresse: address, description};
            const userData = yield call(getLocaleStorageItem, LOCAL_STORAGE_USER_DATA);
            // API call
            const apiResponse = yield call(apiPostRequest, EDIT_PROFILE_API_PATH, data);
            // Set user data into local storage
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DATA, {...userData, name, post, address, description});
            // Fire event for request
            yield put(storeUserProfileEditRequestSucceed({message: apiResponse.message}));
            // Fire event to redux
            yield put(storeSetUserInformationData({name, post, address, email, description}));
        } catch (message) {
            // Fire event for request
            yield put(storeUserProfileEditRequestFailed({message}));
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

// Update user avatar from API
export function* emitUserAvatarUpdate() {
    yield takeLatest(EMIT_USER_AVATAR_UPDATE, function*({avatar}) {
        try {
            // Fire event for request
            yield put(storeUserAvatarEditRequestInit());
            const data = {base_64_image: avatar};
            const userData = yield call(getLocaleStorageItem, LOCAL_STORAGE_USER_DATA);
            // API call
            const apiResponse = yield call(apiPostRequest, EDIT_AVATAR_API_PATH, data);
            // Set user data into local storage
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DATA, {...userData, avatar});
            // Fire event for request
            yield put(storeUserAvatarEditRequestSucceed({message: apiResponse.message}));
            // Fire event to redux
            yield put(storeSetUserAvatarData({avatar}));
        } catch (message) {
            // Fire event for request
            yield put(storeUserAvatarEditRequestFailed({message}));
        }
    });
}

// Extract user data & settings
function extractUserAndSettingsData(apiResponse) {
    const {user, settings, role} = apiResponse;
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
        },
        roleData: role
    }
}

// Combine to export all functions at once
export default function* sagaUser() {
    yield all([
        fork(emitUserLogout),
        fork(emitUserAvatarUpdate),
        fork(emitUserPasswordUpdate),
        fork(emitUserInformationUpdate),
        fork(emitCheckUserAuthentication),
        fork(emitAttemptUserAuthentication),
    ]);
}
import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'

import {getLocaleStorageItem, setLocaleStorageItem} from "../../functions/localStorageFunctions";
import {storeResetSettingsData, storeSetSettingsData} from "../settings/actions";
import {
    EMIT_ATTEMPT_USER_AUTHENTICATION,
    EMIT_CHECK_USER_AUTHENTICATION,
    storeResetUserData,
    storeSetUserFullData
} from "./actions";
import {LOCAL_STORAGE_USER_DATA, LOCAL_STORAGE_SETTINGS} from "../../constants/localStorageConstants";
import {storeUserCheckRequestInit} from "../requests/actions";
import {apiPostRequest} from "../../functions/axiosFunctions";
import {AUTHENTICATION_API_PATH} from "../../constants/apiConstants";

// Check user authentication from data in local storage
export function* emitCheckUserAuthentication() {
    yield takeEvery(EMIT_CHECK_USER_AUTHENTICATION, function*() {
        try {
            // Fetch user auth in locale storage
            const user_data = yield call(getLocaleStorageItem, LOCAL_STORAGE_USER_DATA);
            const settings_data = yield call(getLocaleStorageItem, LOCAL_STORAGE_SETTINGS);
            // Check auth
            if(user_data != null && settings_data !== null && user_data.auth) {
                const {cards, charts, bars, sound, session} = settings_data;
                const {name, post, email, phone, avatar, address, creation} = user_data;
                // Fire event to redux for user data
                yield put(storeSetUserFullData({
                    id: user_data.id,
                    description: user_data.description,
                    address, post, name, phone, email, avatar, creation,
                }));
                // Fire event to redux for settings data
                yield put(storeSetSettingsData({
                    id: settings_data.id,
                    description: settings_data.description,
                    cards, charts, bars, sound, session
                }))
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
            // API call
            const apiResponse = yield call(apiPostRequest, AUTHENTICATION_API_PATH, {token});

            /*let town = '';
            let sims = [];
            let country = '';
            let reference = '';
            let salePoint = '';
            let commission = '';
            let backIDCard = '';
            let frontIDCard = '';
            let role = {id: '', name: ''};
            let zone = {id: '', map: '', name: '', reference: ''};
            let setting = {id: '', cards: [], charts: [], bars: [], sound: true, session: 15, description: ''};*/


            //const settingData = apiResponse.setting;

            //const avatarFromServer = getImageFromServer(userData.avatar, PROFILE_SCOPE);
            const {id, name, poste, email, adresse, created_at, description, avatar} = apiResponse;

            // Set user data into local storage
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DATA, apiResponse);

            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_NAME, name);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_POST, poste);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_EMAIL, email);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_PHONE, phone);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_ADDRESS, adresse);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_ID, id.toString());
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_AUTHENTICATION, true);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_TOKEN, apiResponse.token);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_AVATAR, avatarFromServer);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_DESCRIPTION, description);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_CREATION_DATE, created_at);

            if(roleData !== null) {
                role = {
                    name: roleData.name,
                    id: roleData.id.toString()
                }
            }

            if(settingData !== null) {
                setting = {
                    session: settingData.session,
                    id: settingData.id.toString(),
                    sound: settingData.sound === 1,
                    bars: JSON.parse(settingData.bars),
                    description: settingData.description,
                    cards: JSON.parse(settingData.cards),
                    charts: JSON.parse(settingData.charts),
                }
            }

            // Both agent & collector data
            if(COLLECTOR_AGENT_ROLE.includes(role.name)) {
                if(zoneData !== null) {
                    zone = {
                        map: zoneData.map,
                        name: zoneData.nom,
                        id: zoneData.id.toString(),
                        reference: zoneData.reference
                    };
                }
                if(simsData !== null) {
                    simsData.forEach(sim => {
                        sims.push({
                            name: sim.nom,
                            number: sim.numero,
                            balance: sim.solde,
                            id: sim.id.toString(),
                            reference: sim.reference
                        })
                    })
                }
                // Agent Data
                if(AGENT_ROLE.includes(role.name)) {
                    town = agentData.ville;
                    country = agentData.pays;
                    reference = agentData.reference;
                    salePoint = agentData.point_de_vente;
                    commission = agentData.taux_commission;
                    frontIDCard = getImageFromServer(agentData.img_cni, AGENT_SCOPE);
                    backIDCard = getImageFromServer(agentData.img_cni_back, AGENT_SCOPE);
                }
            }

            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_TOWN, town);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_COUNTRY, country);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_REFERENCE, reference);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_SALE_POINT, salePoint);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_COMMISSION, commission);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_BACK_ID_CARD, backIDCard);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_FRONT_ID_CARD, frontIDCard);

            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_SIMS, sims);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_ZONE, zone);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_ROLE, role);
            yield call(setLocaleStorageItem, LOCAL_STORAGE_USER_SETTING, setting);

            // Fire event to fill user data
            yield put(storeSetUserFullData({
                post: poste,
                address: adresse,
                id: id.toString(),
                creation: created_at,
                avatar: avatarFromServer,
                name, phone, email, description, zone, sims, role, setting,
                town, country, reference, salePoint, commission, backIDCard, frontIDCard,
            }));
            // Fire event for welcome notify
            yield put(storeSetSuccessToastData({
                title: 'Bienvenue!',
                body: `Tout est prêt pour vous ${name}`
            }));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
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

// Update user password from API
export function* emitUserPasswordUpdate() {
    yield takeLatest(EMIT_USER_PASSWORD_UPDATE, function*({oldPassword, newPassword}) {
        const scope = PROFILE_PASSWORD_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = {current_pass: oldPassword, new_pass: newPassword};
            // API call
            yield call(apiPostRequest, EDIT_PASSWORD_API_PATH, data);
            // Fire event at redux for information toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Mot de passe mis à jour avec succès`
            }));
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

// Remove user data present into local storage while logout from API
export function* emitUserLogout() {
    yield takeLatest(EMIT_USER_LOGOUT, function*() {
        try {
            // Logout in API (Do not wait API response)
            call(apiPostRequest, LOGOUT_API_PATH);
            // Remove all data in locale storage
            yield call(removeAllLocaleStorageItems);
        } catch (e) {}
        finally {yield put(storeResetUserData());}
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
function extractUserDataAndSettings(apiResponse) {
    //const {id, name, poste, email, adresse, created_at, description, avatar} = apiResponse;
}

// Combine to export all functions at once
export default function* sagaUser() {
    yield all([
        fork(emitCheckUserAuthentication),
        fork(emitAttemptUserAuthentication),
    ]);
}
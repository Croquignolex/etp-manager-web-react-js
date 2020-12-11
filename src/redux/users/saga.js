import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed
} from "../requests/actions";
import {
    apiGetRequest,
    apiPostRequest,
    getImageFromServer,
    sortByCreationDate
} from "../../helpers/functions";
import {
    EMIT_NEW_USER,
    EMIT_USER_FETCH,
    storeSetUserData,
    EMIT_USER_DELETE,
    EMIT_UPDATE_USER,
    EMIT_USERS_FETCH,
    storeSetUsersData,
    EMIT_UPDATE_USER_ROLE,
    storeSetUserActionData,
    storeSetUserToggleData,
    EMIT_TOGGLE_USER_STATUS,
} from './actions'
import {
    AGENT,
    APPROVE,
    COLLECTOR,
    USER_SCOPE,
    USERS_SCOPE,
    PROFILE_SCOPE,
    USER_NEW_SCOPE,
    USERS_API_PATH,
    USER_EDIT_SCOPE,
    EDIT_USER_API_PATH,
    CREATE_USER_API_PATH,
    DELETE_USER_API_PATH,
    USER_ROLE_EDIT_SCOPE,
    USERS_DETAILS_API_PATH,
    EDIT_STATUS_USER_API_PATH,
    USER_ROLE_UPDATE_API_PATH,
} from "../../helpers/constants";

// Fetch users from API
export function* emitUsersFetch() {
    yield takeLatest(EMIT_USERS_FETCH, function*() {
        const scope = USERS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, USERS_API_PATH);
            const users = extractUsersData(apiResponse.users);
            // Fire event to redux
            yield put(storeSetUsersData({users}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch user from API
export function* emitUserFetch() {
    yield takeLatest(EMIT_USER_FETCH, function*({id}) {
        const scope = USER_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${USERS_DETAILS_API_PATH}/${id}`);
            const user = extractUserData(apiResponse.user, apiResponse.role, apiResponse.caisse);
            // Fire event to redux
            yield put(storeSetUserData({user}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New user into API
export function* emitNewUser() {
    yield takeLatest(EMIT_NEW_USER, function*({name, post, address, phone,
                                                  email, role, password, description}) {
        const scope = USER_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            yield call(apiPostRequest, CREATE_USER_API_PATH,
                {
                    name: name,
                    poste: post,
                    phone: phone,
                    email: email,
                    id_role: role,
                    adresse: address,
                    password: password,
                    description: description,
                });
            // Fire event at redux for new user toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Utilisateur ajouté avec succès`
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

// Update user into API
export function* emitUpdateUser() {
    yield takeLatest(EMIT_UPDATE_USER, function*({id, post, name, address,
                                                     email, description}) {
        const scope = USER_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_USER_API_PATH}/${id}`,
                {
                    name,
                    email,
                    poste: post,
                    description,
                    adresse: address,
                });
            const user = extractUserData(apiResponse.user, apiResponse.role, apiResponse.caisse);
            // Fire event at redux for user update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Utilisateur mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetUserData({user}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update user role into API
export function* emitUpdateUserRole() {
    yield takeLatest(EMIT_UPDATE_USER_ROLE, function*({id, role}) {
        const scope = USER_ROLE_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${USER_ROLE_UPDATE_API_PATH}/${id}`, {id_role: role});
            const user = extractUserData(apiResponse.user, apiResponse.role, apiResponse.caisse);
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Role de l'utilisateur mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetUserData({user}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Toggle user status into API
export function* emitToggleUserStatus() {
    yield takeLatest(EMIT_TOGGLE_USER_STATUS, function*({id}) {
        const scope = USERS_SCOPE;
        try {
            // Fire event for request
            yield put(storeSetUserToggleData({id}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_STATUS_USER_API_PATH}/${id}`);
            const users = extractUsersData(apiResponse.users);
            // Fire event at redux for new user toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Status de l'utilisateur changé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetUsersData({users}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetUserToggleData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Delete user from API
export function* emitUserDelete() {
    yield takeLatest(EMIT_USER_DELETE, function*({id}) {
        const scope = USERS_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetUserActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_USER_API_PATH}/${id}`);
            const users = extractUsersData(apiResponse.users);
            // Fire event at redux for user delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Utilisateur supprimé avec succès`
            }));
            // Fire event to redux
            yield put(storeSetUsersData({users}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetUserActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract user data
function extractUserData(apiUser, apiRole, apiAccount) {
    let user = {
        id: '', name: '', post: '', phone: '',
        email: '', avatar: '', address: '', creation: '', description: '',

        role: {id: '', name: ''},
        account: {id: '', balance: ''},
    };
    if(apiRole) {
        user.role = {
            name: apiRole.name,
            id: apiRole.id.toString()
        }
    }
    if(apiAccount) {
        user.account = {
            balance: apiAccount.solde,
            id: apiAccount.id.toString(),
        }
    }
    if(apiUser) {
        user.name = apiUser.name;
        user.post = apiUser.poste;
        user.actionLoader = false;
        user.toggleLoader = false;
        user.phone = apiUser.phone;
        user.email = apiUser.email;
        user.address = apiUser.adresse;
        user.id = apiUser.id.toString();
        user.creation = apiUser.created_at;
        user.description = apiUser.description;
        user.status = apiUser.statut === APPROVE;
        user.avatar = getImageFromServer(apiUser.avatar, PROFILE_SCOPE);
    }
    return user;
}

// Extract users data
function extractUsersData(apiUsers) {
    const users = [];
    if(apiUsers) {
        apiUsers.forEach(data => {
            const {name} = data.role;
            (name !== AGENT && name !== COLLECTOR)
            && users.push(extractUserData(data.user, data.role, data.caisse));
        });
    }
    sortByCreationDate(users);
    return users;
}

// Combine to export all functions at once
export default function* sagaUsers() {
    yield all([
        fork(emitNewUser),
        fork(emitUserFetch),
        fork(emitUserDelete),
        fork(emitUsersFetch),
        fork(emitUpdateUser),
        fork(emitUpdateUserRole),
        fork(emitToggleUserStatus),
    ]);
}
// Reducer action types
export const STORE_SET_USER_DATA = 'STORE_SET_USER_DATA';
export const STORE_SET_USERS_DATA = 'STORE_SET_USERS_DATA';
export const STORE_SET_USER_ACTION_DATA = 'STORE_SET_USER_ACTION_DATA';
export const STORE_SET_USER_TOGGLE_DATA = 'STORE_SET_USER_TOGGLE_DATA';

// Middleware action types
export const EMIT_NEW_USER = 'EMIT_NEW_USER';
export const EMIT_USER_FETCH = 'EMIT_USER_FETCH';
export const EMIT_UPDATE_USER = 'EMIT_UPDATE_USER';
export const EMIT_USERS_FETCH = 'EMIT_USERS_FETCH';
export const EMIT_USER_DELETE = 'EMIT_USER_DELETE';
export const EMIT_UPDATE_USER_ROLE = 'EMIT_UPDATE_USER_ROLE';
export const EMIT_TOGGLE_USER_STATUS = 'EMIT_TOGGLE_USER_STATUS';

//====================== Reducer trigger actions
// Set users data in store
export const storeSetUsersData = ({users}) => ({
    users,
    type: STORE_SET_USERS_DATA
});

// Set user data in store
export const storeSetUserData = ({user}) => ({
    user,
    type: STORE_SET_USER_DATA
});

// Set user action data in store
export const storeSetUserActionData = ({id}) => ({
    id,
    type: STORE_SET_USER_ACTION_DATA
});

// Set user toggle data in store
export const storeSetUserToggleData = ({id}) => ({
    id,
    type: STORE_SET_USER_TOGGLE_DATA
});

//====================== Middleware trigger actions
// Emit users fetch
export const emitUsersFetch = () => ({
    type: EMIT_USERS_FETCH
});

// Emit user fetch by id
export const emitUserFetch = ({id}) => ({
    id,
    type: EMIT_USER_FETCH
});

// Emit new user
export const emitNewUser = ({name, post, address, phone, email,
                                role, password,  description}) => ({
    name,
    role,
    post,
    phone,
    email,
    address,
    password,
    description,
    type: EMIT_NEW_USER
});

// Emit update user
export const emitUpdateUser = ({id, post, name, address, email, description}) => ({
    id,
    post,
    name,
    email,
    address,
    description,
    type: EMIT_UPDATE_USER
});

// Emit update user role
export const emitUpdateUserRole = ({id, role}) => ({
    id,
    role,
    type: EMIT_UPDATE_USER_ROLE
});

// Emit toggle user status
export const emitToggleUserStatus = ({id}) => ({
    id,
    type: EMIT_TOGGLE_USER_STATUS
});

// Emit user delete by id
export const emitUserDelete = ({id}) => ({
    id,
    type: EMIT_USER_DELETE
});

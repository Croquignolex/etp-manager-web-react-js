import {
    STORE_SET_USER_DATA,
    STORE_SET_USERS_DATA,
    STORE_SET_USER_ACTION_DATA,
    STORE_SET_USER_TOGGLE_DATA,
} from "./actions";

// Partial global store for users data management
const initialState = {
    list: [],
    current: {
        id: '', name: '', post: '', phone: '',
        email: '', avatar: '', address: '', creation: '', description: '',

        role: {id: '', name: ''},
        account: {id: '', balance: ''},
    }
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set users data
        case STORE_SET_USERS_DATA:
            nextState = {...state, list: action.users};
            return nextState || state;
        // Resolve event to set user data
        case STORE_SET_USER_DATA:
            nextState = {...state, current: action.user};
            return nextState || state;
        // Resolve event to set user action data
        case STORE_SET_USER_TOGGLE_DATA:
            nextState = {...state, list: state.list.map(user => {
                        if(user.id === action.id) {
                            user.toggleLoader = !user.toggleLoader;
                        }
                        return user;
                    }
                )};
            return nextState || state;
        // Resolve event to set user action data
        case STORE_SET_USER_ACTION_DATA:
            nextState = {...state, list: state.list.map(user => {
                    if(user.id === action.id) {
                        user.actionLoader = !user.actionLoader;
                    }
                    return user;
                }
            )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
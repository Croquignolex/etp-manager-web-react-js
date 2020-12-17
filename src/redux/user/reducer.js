import {
    STORE_RESET_USER_DATA,
    STORE_SET_USER_FULL_DATA,
    STORE_SET_USER_AVATAR_DATA,
    STORE_SET_USER_BALANCE_DATA,
    STORE_SET_USER_SETTING_DATA,
    STORE_SET_USER_INFORMATION_DATA,
} from "./actions";

// Partial global store for user data management
const initialState = {
    id: '',
    name: '',
    post: '',
    phone: '',
    email: '',
    avatar: '',
    address: '',
    status: true,
    creation: '',
    description: '',
    isLoggedIn: false,
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to reset user store data
        case STORE_RESET_USER_DATA:
            nextState = {...state, ...initialState};
            return nextState || state;
        // Resolve event to set user store avatar
        case STORE_SET_USER_AVATAR_DATA:
            nextState = {...state, avatar: action.avatar};
            return nextState || state;
        // Resolve event to set user store avatar
        case STORE_SET_USER_BALANCE_DATA:
            nextState = {...state, account: action.account};
            return nextState || state;
        // Resolve event to set user store simple data
        case STORE_SET_USER_INFORMATION_DATA:
            nextState = {
                ...state,
                name: action.name,
                post: action.post,
                email: action.email,
                address: action.address,
                description: action.description
            };
            return nextState || state;
        // Resolve event to set user store setting data
        case STORE_SET_USER_SETTING_DATA:
            nextState = {
                ...state,
                setting: {
                    ...state.setting,
                    bars: action.bars,
                    cards: action.cards,
                    sound: action.sound,
                    charts: action.charts,
                    session: action.session,
                    description: action.description,
                }
            };
            return nextState || state;
        // Resolve event to fill user store data
        case STORE_SET_USER_FULL_DATA:
            nextState = {
                ...state,
                id: action.id,
                isLoggedIn: true,
                name: action.name,
                post: action.post,
                phone: action.phone,
                email: action.email,
                avatar: action.avatar,
                address: action.address,
                creation: action.creation,
                description: action.description,
            };
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
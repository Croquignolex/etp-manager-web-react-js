import * as actions from "./actions";

// Partial global store for users data management
const initialState = {
    list: [],
    unread: []
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set notifications data
        case actions.STORE_SET_NOTIFICATIONS_DATA:
            nextState = {...state, list: action.notifications};
            return nextState || state;
        // Resolve event to set notification data
        case actions.STORE_SET_UNREAD_NOTIFICATIONS_DATA:
            nextState = {...state, unread: action.notifications};
            return nextState || state;
        // Resolve event to set notification action data
        case actions.STORE_SET_NOTIFICATION_ACTION_DATA:
            nextState = {...state, list: state.list.map(notification => {
                    if(notification.id === action.id) {
                        notification.actionLoader = !notification.actionLoader;
                    }
                    return notification;
                }
            )};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
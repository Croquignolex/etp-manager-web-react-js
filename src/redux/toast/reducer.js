import UIfx from "uifx";
import mp3InfoFile from "../../assets/audio/info.mp3";
import mp3DangerFile from "../../assets/audio/danger.mp3";
import mp3WarningFile from "../../assets/audio/warning.mp3";
import mp3SuccessFile from "../../assets/audio/success.mp3";
import {DANGER, INFO, SUCCESS, WARNING} from "../../helpers/constants";
import {
    STORE_RESET_TOAST,
    STORE_SET_INFO_TOAST_DATA,
    STORE_SET_DANGER_TOAST_DATA,
    STORE_SET_WARNING_TOAST_DATA,
    STORE_SET_SUCCESS_TOAST_DATA,
} from "./actions";

// Sounds
const infoSound = new UIfx(mp3InfoFile, {volume: 1.0, throttleMs: 100});
const dangerSound = new UIfx(mp3DangerFile, {volume: 1.0, throttleMs: 100});
const warningSound = new UIfx(mp3WarningFile, {volume: 1.0, throttleMs: 100});
const successSound = new UIfx(mp3SuccessFile, {volume: 1.0, throttleMs: 100});

// Partial global store for error data management
const initialState = {
    delay: 0,
    icon: '',
    body: '',
    title: '',
    sound: {},
    show: false,
    headerClass: '',
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to reset toast store data
        case STORE_RESET_TOAST:
            nextState = {...state, ...initialState};
            return nextState || state;
        // Resolve event to set danger toast store data
        case STORE_SET_DANGER_TOAST_DATA:
            nextState = {...state,
                show: true,
                type: DANGER,
                delay: 10000,
                body: action.body,
                sound: dangerSound,
                title: action.title,
                headerClass: 'bg-danger',
                icon: 'fa fa-times-circle',
            };
            return nextState || state;
        // Resolve event to set warning toast store data
        case STORE_SET_WARNING_TOAST_DATA:
            nextState = {...state,
                show: true,
                delay: 8000,
                type: WARNING,
                body: action.body,
                title: action.title,
                sound: warningSound,
                headerClass: 'bg-warning',
                icon: 'fa fa-exclamation-circle',
            };
            return nextState || state;
        // Resolve event to set warning toast store data
        case STORE_SET_INFO_TOAST_DATA:
            nextState = {...state,
                show: true,
                type: INFO,
                delay: 7000,
                sound: infoSound,
                body: action.body,
                title: action.title,
                headerClass: 'bg-info',
                icon: 'fa fa-info-circle',
            };
            return nextState || state;
        // Resolve event to set warning toast store data
        case STORE_SET_SUCCESS_TOAST_DATA:
            nextState = {...state,
                show: true,
                delay: 6000,
                type: SUCCESS,
                body: action.body,
                title: action.title,
                sound: successSound,
                headerClass: 'bg-success',
                icon: 'fa fa-check-circle',
            };
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
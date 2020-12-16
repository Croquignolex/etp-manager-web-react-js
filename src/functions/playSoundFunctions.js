import UIfx from "uifx";

import mp3ErrorFile from "../assets/audio/error.mp3";
import mp3WarningFile from "../assets/audio/warning.mp3";
import mp3SuccessFile from "../assets/audio/success.mp3";
import {getLocaleStorageItem} from "./localStorageFunctions";
import {LOCAL_STORAGE_USER_SETTING} from "../constants/localStorageConstants";

export function playSuccessSound() {
    const successSound = new UIfx(mp3SuccessFile, {volume: 1.0, throttleMs: 100});
    try {
        const canPlay = getLocaleStorageItem(LOCAL_STORAGE_USER_SETTING).sound;
        canPlay && successSound.play();
    } catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}

export function playWarningSound() {
    const warningSound = new UIfx(mp3WarningFile, {volume: 1.0, throttleMs: 100});
    try {
        const canPlay = getLocaleStorageItem(LOCAL_STORAGE_USER_SETTING).sound;
        canPlay && warningSound.play();
    } catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}

export function playErrorSound() {
    const errorSound = new UIfx(mp3ErrorFile, {volume: 1.0, throttleMs: 100});
    try {
        const canPlay = getLocaleStorageItem(LOCAL_STORAGE_USER_SETTING).sound;
        canPlay && errorSound.play();
    } catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}
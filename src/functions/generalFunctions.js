import {APP_NAME} from "../constants/generalConstants";

export function setPageTitle(title) {
    document.title = `${title} - ${APP_NAME}`;
}
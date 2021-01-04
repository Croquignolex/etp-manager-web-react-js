import {CANCEL, DONE, PENDING, PROCESSING} from "../constants/typeConstants";

// Badge color for fleet type
export function fleetTypeBadgeColor(type) {
    switch (type) {
        case CANCEL: return {color: 'bg-danger-light', text: 'Annulée'};
        case DONE: return {color: 'bg-secondary-light', text: 'Effectuée'};
        case PENDING: return {color: 'bg-warning-light', text: 'En attente'};
        case PROCESSING: return {color: 'bg-primary-light', text: 'En cours'};
        default: return {color: 'default', text: 'Inconnu'};
    }
}
import {CANCEL, DONE, PENDING, PROCESSING} from "../constants/typeConstants";

// Badge color for fleet type
export function fleetTypeBadgeColor(type) {
    switch (type) {
        case CANCEL: return {background: 'bg-danger', border: 'border border-danger', text: 'ANNULEE'};
        case DONE: return {background: 'bg-secondary', border: 'border border-secondary', text: 'EFFECTUEE'};
        case PENDING: return {background: 'bg-warning', border: 'border border-warning', text: 'EN ATTENTE'};
        case PROCESSING: return {background: 'bg-primary', border: 'border border-primary', text: 'EN COURS'};
        default: return {background: 'bg-default', border: 'border border-default', text: 'INCONNU'};
    }
}
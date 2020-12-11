import UIfx from "uifx";
import axios from "axios";
import moment from 'moment';

import mp3ErrorFile from "../assets/audio/error.mp3";
import mp3WarningFile from "../assets/audio/warning.mp3";
import mp3SuccessFile from "../assets/audio/success.mp3";
import {
    DONE,
    ADMIN,
    AGENT,
    CANCEL,
    MANAGER,
    PENDING,
    UNKNOWN,
    APP_NAME,
    COLLECTOR,
    ADMIN_ROLE,
    PROCESSING,
    SUPERVISOR,
    AGENT_TYPE,
    USER_SCOPE,
    FLEET_TYPE,
    MASTER_TYPE,
    AGENT_SCOPE,
    MANAGER_ROLE,
    COMPANY_SCOPE,
    EVERYONE_ROLE,
    PROFILE_SCOPE,
    API_SERVER_URL,
    ETP_AGENT_TYPE,
    SIMS_PAGE_PATH,
    OPERATOR_SCOPE,
    CORPORATE_TYPE,
    COLLECTOR_ROLE,
    COLLECTOR_TYPE,
    ZONES_PAGE_PATH,
    COLLECTOR_SCOPE,
    USERS_PAGE_PATH,
    AGENTS_PAGE_PATH,
    PROFILE_PAGE_PATH,
    SIM_NEW_PAGE_PATH,
    LISTING_PAGE_PATH,
    SETTINGS_PAGE_PATH,
    ZONE_NEW_PAGE_PATH,
    USER_NEW_PAGE_PATH,
    ADMIN_MANAGER_ROLE,
    SIM_EDIT_PAGE_PATH,
    AGENT_NEW_PAGE_PATH,
    DASHBOARD_PAGE_PATH,
    ZONE_EDIT_PAGE_PATH,
    USER_EDIT_PAGE_PATH,
    OPERATORS_PAGE_PATH,
    COMPANIES_PAGE_PATH,
    COLLECTOR_AGENT_ROLE,
    AGENT_EDIT_PAGE_PATH,
    COLLECTORS_PAGE_PATH,
    COMPANY_NEW_PAGE_PATH,
    COMPANY_EDIT_PAGE_PATH,
    HANDING_OVER_PAGE_PATH,
    OPERATOR_NEW_PAGE_PATH,
    NOTIFICATIONS_PAGE_PATH,
    COLLECTOR_NEW_PAGE_PATH,
    OPERATOR_EDIT_PAGE_PATH,
    COLLECTOR_EDIT_PAGE_PATH,
    NETWORK_FLEETS_PAGE_PATH,
    LOCAL_STORAGE_USER_TOKEN,
    RECOVERIES_CASH_PAGE_PATH,
    REQUESTS_FLEETS_PAGE_PATH,
    LOCAL_STORAGE_USER_SETTING,
    COLLECTOR_FLEETS_PAGE_PATH,
    CHECKOUT_OUTLAYS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
    OPERATION_AFFORDS_PAGE_PATH,
    CHECKOUT_PAYMENTS_PAGE_PATH,
    ADMIN_MANAGER_COLLECTOR_ROLE,
    REQUESTS_FLEET_NEW_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE_PATH,
    REQUESTS_FLEET_EDIT_PAGE_PATH,
    OPERATIONS_TRANSFERS_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE_PATH,
    REQUESTS_CLEARANCE_NEW_PAGE_PATH,
    REQUESTS_CLEARANCE_EDIT_PAGE_PATH,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH,
} from "./constants";

// Request interceptor
axios.interceptors.request.use(config => {
    config.headers.ContentType = 'Application/json';
    config.headers.Authorization = 'Bearer ' + getLocaleStorageItem(LOCAL_STORAGE_USER_TOKEN);
    return config;
}, error => Promise.reject(error));

//
export function playSuccessSound() {
    const successSound = new UIfx(mp3SuccessFile, {volume: 1.0, throttleMs: 100});
    try {
        const canPlay = getLocaleStorageItem(LOCAL_STORAGE_USER_SETTING).sound;
        canPlay && successSound.play();
    } catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}

//
export function playWarningSound() {
    const warningSound = new UIfx(mp3WarningFile, {volume: 1.0, throttleMs: 100});
    try {
        const canPlay = getLocaleStorageItem(LOCAL_STORAGE_USER_SETTING).sound;
        canPlay && warningSound.play();
    } catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}

//
export function playErrorSound() {
    const errorSound = new UIfx(mp3ErrorFile, {volume: 1.0, throttleMs: 100});
    try {
        const canPlay = getLocaleStorageItem(LOCAL_STORAGE_USER_SETTING).sound;
        canPlay && errorSound.play();
    } catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}

//
export function getLocaleStorageItem(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

//
export function setLocaleStorageItem(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
}

//
export function removeLocaleStorageItem(key) {
    localStorage.removeItem(key);
}

//
export function removeAllLocaleStorageItems() {
    localStorage.clear();
}

//
export function getPageTitle(title) {
    return `${title} - ${APP_NAME}`
}

//
export function getFieldColor(field) {
    return {color: (field.isValid ? '#22252a' : '#e22529')}
}

//
export function needleSearch(set, needle) {
    if(set !== null && set !== '' && set !== undefined && set) {
        return set.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    }
    return false;
}

//
export function dateToString(date) {
    return date && moment(date).format('DD/MM/YYYY HH:mm');
}

//
export function formatString(text, maxCharacters) {
    // Extract
    try {
        if(text.length > maxCharacters) return text.substring(0, maxCharacters) + '...';
    } catch (e) {
        if(process.env.NODE_ENV !== 'production') console.log({e});
    }
    return text;
}

//
export function formatNumber(number) {
    // Extract
    try {
        if(number.toString().length > 3)
            return new Intl.NumberFormat('en-EN', {
                style: 'decimal',
            }).format(number)
    } catch (e) {
        if(process.env.NODE_ENV !== 'production') console.log({e});
    }
    return number;
}

//
export function getImageFromServer(image, scope) {
    const defaultImage = (scope === PROFILE_SCOPE)
        ? require('../assets/images/default.jpg')
        : require('../assets/images/no-image.jpg');

    return (image === null)
        ? defaultImage
        : `${API_SERVER_URL}/storage/${image}`;
}

//
export function groupArrayBy(list, keyGetter) {
    const map = new Map();
    let returnedData = [];
    // Map key => value
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    // Convert into array
    map.forEach(item => returnedData.push(item));
    return returnedData;
}

//
export function sortByCreationDate(array) {
    return array.sort((a, b) => {
        if(a.creation < b.creation) return 1;
        if(a.creation > b.creation) return -1;
        return 0;
    });
}

//
export function simTypeBadgeColor(type) {
    switch (type) {
        case AGENT_TYPE: return 'primary';
        case FLEET_TYPE: return 'warning';
        case MASTER_TYPE: return 'danger';
        case ETP_AGENT_TYPE: return 'info';
        case COLLECTOR_TYPE: return 'success';
        case CORPORATE_TYPE: return 'secondary';
        default: return 'default';
    }
}

//
export function fleetTypeBadgeColor(type) {
    switch (type) {
        case CANCEL: return {color: 'danger', text: 'Annulée'};
        case DONE: return {color: 'success', text: 'Effectuée'};
        case PENDING: return {color: 'warning', text: 'En attente'};
        case PROCESSING: return {color: 'primary', text: 'En cours'};
        default: return {color: 'default', text: 'Inconnu'};
    }
}

//
export function roleBadgeColor(role) {
    switch (role) {
        case ADMIN: return 'danger';
        case AGENT: return 'warning';
        case COLLECTOR: return 'info';
        case MANAGER: return 'success';
        case SUPERVISOR: return 'primary';
        default: return 'default';
    }
}

//
export function dataToArrayForSelect(data) {
    let returnNedArray = [];
    data.forEach((_data) => {
        returnNedArray.push({
            label: _data.name,
            value: _data.id
        })
    });
    return returnNedArray;
}

//
export function apiGetRequest(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                const apiResponse = res.data;
                apiResponse.status
                    ? resolve(apiResponse.data)
                    : reject(JSON.stringify(apiResponse.message));
            })
            .catch(e => {
                reject("Erreur l'ors de l'excution de la requête");
                if(process.env.NODE_ENV !== 'production') console.log({e});
            })
    });
}

//
export function apiPostRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                const apiResponse = res.data;
                apiResponse.status
                    ? resolve(apiResponse.data)
                    : reject(JSON.stringify(apiResponse.message));
            })
            .catch(e => {
                reject("Erreur l'ors de l'excution de la requête");
                if(process.env.NODE_ENV !== 'production') console.log({e});
            })
    });
}

//
export function extractGoogleMapUrl(googleMapTag) {
    return googleMapTag ? googleMapTag.split(`src="`).pop().split(`" width`)[0] : '';
}

//
export function processingRequest(scope, requests) {
    const request = requests.find(item => item.scope === scope);
    return request ? (!request.failed && request.loading) : false;
}

//
export function succeededRequest(scope, requests) {
    const request = requests.find(item => item.scope === scope);
    return request ? (!request.failed && !request.loading) : false;
}

//
export function shouldShowError(scope, errors) {
    const error = errors.find(item => item.scope === scope);
    return error ? error.show : false;
}

//
export function mappedSims(sims) {
    let returnedMappedSims = [];
    sims.forEach(sim => returnedMappedSims.push({
        id: sim.id,
        name: `${sim.name} (${sim.number})`
    }));
    return returnedMappedSims;
}

//
export function mappedZones(zones) {
    let returnedMappedZones = [];
    zones.forEach(zone => returnedMappedZones.push({
        id: zone.id,
        name: zone.reference
            ? `${zone.name} (${zone.reference})`
            : zone.name
    }));
    return returnedMappedZones;
}


//
export function mappedAmounts(items) {
    let returnedMappedAmount = [];
    items.forEach(item => (parseInt(item.remaining) > 0) && returnedMappedAmount.push({
        name: `${formatNumber(item.remaining)} sur ${formatNumber(item.amount)} (${item.sim_incoming.number})`,
        id: item.id
    }));
    return returnedMappedAmount;
}

//
export function extractDataInPartialRedux(scope, partialRedux) {
    switch (scope) {
        case USER_SCOPE: return partialRedux.users.current;
        case AGENT_SCOPE: return partialRedux.agents.current;
        case COMPANY_SCOPE: return partialRedux.companies.current;
        case OPERATOR_SCOPE: return partialRedux.operators.current;
        case COLLECTOR_SCOPE: return partialRedux.collectors.current;
        default: return (partialRedux.user || {sims: []});
    }
}

//
export function fleetsByTypeChartData(fleets) {
    // Data
    const data = [];
    const labels = [];
    const backgroundColor = [];
    // Proceed
    const groupedFleets = groupArrayBy(fleets, fleet => fleet.status);
    groupedFleets.forEach(fleetGroup => {
        let statusChartData;
        switch (fleetGroup[0].status) {
            case CANCEL: statusChartData = {label: 'Annulée', background: '#dd4b39'}; break;
            case DONE: statusChartData = {label: 'Effectuée', background: '#008d4c'}; break;
            case PENDING: statusChartData = {label: 'En attente', background: '#e08e0b'}; break;
            case PROCESSING: statusChartData = {label: 'En cours', background: '#00acd6'}; break;
            default: statusChartData = {label: UNKNOWN, background: '#ffffff'};
        }
        data.push(fleetGroup.length);
        labels.push(statusChartData.label);
        backgroundColor.push(statusChartData.background);
    });
    // Return
    return {data, labels, backgroundColor}
}

//
export function extractFleetData(apiSim, apiUser, apiAgent, apiClaimer, apiFleet, apiSupplies) {
    let fleet = {
        id: '', reference: '', amount: '', status: '', creation: '',

        sim: {id: '', name: '', number: ''},
        claimant: {id: '', name: '', phone: ''},
        agent: {id: '', name: '', reference: ''},

        supplies: []
    };
    if(apiAgent && apiUser) {
        fleet.agent = {
            name: apiUser.name,
            id: apiAgent.id.toString(),
            reference: apiAgent.reference,
        };
    }
    if(apiSim) {
        fleet.sim = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiClaimer) {
        fleet.claimant = {
            name: apiClaimer.name,
            phone: apiClaimer.phone,
            id: apiClaimer.id.toString(),
        }
    }
    if(apiFleet) {
        fleet.actionLoader = false;
        fleet.status = apiFleet.statut;
        fleet.amount = apiFleet.montant;
        fleet.remaining = apiFleet.reste;
        fleet.id = apiFleet.id.toString();
        fleet.creation = apiFleet.created_at;
        fleet.reference = apiFleet.reference;
    }
    if(apiSupplies) {
        apiSupplies.forEach(data => {
            fleet.supplies.push({
                amount: data.montant,
                id: data.id.toString(),
                reference: data.reference,
                creation: data.created_at,
            })
        });
        sortByCreationDate(fleet.supplies);
    }
    return fleet;
}

//
export function extractFleetsData(apiFleets) {
    const fleets = [];
    apiFleets.forEach(data => {
        fleets.push(extractFleetData(
            data.puce,
            data.user,
            data.agent,
            data.demandeur,
            data.demande
        ));
    });
    sortByCreationDate(fleets);
    return fleets;
}

//
export function accessRequiredRoles(currentPath, role) {
    let requiredRole;
    // Pluck required roles
    switch (currentPath) {
        case SIMS_PAGE_PATH:
            requiredRole = ADMIN_MANAGER_ROLE; break;

        case AGENTS_PAGE_PATH:
        case AGENT_NEW_PAGE_PATH:
        case AGENT_EDIT_PAGE_PATH:
        case OPERATION_AFFORDS_PAGE_PATH:
        case OPERATIONS_TRANSFERS_PAGE_PATH:
        case OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH:
            requiredRole = ADMIN_MANAGER_COLLECTOR_ROLE; break;

        case HANDING_OVER_PAGE_PATH:
        case CHECKOUT_OUTLAYS_PAGE_PATH:
        case CHECKOUT_PAYMENTS_PAGE_PATH:
            requiredRole = MANAGER_ROLE; break;

        case NETWORK_FLEETS_PAGE_PATH:
            requiredRole = COLLECTOR_ROLE; break;

        case REQUESTS_FLEET_NEW_PAGE_PATH:
        case REQUESTS_CLEARANCE_NEW_PAGE_PATH:
        case REQUESTS_CLEARANCE_EDIT_PAGE_PATH:
            requiredRole = COLLECTOR_AGENT_ROLE; break;

        case PROFILE_PAGE_PATH:
        case SETTINGS_PAGE_PATH:
        case DASHBOARD_PAGE_PATH:
        case NOTIFICATIONS_PAGE_PATH:
        case RECOVERIES_CASH_PAGE_PATH:
        case REQUESTS_FLEETS_PAGE_PATH:
        case OPERATIONS_FLEETS_PAGE_PATH:
        case RECOVERIES_FLEETS_PAGE_PATH:
        case REQUESTS_CLEARANCES_PAGE_PATH:
        case REQUESTS_FLEET_EDIT_PAGE_PATH:
        case OPERATIONS_CLEARANCES_PAGE_PATH:
            requiredRole = EVERYONE_ROLE; break;

        case USERS_PAGE_PATH:
        case ZONES_PAGE_PATH:
        case SIM_NEW_PAGE_PATH:
        case LISTING_PAGE_PATH:
        case ZONE_NEW_PAGE_PATH:
        case SIM_EDIT_PAGE_PATH:
        case USER_NEW_PAGE_PATH:
        case ZONE_EDIT_PAGE_PATH:
        case USER_EDIT_PAGE_PATH:
        case OPERATORS_PAGE_PATH:
        case COMPANIES_PAGE_PATH:
        case COLLECTORS_PAGE_PATH:
        case COMPANY_NEW_PAGE_PATH:
        case COMPANY_EDIT_PAGE_PATH:
        case OPERATOR_NEW_PAGE_PATH:
        case COLLECTOR_NEW_PAGE_PATH:
        case OPERATOR_EDIT_PAGE_PATH:
        case COLLECTOR_EDIT_PAGE_PATH:
        case COLLECTOR_FLEETS_PAGE_PATH:
            requiredRole = ADMIN_ROLE; break;

        default: requiredRole = [];
    }

    return requiredRole.includes(role);
}


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
/*export function simTypeBadgeColor(type) {
    switch (type) {
        case AGENT_TYPE: return 'primary';
        case FLEET_TYPE: return 'warning';
        case MASTER_TYPE: return 'danger';
        case ETP_AGENT_TYPE: return 'info';
        case COLLECTOR_TYPE: return 'success';
        case CORPORATE_TYPE: return 'secondary';
        default: return 'default';
    }
}*/

//
/*
export function fleetTypeBadgeColor(type) {
    switch (type) {
        case CANCEL: return {color: 'danger', text: 'Annulée'};
        case DONE: return {color: 'success', text: 'Effectuée'};
        case PENDING: return {color: 'warning', text: 'En attente'};
        case PROCESSING: return {color: 'primary', text: 'En cours'};
        default: return {color: 'default', text: 'Inconnu'};
    }
}
*/

//
/*
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
*/

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
/*
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
*/

//
/*export function fleetsByTypeChartData(fleets) {
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
}*/

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

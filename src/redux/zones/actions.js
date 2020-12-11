// Reducer action types
export const STORE_SET_ZONE_DATA = 'STORE_SET_ZONE_DATA';
export const STORE_SET_ZONES_DATA = 'STORE_SET_ZONES_DATA';
export const STORE_SET_ZONE_ACTION_DATA = 'STORE_SET_ZONE_ACTION_DATA';
export const STORE_SET_ZONE_AGENTS_ACTION_DATA = 'STORE_SET_ZONE_AGENTS_ACTION_DATA';
export const STORE_SET_ZONE_COLLECTORS_ACTION_DATA = 'STORE_SET_ZONE_COLLECTORS_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_ZONE = 'EMIT_NEW_ZONE';
export const EMIT_ZONE_FETCH = 'EMIT_ZONE_FETCH';
export const EMIT_UPDATE_ZONE = 'EMIT_UPDATE_ZONE';
export const EMIT_ZONES_FETCH = 'EMIT_ZONES_FETCH';
export const EMIT_ZONE_DELETE = 'EMIT_ZONE_DELETE';
export const EMIT_ADD_ZONE_AGENTS = 'EMIT_ADD_ZONE_AGENTS';
export const EMIT_REMOVE_ZONE_AGENTS = 'EMIT_REMOVE_ZONE_AGENTS';
export const EMIT_ADD_ZONE_COLLECTORS = 'EMIT_ADD_ZONE_COLLECTORS';
export const EMIT_REMOVE_ZONE_COLLECTORS = 'EMIT_REMOVE_ZONE_COLLECTORS';

//====================== Reducer trigger actions
// Set zones data in store
export const storeSetZonesData = ({zones}) => ({
    zones,
    type: STORE_SET_ZONES_DATA
});

// Set operator data in store
export const storeSetZoneData = ({zone}) => ({
    zone,
    type: STORE_SET_ZONE_DATA
});

// Set zone agents action data in store
export const storeSetZoneAgentsActionData = ({agent}) => ({
    agent,
    type: STORE_SET_ZONE_AGENTS_ACTION_DATA
});

// Set zone collectors action data in store
export const storeSetZoneCollectorsActionData = ({collector}) => ({
    collector,
    type: STORE_SET_ZONE_COLLECTORS_ACTION_DATA
});

// Set zone action data in store
export const storeSetZoneActionData = ({id}) => ({
    id,
    type: STORE_SET_ZONE_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit zones fetch
export const emitZonesFetch = () => ({
    type: EMIT_ZONES_FETCH
});

// Emit operator fetch by id
export const emitZoneFetch = ({id}) => ({
    id,
    type: EMIT_ZONE_FETCH
});

// Emit new operator
export const emitNewZone = ({name, map, reference, description}) => ({
    map,
    name,
    reference,
    description,
    type: EMIT_NEW_ZONE
});

// Emit remove zone agents
export const emitRemoveZoneAgents = ({id, agent}) => ({
    id,
    agent,
    type: EMIT_REMOVE_ZONE_AGENTS
});

// Emit remove zone collectors
export const emitRemoveZoneCollectors = ({id, collector}) => ({
    id,
    collector,
    type: EMIT_REMOVE_ZONE_COLLECTORS
});

// Emit add zone collectors
export const emitAddZoneCollectors = ({id, name, address, phone,
                                          email, password,  description}) => ({
    id,
    name,
    phone,
    email,
    address,
    password,
    description,
    type: EMIT_ADD_ZONE_COLLECTORS
});

// Emit add zone agents
export const emitAddZoneAgents = ({id, name, address, phone, reference, email,
                                      town, country, password, description,
                                      backIDCard, frontIDCard, document}) => ({
    id,
    name,
    town,
    phone,
    email,
    address,
    country,
    password,
    document,
    reference,
    backIDCard,
    frontIDCard,
    description,
    type: EMIT_ADD_ZONE_AGENTS
});

// Emit update operator
export const emitUpdateZone = ({id, name, map, reference, description}) => ({
    id,
    map,
    name,
    reference,
    description,
    type: EMIT_UPDATE_ZONE
});

// Emit operator delete by id
export const emitZoneDelete = ({id}) => ({
    id,
    type: EMIT_ZONE_DELETE
});

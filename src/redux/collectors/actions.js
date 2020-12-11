// Reducer action types
export const STORE_SET_COLLECTOR_DATA = 'STORE_SET_COLLECTOR_DATA';
export const STORE_SET_COLLECTORS_DATA = 'STORE_SET_COLLECTORS_DATA';
export const STORE_SET_COLLECTOR_ACTION_DATA = 'STORE_SET_COLLECTOR_ACTION_DATA';
export const STORE_SET_COLLECTOR_TOGGLE_DATA = 'STORE_SET_COLLECTOR_TOGGLE_DATA';
export const STORE_SET_COLLECTOR_SIMS_ACTION_DATA = 'STORE_SET_COLLECTOR_SIMS_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_COLLECTOR = 'EMIT_NEW_COLLECTOR';
export const EMIT_COLLECTOR_FETCH = 'EMIT_COLLECTOR_FETCH';
export const EMIT_UPDATE_COLLECTOR = 'EMIT_UPDATE_COLLECTOR';
export const EMIT_COLLECTORS_FETCH = 'EMIT_COLLECTORS_FETCH';
export const EMIT_COLLECTOR_DELETE = 'EMIT_COLLECTOR_DELETE';
export const EMIT_ADD_COLLECTOR_SIMS = 'EMIT_ADD_COLLECTOR_SIMS';
export const EMIT_REMOVE_COLLECTOR_SIMS = 'EMIT_REMOVE_COLLECTOR_SIMS';
export const EMIT_UPDATE_COLLECTOR_ZONE = 'EMIT_UPDATE_COLLECTOR_ZONE';
export const EMIT_TOGGLE_COLLECTOR_STATUS = 'EMIT_TOGGLE_COLLECTOR_STATUS';

//====================== Reducer trigger actions
// Set collectors data in store
export const storeSetCollectorsData = ({collectors}) => ({
    collectors,
    type: STORE_SET_COLLECTORS_DATA
});

// Set collector data in store
export const storeSetCollectorData = ({collector}) => ({
    collector,
    type: STORE_SET_COLLECTOR_DATA
});

// Set collector action data in store
export const storeSetCollectorActionData = ({id}) => ({
    id,
    type: STORE_SET_COLLECTOR_ACTION_DATA
});

// Set collector sims action data in store
export const storeSetCollectorSimsActionData = ({sim}) => ({
    sim,
    type: STORE_SET_COLLECTOR_SIMS_ACTION_DATA
});

// Set collector toggle data in store
export const storeSetCollectorToggleData = ({id}) => ({
    id,
    type: STORE_SET_COLLECTOR_TOGGLE_DATA
});

//====================== Middleware trigger actions
// Emit collectors fetch
export const emitCollectorsFetch = () => ({
    type: EMIT_COLLECTORS_FETCH
});

// Emit collector fetch by id
export const emitCollectorFetch = ({id}) => ({
    id,
    type: EMIT_COLLECTOR_FETCH
});

// Emit new collector
export const emitNewCollector = ({name, address, phone, zone,
                                     email, password,  description}) => ({
    name,
    zone,
    phone,
    email,
    address,
    password,
    description,
    type: EMIT_NEW_COLLECTOR
});

// Emit add collector sims
export const emitAddCollectorSims = ({id, name, reference, number, description, operator}) => ({
    id,
    name,
    number,
    operator,
    reference,
    description,
    type: EMIT_ADD_COLLECTOR_SIMS
});

// Emit remove collector sims
export const emitRemoveCollectorSims = ({id, sim}) => ({
    id,
    sim,
    type: EMIT_REMOVE_COLLECTOR_SIMS
});

// Emit update collector
export const emitUpdateCollector = ({id, name, address, email, description}) => ({
    id,
    name,
    email,
    address,
    description,
    type: EMIT_UPDATE_COLLECTOR
});

// Emit update collector zone
export const emitUpdateCollectorZone = ({id, zone}) => ({
    id,
    zone,
    type: EMIT_UPDATE_COLLECTOR_ZONE
});

// Emit toggle collector status
export const emitToggleCollectorStatus = ({id}) => ({
    id,
    type: EMIT_TOGGLE_COLLECTOR_STATUS
});

// Emit collector delete by id
export const emitCollectorDelete = ({id}) => ({
    id,
    type: EMIT_COLLECTOR_DELETE
});
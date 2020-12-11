// Reducer action types

export const STORE_SET_AGENT_DATA = 'STORE_SET_AGENT_DATA';
export const STORE_SET_AGENTS_DATA = 'STORE_SET_AGENTS_DATA';
export const STORE_SET_AGENT_ACTION_DATA = 'STORE_SET_AGENT_ACTION_DATA';
export const STORE_SET_AGENT_TOGGLE_DATA = 'STORE_SET_AGENT_TOGGLE_DATA';
export const STORE_SET_AGENT_SIMS_ACTION_DATA = 'STORE_SET_AGENT_SIMS_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_AGENT = 'EMIT_NEW_AGENT';
export const EMIT_AGENT_FETCH = 'EMIT_AGENT_FETCH';
export const EMIT_UPDATE_AGENT = 'EMIT_UPDATE_AGENT';
export const EMIT_AGENTS_FETCH = 'EMIT_AGENTS_FETCH';
export const EMIT_AGENT_DELETE = 'EMIT_AGENT_DELETE';
export const EMIT_ADD_AGENT_SIMS = 'EMIT_ADD_AGENT_SIMS';
export const EMIT_UPDATE_AGENT_CNI = 'EMIT_UPDATE_AGENT_CNI';
export const EMIT_UPDATE_AGENT_FILE = 'EMIT_UPDATE_AGENT_FILE';
export const EMIT_REMOVE_AGENT_SIMS = 'EMIT_REMOVE_AGENT_SIMS';
export const EMIT_UPDATE_AGENT_ZONE = 'EMIT_UPDATE_AGENT_ZONE';
export const EMIT_TOGGLE_AGENT_STATUS = 'EMIT_TOGGLE_AGENT_STATUS';

//====================== Reducer trigger actions
// Set agents data in store
export const storeSetAgentsData = ({agents}) => ({
    agents,
    type: STORE_SET_AGENTS_DATA
});

// Set agent data in store
export const storeSetAgentData = ({agent}) => ({
    agent,
    type: STORE_SET_AGENT_DATA
});

// Set agent action data in store
export const storeSetAgentActionData = ({id}) => ({
    id,
    type: STORE_SET_AGENT_ACTION_DATA
});

// Set agent sims action data in store
export const storeSetAgentSimsActionData = ({sim}) => ({
    sim,
    type: STORE_SET_AGENT_SIMS_ACTION_DATA
});

// Set agent toggle data in store
export const storeSetAgentToggleData = ({id}) => ({
    id,
    type: STORE_SET_AGENT_TOGGLE_DATA
});

//====================== Middleware trigger actions
// Emit agents fetch
export const emitAgentsFetch = () => ({
    type: EMIT_AGENTS_FETCH
});

// Emit agent fetch by id
export const emitAgentFetch = ({id}) => ({
    id,
    type: EMIT_AGENT_FETCH
});

// Emit new agent
export const emitNewAgent = ({name, address, phone, zone, reference, town,
                                 country, email, password,  description,
                                 backIDCard, frontIDCard, document}) => ({
    name,
    zone,
    town,
    phone,
    email,
    country,
    address,
    document,
    password,
    reference,
    backIDCard,
    frontIDCard,
    description,
    type: EMIT_NEW_AGENT
});

// Emit add agent sims
export const emitAddAgentSims = ({id, simType, name, reference,
                                     number, description, operator}) => ({
    id,
    name,
    number,
    simType,
    operator,
    reference,
    description,
    type: EMIT_ADD_AGENT_SIMS
});

// Emit remove agent sims
export const emitRemoveAgentSims = ({id, sim}) => ({
    id,
    sim,
    type: EMIT_REMOVE_AGENT_SIMS
});

// Emit update agent
export const emitUpdateAgent = ({id, town, country, reference, email,
                                    name, address, description}) => ({
    id,
    name,
    town,
    email,
    country,
    address,
    reference,
    description,
    type: EMIT_UPDATE_AGENT
});

// Emit update agent CNI
export const emitUpdateAgentCNI = ({id, frontIDCard, backIDCard}) => ({
    id,
    backIDCard,
    frontIDCard,
    type: EMIT_UPDATE_AGENT_CNI
});

// Emit update agent File
export const emitUpdateAgentFile = ({id, document}) => ({
    id,
    document,
    type: EMIT_UPDATE_AGENT_FILE
});

// Emit update agent zone
export const emitUpdateAgentZone = ({id, zone}) => ({
    id,
    zone,
    type: EMIT_UPDATE_AGENT_ZONE
});

// Emit toggle agent status
export const emitToggleAgentStatus = ({id}) => ({
    id,
    type: EMIT_TOGGLE_AGENT_STATUS
});


// Emit agent delete by id
export const emitAgentDelete = ({id}) => ({
    id,
    type: EMIT_AGENT_DELETE
});

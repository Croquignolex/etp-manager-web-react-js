// Reducer action types
export const STORE_SET_SIM_DATA = 'STORE_SET_SIM_DATA';
export const STORE_SET_SIMS_DATA = 'STORE_SET_SIMS_DATA';
export const STORE_SET_SIM_ACTION_DATA = 'STORE_SET_SIM_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_SIM = 'EMIT_NEW_SIM';
export const EMIT_SIM_FETCH = 'EMIT_SIM_FETCH';
export const EMIT_UPDATE_SIM = 'EMIT_UPDATE_SIM';
export const EMIT_SIMS_FETCH = 'EMIT_SIMS_FETCH';
export const EMIT_SIM_DELETE = 'EMIT_SIM_DELETE';
export const EMIT_UPDATE_SIM_AGENT = 'EMIT_UPDATE_SIM_AGENT';
export const EMIT_UPDATE_SIM_OPERATOR = 'EMIT_UPDATE_SIM_OPERATOR';
export const EMIT_UPDATE_COMPANY_AGENT = 'EMIT_UPDATE_COMPANY_AGENT';

//====================== Reducer trigger actions
// Set sims data in store
export const storeSetSimsData = ({sims}) => ({
    sims,
    type: STORE_SET_SIMS_DATA
});

// Set sim data in store
export const storeSetSimData = ({sim}) => ({
    sim,
    type: STORE_SET_SIM_DATA
});

// Set sim action data in store
export const storeSetSimActionData = ({id}) => ({
    id,
    type: STORE_SET_SIM_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit sims fetch
export const emitSimsFetch = () => ({
    type: EMIT_SIMS_FETCH
});

// Emit sim fetch by id
export const emitSimFetch = ({id}) => ({
    id,
    type: EMIT_SIM_FETCH
});

// Emit new sim
export const emitNewSim = ({name, simType, number, operator, agent,
                               reference, description, company, collector}) => ({
    name,
    agent,
    number,
    company,
    simType,
    operator,
    reference,
    collector,
    description,
    type: EMIT_NEW_SIM
});

// Emit update sim
export const emitUpdateSim = ({id, name, reference, description}) => ({
    id,
    name,
    reference,
    description,
    type: EMIT_UPDATE_SIM
});

// Emit update sim operator
export const emitUpdateSimOperator = ({id, operator}) => ({
    id,
    operator,
    type: EMIT_UPDATE_SIM_OPERATOR
});

// Emit update sim agent
export const emitUpdateSimAgent = ({id, agent}) => ({
    id,
    agent,
    type: EMIT_UPDATE_SIM_AGENT
});

// Emit update company agent
export const emitUpdateCompanyAgent = ({id, company}) => ({
    id,
    company,
    type: EMIT_UPDATE_COMPANY_AGENT
});

// Emit sim delete by id
export const emitSimDelete = ({id}) => ({
    id,
    type: EMIT_SIM_DELETE
});

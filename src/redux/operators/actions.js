// Reducer action types
export const STORE_SET_OPERATOR_DATA = 'STORE_SET_OPERATOR_DATA';
export const STORE_SET_OPERATORS_DATA = 'STORE_SET_OPERATORS_DATA';
export const STORE_SET_OPERATOR_ACTION_DATA = 'STORE_SET_OPERATOR_ACTION_DATA';
export const STORE_SET_OPERATOR_SIMS_ACTION_DATA = 'STORE_SET_OPERATOR_SIMS_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_OPERATOR = 'EMIT_NEW_OPERATOR';
export const EMIT_OPERATOR_FETCH = 'EMIT_OPERATOR_FETCH';
export const EMIT_UPDATE_OPERATOR = 'EMIT_UPDATE_OPERATOR';
export const EMIT_OPERATORS_FETCH = 'EMIT_OPERATORS_FETCH';
export const EMIT_OPERATOR_DELETE = 'EMIT_OPERATOR_DELETE';
export const EMIT_ADD_OPERATOR_SIMS = 'EMIT_ADD_OPERATOR_SIMS';
export const EMIT_REMOVE_OPERATOR_SIMS = 'EMIT_REMOVE_OPERATOR_SIMS';

//====================== Reducer trigger actions
// Set operators data in store
export const storeSetOperatorsData = ({operators}) => ({
    operators,
    type: STORE_SET_OPERATORS_DATA
});

// Set operator data in store
export const storeSetOperatorData = ({operator}) => ({
    operator,
    type: STORE_SET_OPERATOR_DATA
});

// Set operator sims action data in store
export const storeSetOperatorSimsActionData = ({sim}) => ({
    sim,
    type: STORE_SET_OPERATOR_SIMS_ACTION_DATA
});

// Set operator action data in store
export const storeSetOperatorActionData = ({id}) => ({
    id,
    type: STORE_SET_OPERATOR_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit operators fetch
export const emitOperatorsFetch = () => ({
    type: EMIT_OPERATORS_FETCH
});

// Emit operator fetch by id
export const emitOperatorFetch = ({id}) => ({
    id,
    type: EMIT_OPERATOR_FETCH
});

// Emit new operator
export const emitNewOperator = ({name, description}) => ({
    name,
    description,
    type: EMIT_NEW_OPERATOR
});

// Emit add operator sims
export const emitAddOperatorSims = ({id, simType, name, reference,
                                        number, description, agent, company}) => ({
    id,
    name,
    agent,
    number,
    simType,
    company,
    reference,
    description,
    type: EMIT_ADD_OPERATOR_SIMS
});

// Emit remove operator sims
export const emitRemoveOperatorSims = ({id, sim}) => ({
    id,
    sim,
    type: EMIT_REMOVE_OPERATOR_SIMS
});

// Emit update operator
export const emitUpdateOperator = ({id, name, description}) => ({
    id,
    name,
    description,
    type: EMIT_UPDATE_OPERATOR
});

// Emit operator delete by id
export const emitOperatorDelete = ({id}) => ({
    id,
    type: EMIT_OPERATOR_DELETE
});

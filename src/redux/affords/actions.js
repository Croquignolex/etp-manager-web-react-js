// Reducer action types
export const STORE_SET_REFUELS_DATA = 'STORE_SET_REFUELS_DATA';
export const STORE_UPDATE_REFUEL_DATA = 'STORE_UPDATE_REFUEL_DATA';
export const STORE_SET_NEW_REFUEL_DATA = 'STORE_SET_NEW_REFUEL_DATA';
export const STORE_SET_NEXT_REFUELS_DATA = 'STORE_SET_NEXT_REFUELS_DATA';
export const STORE_SET_REFUEL_ACTION_DATA = 'STORE_SET_REFUEL_ACTION_DATA';
export const STORE_STOP_INFINITE_SCROLL_REFUEL_DATA = 'STORE_STOP_INFINITE_SCROLL_REFUEL_DATA';

// Middleware action types
export const EMIT_ADD_REFUEL = 'EMIT_ADD_REFUEL';
export const EMIT_REFUELS_FETCH = 'EMIT_REFUELS_FETCH';
export const EMIT_CONFIRM_REFUEL = 'EMIT_CONFIRM_REFUEL';
export const EMIT_NEXT_REFUELS_FETCH = 'EMIT_NEXT_REFUELS_FETCH';

//====================== Reducer trigger actions
// Set refuels data in store
export const storeSetRefuelsData = ({refuels, hasMoreData, page}) => ({
    page,
    refuels,
    hasMoreData,
    type: STORE_SET_REFUELS_DATA
});

// Set new refuel data in store
export const storeSetNewRefuelData = ({refuel}) => ({
    refuel,
    type: STORE_SET_NEW_REFUEL_DATA
});

// Set next refuels data in store
export const storeSetNextRefuelsData = ({refuels, hasMoreData, page}) => ({
    page,
    refuels,
    hasMoreData,
    type: STORE_SET_NEXT_REFUELS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollRefuelData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_REFUEL_DATA
});

// Set update refuel data in store
export const storeUpdateRefuelData = ({id, amount}) => ({
    id,
    amount,
    type: STORE_UPDATE_REFUEL_DATA
});

// Set refuel action data in store
export const storeSetRefuelActionData = ({id}) => ({
    id,
    type: STORE_SET_REFUEL_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit refuels fetch
export const emitRefuelsFetch = () => ({
    type: EMIT_REFUELS_FETCH
});

// Emit next refuels fetch
export const emitNextRefuelsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_REFUELS_FETCH
});

// Emit confirm refuel
export const emitConfirmRefuel = ({id}) => ({
    id,
    type: EMIT_CONFIRM_REFUEL
});

// Emit add refuel
export const emitAddRefuel = ({agent, amount, sim, receipt}) => ({
    sim,
    agent,
    amount,
    receipt,
    type: EMIT_ADD_REFUEL
});

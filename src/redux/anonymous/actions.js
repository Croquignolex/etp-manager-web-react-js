// Reducer action types
export const STORE_SET_ANONYMOUS_FLEET_DATA = 'STORE_SET_ANONYMOUS_FLEET_DATA';
export const STORE_SET_ANONYMOUS_FLEETS_DATA = 'STORE_SET_ANONYMOUS_FLEETS_DATA';

// Middleware action types
export const EMIT_NEW_ANONYMOUS_FLEET = 'EMIT_NEW_ANONYMOUS_FLEET';
export const EMIT_ANONYMOUS_FLEET_FETCH = 'EMIT_ANONYMOUS_FLEET_FETCH';

//====================== Reducer trigger actions
// Set anonymous fleets data in store
export const storeSetAnonymousFleetsData = ({anonymousFleets}) => ({
    anonymousFleets,
    type: STORE_SET_ANONYMOUS_FLEETS_DATA
});

// Set anonymous fleet data in store
export const storeSetAnonymousFleetData = ({anonymousFleet}) => ({
    anonymousFleet,
    type: STORE_SET_ANONYMOUS_FLEET_DATA
});

//====================== Middleware trigger actions
// Emit anonymous fleets fetch
export const emitAnonymousFleetsFetch = () => ({
    type: EMIT_ANONYMOUS_FLEET_FETCH
});

// Emit new anonymous fleet
export const emitNewAnonymousFleet = ({sim, amount, receiver, receiverSim}) => ({
    sim,
    amount,
    receiver,
    receiverSim,
    type: EMIT_NEW_ANONYMOUS_FLEET
});

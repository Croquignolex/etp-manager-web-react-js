// Reducer action types
export const STORE_SET_PAYMENTS_DATA = 'STORE_SET_PAYMENTS_DATA';
export const STORE_SET_NEW_PAYMENT_DATA = 'STORE_SET_NEW_PAYMENT_DATA';
export const STORE_SET_NEXT_PAYMENTS_DATA = 'STORE_SET_NEXT_PAYMENTS_DATA';
export const STORE_STOP_INFINITE_SCROLL_PAYMENT_DATA = 'STORE_STOP_INFINITE_SCROLL_PAYMENT_DATA';

// Middleware action types
export const EMIT_ADD_PAYMENT = 'EMIT_ADD_PAYMENT';
export const EMIT_PAYMENTS_FETCH = 'EMIT_PAYMENTS_FETCH';
export const EMIT_NEXT_PAYMENTS_FETCH = 'EMIT_NEXT_PAYMENTS_FETCH';

//====================== Reducer trigger actions
// Set payments data in store
export const storeSetPaymentsData = ({payments, hasMoreData, page}) => ({
    page,
    payments,
    hasMoreData,
    type: STORE_SET_PAYMENTS_DATA
});

// Set new payment data in store
export const storeSetNewPaymentData = ({payment}) => ({
    payment,
    type: STORE_SET_NEW_PAYMENT_DATA
});

// Set next payments data in store
export const storeSetNextPaymentsData = ({payments, hasMoreData, page}) => ({
    page,
    payments,
    hasMoreData,
    type: STORE_SET_NEXT_PAYMENTS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollPaymentData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_PAYMENT_DATA
});

//====================== Middleware trigger actions
// Emit payments fetch
export const emitPaymentsFetch = () => ({
    type: EMIT_PAYMENTS_FETCH
});

// Emit next payments fetch
export const emitNextPaymentsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_PAYMENTS_FETCH
});

// Emit add payment
export const emitAddPayment = ({amount, collector, receipt}) => ({
    amount,
    receipt,
    collector,
    type: EMIT_ADD_PAYMENT
});

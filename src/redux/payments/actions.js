// Reducer action types
export const STORE_SET_PAYMENT_DATA = 'STORE_SET_PAYMENT_DATA';
export const STORE_SET_PAYMENTS_DATA = 'STORE_SET_PAYMENTS_DATA';

// Middleware action types
export const EMIT_NEW_PAYMENT = 'EMIT_NEW_PAYMENT';
export const EMIT_PAYMENTS_FETCH = 'EMIT_PAYMENTS_FETCH';

//====================== Reducer trigger actions
// Set payments data in store
export const storeSetPaymentsData = ({payments}) => ({
    payments,
    type: STORE_SET_PAYMENTS_DATA
});

// Set payment data in store
export const storeSetPaymentData = ({payment}) => ({
    payment,
    type: STORE_SET_PAYMENT_DATA
});

//====================== Middleware trigger actions
// Emit payments fetch
export const emitPaymentsFetch = () => ({
    type: EMIT_PAYMENTS_FETCH
});

// Emit new payment
export const emitNewPayment = ({amount, collector, receipt}) => ({
    amount,
    receipt,
    collector,
    type: EMIT_NEW_PAYMENT
});

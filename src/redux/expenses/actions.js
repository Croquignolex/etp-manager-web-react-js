// Reducer action types
export const STORE_SET_EXPENSES_DATA = 'STORE_SET_EXPENSES_DATA';
export const STORE_SET_NEW_EXPENSE_DATA = 'STORE_SET_NEW_EXPENSE_DATA';
export const STORE_SET_NEXT_EXPENSES_DATA = 'STORE_SET_NEXT_EXPENSES_DATA';
export const STORE_STOP_INFINITE_SCROLL_EXPENSE_DATA = 'STORE_STOP_INFINITE_SCROLL_EXPENSE_DATA';

// Middleware action types
export const EMIT_ADD_EXPENSE = 'EMIT_ADD_EXPENSE';
export const EMIT_EXPENSES_FETCH = 'EMIT_EXPENSES_FETCH';
export const EMIT_NEXT_EXPENSES_FETCH = 'EMIT_NEXT_EXPENSES_FETCH';

//====================== Reducer trigger actions
// Set expenses data in store
export const storeSetExpensesData = ({expenses, hasMoreData, page}) => ({
    page,
    expenses,
    hasMoreData,
    type: STORE_SET_EXPENSES_DATA
});

// Set new expense data in store
export const storeSetNewExpenseData = ({expense}) => ({
    expense,
    type: STORE_SET_NEW_EXPENSE_DATA
});

// Set next expenses data in store
export const storeSetNextExpensesData = ({expenses, hasMoreData, page}) => ({
    page,
    expenses,
    hasMoreData,
    type: STORE_SET_NEXT_EXPENSES_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollExpenseData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_EXPENSE_DATA
});

//====================== Middleware trigger actions
// Emit expenses fetch
export const emitExpensesFetch = () => ({
    type: EMIT_EXPENSES_FETCH
});

// Emit next expenses fetch
export const emitNextExpensesFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_EXPENSES_FETCH
});

// Emit add expense
export const emitAddExpense = ({amount, name, reason, description}) => ({
    name,
    reason,
    amount,
    description,
    type: EMIT_ADD_EXPENSE
});

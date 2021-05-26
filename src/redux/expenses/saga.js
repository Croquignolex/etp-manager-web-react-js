import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import {DONE} from "../../constants/typeConstants";
import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_EXPENSE,
    EMIT_EXPENSES_FETCH,
    storeSetExpensesData,
    storeSetNewExpenseData,
    storeSetNextExpensesData,
    EMIT_NEXT_EXPENSES_FETCH,
    storeStopInfiniteScrollExpenseData
} from "./actions";
import {
    storeExpensesRequestInit,
    storeExpensesRequestFailed,
    storeAddExpenseRequestInit,
    storeExpensesRequestSucceed,
    storeAddExpenseRequestFailed,
    storeNextExpensesRequestInit,
    storeAddExpenseRequestSucceed,
    storeNextExpensesRequestFailed,
    storeNextExpensesRequestSucceed
} from "../requests/expenses/actions";

// Fetch expenses from API
export function* emitExpensesFetch() {
    yield takeLatest(EMIT_EXPENSES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeExpensesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.EXPENSES_API_PATH}?page=1`);
            // Extract data
            const expenses = extractExpensesData(apiResponse.data.treasuries);
            // Fire event to redux
            yield put(storeSetExpensesData({expenses, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeExpensesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeExpensesRequestFailed({message}));
        }
    });
}

// Fetch next expenses from API
export function* emitNextExpensesFetch() {
    yield takeLatest(EMIT_NEXT_EXPENSES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextExpensesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.EXPENSES_API_PATH}?page=${page}`);
            // Extract data
            const expenses = extractExpensesData(apiResponse.data.treasuries);
            // Fire event to redux
            yield put(storeSetNextExpensesData({expenses, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextExpensesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextExpensesRequestFailed({message}));
            yield put(storeStopInfiniteScrollExpenseData());
        }
    });
}

// Fleets new expense from API
export function* emitAddExpense() {
    yield takeLatest(EMIT_ADD_EXPENSE, function*({amount, name, reason, description, receipt}) {
        try {
            // Fire event for request
            yield put(storeAddExpenseRequestInit());
            const data = {nom: name, raison: reason, description: description, montant: amount}
            const apiResponse = yield call(apiPostRequest, api.NEW_EXPENSE_API_PATH, data);
            // Extract data
            const expense = extractExpenseData(
                apiResponse.data.treasury,
                apiResponse.data.manager,
            );
            // Fire event to redux
            yield put(storeSetNewExpenseData({expense}))
            // Fire event for request
            yield put(storeAddExpenseRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddExpenseRequestFailed({message}));
        }
    });
}

// Extract expense data
function extractExpenseData(apiExpense, apiManager) {
    let expense = {
        id: '',  name: '', mount: '', creation: '', receipt: '', reason: '', description: '', status: '',

        manager: {id: '', name: ''},
    };
    if(apiManager) {
        expense.manager = {
            name: apiManager.name,
            id: apiManager.id.toString()
        };
    }
    if(apiExpense) {
        expense.status = DONE;
        expense.name = apiExpense.name;
        expense.reason = apiExpense.reason;
        expense.amount = apiExpense.amount;
        expense.id = apiExpense.id.toString();
        expense.creation = apiExpense.created_at;
        expense.description = apiExpense.description;
    }
    return expense;
}

// Extract expenses data
export function extractExpensesData(apiExpenses) {
    const expenses = [];
    apiExpenses.forEach(data => {
        expenses.push(extractExpenseData(
            data.treasury,
            data.manager
        ));
    });
    return expenses;
}

// Combine to export all functions at once
export default function* sagaExpenses() {
    yield all([
        fork(emitAddExpense),
        fork(emitExpensesFetch),
        fork(emitNextExpensesFetch),
    ]);
}

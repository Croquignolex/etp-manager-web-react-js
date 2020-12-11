import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import {getFileFromServer} from "../agents/saga";
import {storeSetInfoToastData} from "../toast/actions";
import {storeSetDangerErrorData} from "../errors/actions";
import {
    EMIT_NEW_COMPANY,
    EMIT_COMPANY_FETCH,
    EMIT_UPDATE_COMPANY,
    storeSetCompanyData,
    EMIT_COMPANY_DELETE,
    EMIT_COMPANIES_FETCH,
    storeSetCompaniesData,
    EMIT_ADD_COMPANY_SIMS,
    EMIT_UPDATE_COMPANY_FILE,
    EMIT_REMOVE_COMPANY_SIMS,
    storeSetCompanyActionData,
    storeSetCompanySimsActionData
} from "./actions";
import {
    storeRequestInit,
    storeRequestFailed,
    storeRequestSucceed
} from "../requests/actions";
import {
    apiGetRequest,
    apiPostRequest,
    sortByCreationDate,
} from "../../helpers/functions";
import {
    COMPANY_SCOPE,
    COMPANIES_SCOPE,
    SIMS_LIST_SCOPE,
    COMPANY_ADD_SIM,
    COMPANY_NEW_SCOPE,
    COMPANY_REMOVE_SIM,
    COMPANIES_API_PATH,
    COMPANY_EDIT_SCOPE,
    EDIT_COMPANY_API_PATH,
    AGENT_FILE_EDIT_SCOPE,
    COMPANY_ADD_SIMS_SCOPE,
    CREATE_COMPANY_API_PATH,
    DELETE_COMPANY_API_PATH,
    COMPANIES_DETAILS_API_PATH,
    EDIT_COMPANY_FILE_API_PATH,
} from "../../helpers/constants";

// Fetch companies from API
export function* emitCompaniesFetch() {
    yield takeLatest(EMIT_COMPANIES_FETCH, function*() {
        const scope = COMPANIES_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, COMPANIES_API_PATH);
            const companies = extractCompaniesData(apiResponse);
            // Fire event to redux
            yield put(storeSetCompaniesData({companies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Fetch company from API
export function* emitCompanyFetch() {
    yield takeLatest(EMIT_COMPANY_FETCH, function*({id}) {
        const scope = COMPANY_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiGetRequest, `${COMPANIES_DETAILS_API_PATH}/${id}`);
            const company = extractCompanyData(apiResponse);
            // Fire event to redux
            yield put(storeSetCompanyData({company}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// New company into API
export function* emitNewCompany() {
    yield takeLatest(EMIT_NEW_COMPANY, function*({name, address, phone, document,
                                                     description, manager}) {
        const scope = COMPANY_NEW_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('nom', name);
            data.append('phone', phone);
            data.append('adresse', address);
            data.append('dossier', document);
            data.append('responsable', manager);
            data.append('description', description);
            yield call(apiPostRequest, CREATE_COMPANY_API_PATH, data);
            // Fire event at redux for new user toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Entreprise ajoutée avec succès`
            }));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// // Update user into API
export function* emitUpdateCompany() {
    yield takeLatest(EMIT_UPDATE_COMPANY, function*({id, name, address, phone, document,
                                                        description, manager}) {
        const scope = COMPANY_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${EDIT_COMPANY_API_PATH}/${id}`,
                {
                    phone,
                    nom: name,
                    description,
                    adresse: address,
                    responsable: manager,
                });
            const company = extractCompanyData(apiResponse);
            // Fire event at redux for user update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Entreprise mise à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCompanyData({company}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Update company file into API
export function* emitUpdateCompanyFile() {
    yield takeLatest(EMIT_UPDATE_COMPANY_FILE, function*({id, document}) {
        const scope = AGENT_FILE_EDIT_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const data = new FormData();
            data.append('dossier', document);
            const apiResponse = yield call(apiPostRequest, `${EDIT_COMPANY_FILE_API_PATH}/${id}`, data);
            const company = extractCompanyData(apiResponse);
            // Fire event at redux for sim update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Document de l'entreprise mis à jour avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCompanyData({company}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Delete company from API
export function* emitCompanyDelete() {
    yield takeLatest(EMIT_COMPANY_DELETE, function*({id}) {
        const scope = COMPANIES_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetCompanyActionData({id}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${DELETE_COMPANY_API_PATH}/${id}`);
            const companies = extractCompaniesData(apiResponse);
            // Fire event at redux for user delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Entreprise supprimée avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCompaniesData({companies}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetCompanyActionData({id}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Add company sims into API
export function* emitAddCompanySims() {
    yield takeLatest(EMIT_ADD_COMPANY_SIMS, function*({id, name, reference,
                                                          number, description, operator}) {
        const scope = COMPANY_ADD_SIMS_SCOPE;
        try {
            // Fire event for request
            yield put(storeRequestInit({scope}));
            const apiResponse = yield call(apiPostRequest, `${COMPANY_ADD_SIM}/${id}`,
                {
                    reference,
                    nom: name,
                    description,
                    numero: number,
                    id_flotte: operator,
                });
            const company = extractCompanyData(apiResponse);
            // Fire event at redux for operator update toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale ajoutée à l'entreprise avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCompanyData({company}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Remove company sims into API
export function* emitRemoveCompanySims() {
    yield takeLatest(EMIT_REMOVE_COMPANY_SIMS, function*({id, sim}) {
        const scope = SIMS_LIST_SCOPE;
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetCompanySimsActionData({sim}));
            // Fire event for request
            const apiResponse = yield call(apiPostRequest, `${COMPANY_REMOVE_SIM}/${id}`, {id_puce: sim});
            const company = extractCompanyData(apiResponse);
            // Fire event at redux for operator delete toast
            yield put(storeSetInfoToastData({
                title: 'Bravo!',
                body: `Puce commerciale supprimée avec succès`
            }));
            // Fire event to redux
            yield put(storeSetCompanyData({company}));
            // Fire event for request
            yield put(storeRequestSucceed({scope}));
        } catch (message) {
            // Fire event for request
            yield put(storeRequestFailed({scope}));
            yield put(storeSetCompanySimsActionData({sim}));
            yield put(storeSetDangerErrorData({message, scope}));
        }
    });
}

// Extract company data
function extractCompanyData(apiCompany) {
    let company = {
        id: '', name: '', manager: '', phone: '', document: '',
        address: '', creation: '', description: '',

        sims: [],
    };
    const apiSims = apiCompany.puces;
    if(apiSims) {
        apiSims.forEach(data => {
            company.sims.push({
                name: data.nom,
                number: data.numero,
                actionLoader: false,
                id: data.id.toString(),
                reference: data.reference,
                creation: data.created_at
            })
        });
        sortByCreationDate(company.sims);
    }
    if(apiCompany) {
        company.actionLoader = false;
        company.name = apiCompany.nom;
        company.phone = apiCompany.phone;
        company.address = apiCompany.adresse;
        company.id = apiCompany.id.toString();
        company.manager = apiCompany.responsable;
        company.creation = apiCompany.created_at;
        company.description = apiCompany.description;
        company.document = getFileFromServer(apiCompany.dossier);
    }
    return company;
}

// Extract companies data
function extractCompaniesData(apiCompanies) {
    const companies = [];
    if(apiCompanies) {
        apiCompanies.forEach(data => {
            companies.push(extractCompanyData(data));
        });
    }
    sortByCreationDate(companies);
    return companies;
}

// Combine to export all functions at once
export default function* sagaCompanies() {
    yield all([
        fork(emitNewCompany),
        fork(emitCompanyFetch),
        fork(emitUpdateCompany),
        fork(emitCompanyDelete),
        fork(emitCompaniesFetch),
        fork(emitAddCompanySims),
        fork(emitRemoveCompanySims),
        fork(emitUpdateCompanyFile),
    ]);
}

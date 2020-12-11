// Reducer action types
export const STORE_SET_COMPANY_DATA = 'STORE_SET_COMPANY_DATA';
export const STORE_SET_COMPANIES_DATA = 'STORE_SET_COMPANIES_DATA';
export const STORE_SET_COMPANY_ACTION_DATA = 'STORE_SET_COMPANY_ACTION_DATA';
export const STORE_SET_COMPANY_SIMS_ACTION_DATA = 'STORE_SET_COMPANY_SIMS_ACTION_DATA';

// Middleware action types
export const EMIT_NEW_COMPANY = 'EMIT_NEW_COMPANY';
export const EMIT_COMPANY_FETCH = 'EMIT_COMPANY_FETCH';
export const EMIT_COMPANY_DELETE = 'EMIT_COMPANY_DELETE';
export const EMIT_UPDATE_COMPANY = 'EMIT_UPDATE_COMPANY';
export const EMIT_COMPANIES_FETCH = 'EMIT_COMPANIES_FETCH';
export const EMIT_ADD_COMPANY_SIMS = 'EMIT_ADD_COMPANY_SIMS';
export const EMIT_REMOVE_COMPANY_SIMS = 'EMIT_REMOVE_COMPANY_SIMS';
export const EMIT_UPDATE_COMPANY_FILE = 'EMIT_UPDATE_COMPANY_FILE';

//====================== Reducer trigger actions
// Set companies data in store
export const storeSetCompaniesData = ({companies}) => ({
    companies,
    type: STORE_SET_COMPANIES_DATA
});

// Set company data in store
export const storeSetCompanyData = ({company}) => ({
    company,
    type: STORE_SET_COMPANY_DATA
});

// Set company action data in store
export const storeSetCompanyActionData = ({id}) => ({
    id,
    type: STORE_SET_COMPANY_ACTION_DATA
});

// Set company sims action data in store
export const storeSetCompanySimsActionData = ({sim}) => ({
    sim,
    type: STORE_SET_COMPANY_SIMS_ACTION_DATA
});

//====================== Middleware trigger actions
// Emit companies fetch
export const emitCompaniesFetch = () => ({
    type: EMIT_COMPANIES_FETCH
});

// Emit company fetch by id
export const emitCompanyFetch = ({id}) => ({
    id,
    type: EMIT_COMPANY_FETCH
});

// Emit new company
export const emitNewCompany = ({name, address, phone, document,
                                   description, manager}) => ({
    name,
    phone,
    manager,
    address,
    document,
    description,
    type: EMIT_NEW_COMPANY
});

// Emit update company
export const emitUpdateCompany = ({id, name, address, phone, document,
                                      description, manager}) => ({
    id,
    name,
    phone,
    manager,
    address,
    document,
    description,
    type: EMIT_UPDATE_COMPANY
});

// Emit company delete by id
export const emitCompanyDelete = ({id}) => ({
    id,
    type: EMIT_COMPANY_DELETE
});

// Emit update company File
export const emitUpdateCompanyFile = ({id, document}) => ({
    id,
    document,
    type: EMIT_UPDATE_COMPANY_FILE
});

// Emit add company sims
export const emitAddCompanySims = ({id, name, reference, number,
                                       description, operator}) => ({
    id,
    name,
    number,
    operator,
    reference,
    description,
    type: EMIT_ADD_COMPANY_SIMS
});

// Emit remove company sims
export const emitRemoveCompanySims = ({id, sim}) => ({
    id,
    sim,
    type: EMIT_REMOVE_COMPANY_SIMS
});

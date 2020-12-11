import React, {useContext, useLayoutEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import SimsList from "../../../components/app/sims/SimsList";
import {storeResetErrorData} from "../../../redux/errors/actions";
import CompaniesEdit from "../../../components/app/companies/CompaniesEdit";
import CompaniesAddSim from "../../../components/app/companies/CompaniesAddSim";
import CompaniesDetail from "../../../components/app/companies/CompaniesDetail";
import CompaniesHigherOrder from "../../../components/layout/CompaniesHigherOrder";
import AgentsDocumentEdit from "../../../components/app/agents/AgentsDocumentEdit";
import {formatNumber, processingRequest, shouldShowError} from "../../../helpers/functions";
import {
    COMPANY_SCOPE,
    COMPANY_EDIT_PAGE,
    ALL_COMPANIES_PAGE,
    COMPANIES_PAGE_PATH,
} from "../../../helpers/constants";
import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    CompaniesContext
} from "../../../helpers/contexts";

// Component
function CompaniesEditPage() {
    // Local state
    const [simModal, setSimModal] = useState({show: false, header: ''});

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const companies = useContext(CompaniesContext);

    // Data
    const scope = COMPANY_SCOPE;
    const canShowSimData = !shouldShowError(scope, errors.list) && !processingRequest(scope, requests.list);

    // Set page title
    useLayoutEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <div className="content-wrapper">
            <Header icon={'fa fa-university'}
                    title={COMPANY_EDIT_PAGE}
                    breadcrumb={[{
                        name: ALL_COMPANIES_PAGE,
                        path: COMPANIES_PAGE_PATH,
                    }]}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-8 col-md-7 col-sm-6">
                            <div className="card custom-card-outline">
                                {/* Edit tabs */}
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#info" data-toggle="tab">
                                                <i className='fa fa-list' /> Modifier les info
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${processingRequest(scope, requests.list) && 'disabled'}`} href="#file" data-toggle="tab">
                                                <i className='fa fa-file' /> Modifier le document
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Edit zone */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="info">
                                            {/* Company information update form */}
                                            <CompaniesEdit />
                                        </div>
                                        <div className="tab-pane" id="file">
                                            {/* Company document update form */}
                                            <AgentsDocumentEdit parentScope={scope} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Sims area */}
                            <div id="accordionSims">
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingSims">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordionSims" href="#collapseSims" className='text-theme'>
                                                <i className='fa fa-sim-card' /> Puces ({canShowSimData ? formatNumber(companies.current.sims.length) : '?'})
                                            </a>
                                        </strong>
                                    </div>
                                    <div id="collapseSims" className="collapse show" aria-labelledby="headingSims" data-parent="#accordionSims">
                                        <div className='card-body'>
                                            {/* Add */}
                                            {canShowSimData &&
                                            <button className='btn btn-theme btn-dark'
                                                    onClick={() => setSimModal({
                                                        show: true,
                                                        header: 'AJOUTER UNE PUCE'
                                                    })}
                                            >
                                                <i className='fa fa-plus' /> Ajouter une puce
                                            </button>
                                            }
                                            {/* List */}
                                            <SimsList parentScope={scope} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            {/* company information */}
                            <CompaniesDetail />
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal */}
            <FormModal modal={simModal} handleClose={() => setSimModal({...simModal, show: false})}>
                <CompaniesAddSim />
            </FormModal>
        </div>
    )
}

export default CompaniesHigherOrder(CompaniesEditPage);

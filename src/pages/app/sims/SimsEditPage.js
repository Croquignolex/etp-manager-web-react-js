import React, {useContext, useEffect} from 'react';

import Header from "../../../components/app/Header";
import SimsEdit from "../../../components/app/sims/SimsEdit";
import SimsDetail from "../../../components/app/sims/SimsDetail";
import {storeResetErrorData} from "../../../redux/errors/actions";
import SimsAgentEdit from "../../../components/app/sims/SimsAgentEdit";
import SimsHigherOrder from "../../../components/layout/SimsHigherOrder";
import SimsOperatorEdit from "../../../components/app/sims/SimsOperatorEdit";
import {shouldShowError, processingRequest} from "../../../helpers/functions";
import {
    SIM_SCOPE,
    ALL_SIMS_PAGE,
    SIM_EDIT_PAGE,
    SIMS_PAGE_PATH
} from "../../../helpers/constants";
import {
    SimsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
} from "../../../helpers/contexts";
import SimsCompanyEdit from "../../../components/app/sims/SimsCompanyEdit";

// Component
function SimsEditPage() {
    // Context states
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = SIM_SCOPE;
    const agentIsEmpty = (sims.current.agent.id === '');
    const companyIsEmpty = (sims.current.company.id === '');
    const requestProcessing = processingRequest(scope, requests.list);

    // Set page title
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <div className="content-wrapper">
            <Header icon={'fa fa-sim-card'}
                    title={SIM_EDIT_PAGE}
                    breadcrumb={[{
                        name: ALL_SIMS_PAGE,
                        path: SIMS_PAGE_PATH,
                    }]}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-7 col-md-7 col-sm-6">
                            <div className="card custom-card-outline">
                                {/* Edit tabs */}
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#info" data-toggle="tab">
                                                <i className='fa fa-list-alt' /> Modifier les info
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${requestProcessing && 'disabled'}`} href="#operator" data-toggle="tab">
                                                <i className='fa fa-globe' /> Modifier l'opérateur
                                            </a>
                                        </li>
                                        {(!requestProcessing && !agentIsEmpty) &&
                                            <li className="nav-item">
                                                <a className={`nav-link ${requestProcessing && 'disabled'}`} href="#agent" data-toggle="tab">
                                                    <i className='fa fa-user-cog' /> Modifier l'agent
                                                </a>
                                            </li>
                                        }
                                        {(!requestProcessing && !companyIsEmpty) &&
                                            <li className="nav-item">
                                                <a className={`nav-link ${requestProcessing && 'disabled'}`} href="#company" data-toggle="tab">
                                                    <i className='fa fa-university' /> Modifier l'entreprise
                                                </a>
                                            </li>
                                        }
                                    </ul>
                                </div>
                                {/* Edit zone */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <>
                                            <div className="active tab-pane" id="info">
                                                <SimsEdit />
                                            </div>
                                            <div className="tab-pane" id="operator">
                                                <SimsOperatorEdit />
                                            </div>
                                            {(!requestProcessing && !agentIsEmpty) &&
                                                <div className="tab-pane" id="agent">
                                                    <SimsAgentEdit />
                                                </div>
                                            }
                                            {(!requestProcessing && !companyIsEmpty) &&
                                                <div className="tab-pane" id="company">
                                                    <SimsCompanyEdit />
                                                </div>
                                            }
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            {/* Sim information */}
                            <SimsDetail />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SimsHigherOrder(SimsEditPage);

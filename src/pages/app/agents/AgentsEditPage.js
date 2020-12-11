import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import SimsList from "../../../components/app/sims/SimsList";
import UsersZone from "../../../components/app/users/UsersZone";
import AgentsCNI from "../../../components/app/agents/AgentsCNI";
import {storeResetErrorData} from "../../../redux/errors/actions";
import AgentsEdit from "../../../components/app/agents/AgentsEdit";
import UsersDetail from "../../../components/app/users/UsersDetail";
import AgentsAddSim from "../../../components/app/agents/AgentsAddSim";
import UsersZoneEdit from "../../../components/app/users/UsersZoneEdit";
import AgentsCNIEdit from "../../../components/app/agents/AgentsCNIEdit";
import AgentsHigherOrder from "../../../components/layout/AgentsHigherOrder";
import AgentsDocumentEdit from "../../../components/app/agents/AgentsDocumentEdit";
import {
    formatNumber,
    shouldShowError,
    processingRequest
} from "../../../helpers/functions";
import {
    AgentsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext
} from "../../../helpers/contexts";
import {
    AGENT_SCOPE,
    AGENT_EDIT_PAGE,
    ALL_AGENTS_PAGE,
    AGENTS_PAGE_PATH,
} from "../../../helpers/constants";

// Component
function AgentsEditPage() {
    // Local state
    const [simModal, setSimModal] = useState({show: false, header: ''});

    // Context states
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = AGENT_SCOPE;
    const requestProcessing = processingRequest(scope, requests.list);
    const canShowSimData = !shouldShowError(scope, errors.list) && !requestProcessing;

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
            <Header icon={'fa fa-user-cog'}
                    title={AGENT_EDIT_PAGE}
                    breadcrumb={[{
                        name: ALL_AGENTS_PAGE,
                        path: AGENTS_PAGE_PATH,
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
                                                <i className='fa fa-list' /> Modifier les info
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${requestProcessing && 'disabled'}`} href="#role" data-toggle="tab">
                                                <i className='fa fa-user-cog' /> Modifier la zone
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${requestProcessing && 'disabled'}`} href="#cni" data-toggle="tab">
                                                <i className='fa fa-image' /> Modifier la CNI
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${requestProcessing && 'disabled'}`} href="#file" data-toggle="tab">
                                                <i className='fa fa-file' /> Modifier le document
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Edit zone */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="info">
                                            {/* Agent information update form */}
                                            <AgentsEdit />
                                        </div>
                                        <div className="tab-pane" id="role">
                                            {/* Agent zone update form */}
                                            <UsersZoneEdit parentScope={scope} />
                                        </div>
                                        <div className="tab-pane" id="cni">
                                            {/* Agent CNI update form */}
                                            <AgentsCNIEdit />
                                        </div>
                                        <div className="tab-pane" id="file">
                                            {/* Agent document update form */}
                                            <AgentsDocumentEdit parentScope={scope} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Sims area */}
                            <div id="accordionAgent">
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingSims">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordionAgent" href="#collapseSims" className='text-theme'>
                                                <i className='fa fa-sim-card' /> Puces ({canShowSimData ? formatNumber(agents.current.sims.length) : '?'})
                                            </a>
                                        </strong>
                                    </div>
                                    <div id="collapseSims" className="collapse show" aria-labelledby="headingSims" data-parent="#accordionAgent">
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
                                {/* Zone */}
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingZone">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordionAgent" href="#collapseAgent" className='text-theme'>
                                                <i className='fa fa-map' /> Zone
                                            </a>
                                        </strong>
                                    </div>
                                    <div id="collapseAgent" className="collapse" aria-labelledby="headingZone" data-parent="#accordionAgent">
                                        <div className="card-body">
                                            <UsersZone scope={scope} />
                                        </div>
                                    </div>
                                </div>
                                {/* CNI */}
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingCNI">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordionAgent" href="#collapseCNI" className='text-theme'>
                                                <i className='fa fa-image' /> CNI
                                            </a>
                                        </strong>
                                    </div>
                                    <div id="collapseCNI" className="collapse" aria-labelledby="headingCNI" data-parent="#accordionAgent">
                                        <div className="card-body">
                                            <AgentsCNI scope={scope} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            {/* User information*/}
                            <UsersDetail scope={scope} />
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal */}
            <FormModal modal={simModal} handleClose={() => setSimModal({...simModal, show: false})}>
                <AgentsAddSim />
            </FormModal>
        </div>
    )
}

export default AgentsHigherOrder(AgentsEditPage);

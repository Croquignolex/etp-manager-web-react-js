import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import SimsList from "../../../components/app/sims/SimsList";
import UsersZone from "../../../components/app/users/UsersZone";
import {storeResetErrorData} from "../../../redux/errors/actions";
import UsersDetail from "../../../components/app/users/UsersDetail";
import UsersZoneEdit from "../../../components/app/users/UsersZoneEdit";
import CollectorsEdit from "../../../components/app/collectors/CollectorsEdit";
import CollectorsAddSim from "../../../components/app/collectors/CollectorsAddSim";
import CollectorsHigherOrder from "../../../components/layout/CollectorsHigherOrder";
import {shouldShowError, processingRequest, formatNumber} from "../../../helpers/functions";
import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    CollectorsContext,
} from "../../../helpers/contexts";
import {
    COLLECTOR_SCOPE,
    COLLECTOR_EDIT_PAGE,
    ALL_COLLECTORS_PAGE,
    COLLECTORS_PAGE_PATH,
} from "../../../helpers/constants";

// Component
function CollectorsEditPage() {
    // Local state
    const [simModal, setSimModal] = useState({show: false, header: ''});

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const scope = COLLECTOR_SCOPE;
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
            <Header icon={'fa fa-user-clock'}
                    title={COLLECTOR_EDIT_PAGE}
                    breadcrumb={[{
                        name: ALL_COLLECTORS_PAGE,
                        path: COLLECTORS_PAGE_PATH,
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
                                    </ul>
                                </div>
                                {/* Edit zone */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="info">
                                            {/* User information update form */}
                                            <CollectorsEdit />
                                        </div>
                                        <div className="tab-pane" id="role">
                                            {/* User zone update form */}
                                            <UsersZoneEdit parentScope={scope} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="accordionAgent">
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingSims">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordionAgent" href="#collapseSims" className='text-theme'>
                                                <i className='fa fa-sim-card' /> Puces ({canShowSimData ? formatNumber(collectors.current.sims.length) : '?'})
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
                                    <div id="collapseAgent" className="collapse show" aria-labelledby="headingZone" data-parent="#accordionAgent">
                                        <div className="card-body">
                                            <UsersZone scope={scope} />
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
                <CollectorsAddSim />
            </FormModal>
        </div>
    )
}

export default CollectorsHigherOrder(CollectorsEditPage);
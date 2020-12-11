import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ZonesEdit from "../../../components/app/zones/ZonesEdit";
import {storeResetErrorData} from "../../../redux/errors/actions";
import ZonesAgents from "../../../components/app/zones/ZonesAgents";
import ZonesDetail from "../../../components/app/zones/ZonesDetail";
import ZonesAddAgent from "../../../components/app/zones/ZonesAddAgent";
import ZonesHigherOrder from "../../../components/layout/ZonesHigherOrder";
import {
    formatNumber,
    shouldShowError,
    processingRequest
} from "../../../helpers/functions";
import {
    ZONE_SCOPE,
    ALL_ZONES_PAGE,
    ZONE_EDIT_PAGE,
    ZONES_PAGE_PATH,
} from "../../../helpers/constants";
import {
    ZonesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";

// Component
function ZonesEditPage() {
    // Local state
    const [agentModal, setAgentModal] = useState({show: false, header: ''});

    // Context states
    const zones = useContext(ZonesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = ZONE_SCOPE;
    const zone = zones.current;
    const requestFailed = shouldShowError(scope, errors.list);
    const requestProcessing = processingRequest(scope, requests.list);
    const canShowAgentData = !requestProcessing && !requestFailed;

    // Set page title
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            requestFailed && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <div className="content-wrapper">
            <Header icon={'fa fa-map'}
                    title={ZONE_EDIT_PAGE}
                    breadcrumb={[{
                        name: ALL_ZONES_PAGE,
                        path: ZONES_PAGE_PATH,
                    }]}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-7">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    <div className="tab-content">
                                        {/* Edit form */}
                                        <ZonesEdit parentScope={scope} />
                                    </div>
                                </div>
                            </div>
                            {/* Some details */}
                            <div id="accordion">
                                {/* Agents area */}
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingAgents">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseAgents" className='text-theme'>
                                                <i className='fa fa-user-cog' /> Agents ({canShowAgentData ? formatNumber(zone.agents.length) : '?'})
                                            </a>
                                        </strong>
                                    </div>
                                    <div id="collapseAgents" className="collapse show" aria-labelledby="headingAgents" data-parent="#accordion">
                                        <div className='card-body'>
                                            {/* Add */}
                                            {canShowAgentData &&
                                                <button className='btn btn-theme btn-dark'
                                                        onClick={() => setAgentModal({
                                                            show: true,
                                                            header: 'AJOUTER UN AGENT'
                                                        })}
                                                >
                                                    <i className='fa fa-plus' /> Ajouter un agent
                                                </button>
                                            }
                                            {/* List */}
                                            <ZonesAgents />
                                        </div>
                                    </div>
                                </div>
                                {/* Collectors */}
                                {/*<div className="card custom-card-outline">
                                    <div className="card-header" id="headingCollectors">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseCollectors" className='text-theme'>
                                                <i className='fa fa-user-clock' /> Responsables de zone ({canShowAgentXCollectorData ? formatNumber(zone.collectors.length) : '?'})
                                            </a>
                                        </strong>
                                    </div>
                                    <div id="collapseCollectors" className="collapse" aria-labelledby="headingCollectors" data-parent="#accordion">
                                        <div className='card-body'>
                                             Add
                                            {canShowAgentXCollectorData &&
                                                <button className='btn btn-theme btn-dark'
                                                        onClick={() => setCollectorModal({
                                                            show: true,
                                                            header: 'AJOUTER UN RESPONSABLE DE ZONE'
                                                        })}
                                                >
                                                    <i className='fa fa-plus' /> Ajouter un responsable de zone
                                                </button>
                                            }
                                             List
                                            <ZonesCollectors />
                                        </div>
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                        {/* Zone information */}
                        <ZonesDetail />
                    </div>
                </div>
            </section>
            {/* Modal */}
            <FormModal modal={agentModal} handleClose={() => setAgentModal({...agentModal, show: false})}>
                <ZonesAddAgent />
            </FormModal>
            {/* Modal */}
            {/*<FormModal modal={collectorModal} handleClose={() => setCollectorModal({...collectorModal, show: false})}>
                <ZonesAddCollector />
            </FormModal>*/}
        </div>
    )
}

export default ZonesHigherOrder(ZonesEditPage);

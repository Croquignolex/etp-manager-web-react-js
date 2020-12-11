import React, {useContext, useEffect, useState} from 'react';

import Header from "../../../../components/app/Header";
import FormModal from "../../../../components/FormModal";
import {storeResetErrorData} from "../../../../redux/errors/actions";
import FleetsEdit from "../../../../components/app/fleets/FleetsEdit";
import FleetsDetail from "../../../../components/app/fleets/FleetsDetail";
import FleetsSupplies from "../../../../components/app/fleets/FleetsSupplies";
import FleetsAddSupply from "../../../../components/app/fleets/FleetsAddSupply";
import {processingRequest, shouldShowError} from "../../../../helpers/functions";
import RequestsFleetsHigherOrder from "../../../../components/layout/RequestsFleetsHigherOrder";
import {
    UserContext,
    ErrorsContext,
    FleetsContext,
    DispatchContext,
    RequestsContext,
} from "../../../../helpers/contexts";
import {
    PENDING,
    PROCESSING,
    FLEET_SCOPE,
    MANAGER_ROLE,
    COLLECTOR_AGENT_ROLE,
    REQUESTS_FLEETS_PAGE,
    REQUESTS_FLEET_EDIT_PAGE,
    REQUESTS_FLEETS_PAGE_PATH,
} from "../../../../helpers/constants";

// Component
function RequestsFleetsEditPage() {
    // Local state
    const [supplyModal, setSupplyModal] = useState({show: false, header: ''});

    // Context states
    const user = useContext(UserContext);
    const fleets = useContext(FleetsContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = FLEET_SCOPE;
    const fleet = fleets.current;
    const requestFailed = shouldShowError(scope, errors.list);
    const managerProcess = MANAGER_ROLE.includes(user.role.name);
    const collectorAgentProcess = COLLECTOR_AGENT_ROLE.includes(user.role.name);
    const canShowSupplies = !requestFailed && !processingRequest(scope, requests.list);
    const canAddSupply = (
        [PENDING, PROCESSING].includes(fleet.status) &&
        canShowSupplies &&
        managerProcess
    );

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
            <Header icon={'fa fa-rss'}
                    title={REQUESTS_FLEET_EDIT_PAGE}
                    breadcrumb={[{
                        name: REQUESTS_FLEETS_PAGE,
                        path: REQUESTS_FLEETS_PAGE_PATH,
                    }]}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-7">
                            {(collectorAgentProcess && fleet.status === PENDING) &&
                                <div className="card custom-card-outline">
                                    <div className="card-body">
                                        {/* Edit form */}
                                        <FleetsEdit parentScope={scope} />
                                    </div>
                                </div>
                            }
                            {/* Operations area */}
                            <div id="accordionSims">
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingSims">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordionSims" href="#collapseSims" className='text-theme'>
                                                <i className='fa fa-sim-card' /> Flottages ({canShowSupplies ? fleet.supplies.length : '?'})
                                            </a>
                                        </strong>
                                    </div>
                                    <div id="collapseSims" className="collapse show" aria-labelledby="headingSims" data-parent="#accordionSims">
                                        <div className='card-body'>
                                            {/* Add */}
                                            {canAddSupply &&
                                                <button className='btn btn-theme btn-dark'
                                                        onClick={() => setSupplyModal({
                                                            show: true,
                                                            header: 'EFFECTUER UN FLOTTAGE'
                                                        })}
                                                >
                                                    <i className='fa fa-plus' /> Effectuer un flottage
                                                </button>
                                            }
                                            {/* List */}
                                            <FleetsSupplies />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fleet information */}
                        <FleetsDetail scope={FLEET_SCOPE} />
                    </div>
                </div>
            </section>
            {/* Modal */}
            <FormModal modal={supplyModal} handleClose={() => setSupplyModal({...supplyModal, show: false})}>
                <FleetsAddSupply remainingAmount={fleet.remaining} handleClose={() => setSupplyModal({...supplyModal, show: false})} />
            </FormModal>
        </div>
    )
}

export default RequestsFleetsHigherOrder(RequestsFleetsEditPage);

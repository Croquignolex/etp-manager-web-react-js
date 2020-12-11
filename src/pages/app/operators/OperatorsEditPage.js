import React, {useContext, useLayoutEffect, useState} from 'react';

import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import SimsList from "../../../components/app/sims/SimsList";
import {storeResetErrorData} from "../../../redux/errors/actions";
import OperatorsEdit from "../../../components/app/operators/OperatorsEdit";
import OperatorsAddSim from "../../../components/app/operators/OperatorsAddSim";
import OperatorsDetail from "../../../components/app/operators/OperatorsDetail";
import OperatorsHigherOrder from "../../../components/layout/OperatorsHigherOrder";
import {formatNumber, processingRequest, shouldShowError} from "../../../helpers/functions";
import {
    OPERATOR_SCOPE,
    ALL_OPERATORS_PAGE,
    OPERATOR_EDIT_PAGE,
    OPERATORS_PAGE_PATH,
} from "../../../helpers/constants";
import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    OperatorsContext
} from "../../../helpers/contexts";

// Component
function OperatorsEditPage() {
    // Local state
    const [simModal, setSimModal] = useState({show: false, header: ''});

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);

    // Data
    const scope = OPERATOR_SCOPE;
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
            <Header icon={'fa fa-globe'}
                    title={OPERATOR_EDIT_PAGE}
                    breadcrumb={[{
                        name: ALL_OPERATORS_PAGE,
                        path: OPERATORS_PAGE_PATH,
                    }]}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-8 col-md-7 col-sm-6">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    {/* Edit form */}
                                    <OperatorsEdit />
                                </div>
                            </div>
                            {/* Sims area */}
                            <div id="accordionSims">
                                <div className="card custom-card-outline">
                                    <div className="card-header" id="headingSims">
                                        <strong className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordionSims" href="#collapseSims" className='text-theme'>
                                                <i className='fa fa-sim-card' /> Puces ({canShowSimData ? formatNumber(operators.current.sims.length) : '?'})
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
                            {/* Operator information */}
                            <OperatorsDetail />
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal */}
            <FormModal modal={simModal} handleClose={() => setSimModal({...simModal, show: false})}>
                <OperatorsAddSim />
            </FormModal>
        </div>
    )
}

export default OperatorsHigherOrder(OperatorsEditPage);

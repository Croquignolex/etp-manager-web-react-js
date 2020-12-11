import React, {useContext, useEffect} from 'react';

import Header from "../../../../components/app/Header";
import {shouldShowError} from "../../../../helpers/functions";
import {storeResetErrorData} from "../../../../redux/errors/actions";
import FleetsEdit from "../../../../components/app/fleets/FleetsEdit";
import FleetsDetail from "../../../../components/app/fleets/FleetsDetail";
import {ErrorsContext, DispatchContext} from "../../../../helpers/contexts";
import RequestsClearancesHigherOrder from "../../../../components/layout/RequestsClearancesHigherOrder";
import {
    CLEARANCE_SCOPE,
    REQUESTS_CLEARANCES_PAGE,
    REQUESTS_CLEARANCE_EDIT_PAGE,
    REQUESTS_CLEARANCES_PAGE_PATH,
} from "../../../../helpers/constants";

// Component
function RequestsClearancesEditPage() {
    // Context states
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = CLEARANCE_SCOPE;

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
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-rss'}
                        title={REQUESTS_CLEARANCE_EDIT_PAGE}
                        breadcrumb={[{
                            name: REQUESTS_CLEARANCES_PAGE,
                            path: REQUESTS_CLEARANCES_PAGE_PATH,
                        }]}
                />
                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-md-7">
                                <div className="card custom-card-outline">
                                    <div className="card-body">
                                        {/* Edit form */}
                                        <FleetsEdit parentScope={scope} />
                                    </div>
                                </div>
                            </div>
                            {/* Clearance information */}
                            <FleetsDetail scope={CLEARANCE_SCOPE} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default RequestsClearancesHigherOrder(RequestsClearancesEditPage);

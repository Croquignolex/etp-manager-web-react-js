import React, {useContext, useEffect} from 'react';

import Header from "../../../components/app/Header";
import UsersEdit from "../../../components/app/users/UsersEdit";
import {storeResetErrorData} from "../../../redux/errors/actions";
import UsersDetail from "../../../components/app/users/UsersDetail";
import UsersRoleEdit from "../../../components/app/users/UsersRoleEdit";
import UsersHigherOrder from "../../../components/layout/UsersHigherOrder";
import {ErrorsContext, DispatchContext, RequestsContext} from "../../../helpers/contexts";
import {
    shouldShowError,
    processingRequest
} from "../../../helpers/functions";
import {
    USER_SCOPE,
    USER_EDIT_PAGE,
    ALL_USERS_PAGE,
    USERS_PAGE_PATH
} from "../../../helpers/constants";

// Component
function UsersEditPage() {
    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = USER_SCOPE;
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
            <Header icon={'fa fa-user-edit'}
                    title={USER_EDIT_PAGE}
                    breadcrumb={[{
                        name: ALL_USERS_PAGE,
                        path: USERS_PAGE_PATH,
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
                                                <i className='fa fa-user-cog' /> Modifier le role
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Edit zone */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="info">
                                            {/* User information update form */}
                                            <UsersEdit parentScope={scope} />
                                        </div>
                                        <div className="tab-pane" id="role">
                                            {/* User role update form */}
                                            <UsersRoleEdit />
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
        </div>
    )
}

export default UsersHigherOrder(UsersEditPage);
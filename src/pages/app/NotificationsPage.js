import {Link} from "react-router-dom";
import React, {useContext, useLayoutEffect, useState} from 'react';

import Loader from "../../components/Loader";
import CustomModal from "../../components/Modal";
import Header from "../../components/app/Header";
import ErrorAlert from "../../components/ErrorAlert";
import TableSearch from "../../components/TableSearch";
import LittleLoader from "../../components/LittleLoader";
import {storeResetErrorData} from "../../redux/errors/actions";
import AppHigherOrder from "../../components/layout/AppHigherOrder";
import {DANGER, NOTIFICATIONS_PAGE, NOTIFICATIONS_SCOPE} from "../../helpers/constants";
import {emitNotificationDelete, emitNotificationRead} from "../../redux/notifications/actions";
import {
    dateToString,
    needleSearch,
    shouldShowError,
    processingRequest
} from "../../helpers/functions";
import {
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    NotificationsContext,
} from "../../helpers/contexts";

// Component
function NotificationsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const notifications = useContext(NotificationsContext);

    const scope = NOTIFICATIONS_SCOPE;

    // Set page title
    useLayoutEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Trigger when operator delete confirmed on modal
    const handleDelete = (id) => {
        setDeleteModal({...deleteModal, show: false});
        dispatch(emitNotificationDelete({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-bell'}
                        title={NOTIFICATIONS_PAGE}
                        listLength={processingRequest(scope, requests.list) ? '?' : notifications.list.length}
                />
                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-12">
                                <div className="card custom-card-outline">
                                    <div className="card-body">
                                        <div className="tab-content">
                                            {processingRequest(scope, requests.list) ? <Loader /> : (
                                                <>
                                                    {shouldShowError(scope, errors.list) &&
                                                        <ErrorAlert scope={scope} />
                                                    }
                                                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                    <div className="table-responsive">
                                                        <table className="table table-hover text-nowrap table-bordered">
                                                            <thead className='bg-theme'>
                                                                <tr>
                                                                    <th>CREER LE</th>
                                                                    {/*<th>LIEN</th>*/}
                                                                    <th>MESSAGE</th>
                                                                    <th>ACTIONS</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {searchEngine(notifications.list, needle).map((item, key) => {
                                                                    return (
                                                                        <tr key={key} className={`${item.read ? '' : 'bg-theme-light'}`}>
                                                                            <td>{dateToString(item.creation)}</td>
                                                                            {/*<td className={item.className}>{item.url}</td>*/}
                                                                            <td>{item.message}</td>
                                                                            <td className='text-center'>
                                                                                {item.actionLoader ? <LittleLoader /> :
                                                                                    <>
                                                                                        <Link className='btn btn-sm btn-secondary'
                                                                                              to={item.url}
                                                                                              onClick={() => dispatch(emitNotificationRead({id: item.id}))}
                                                                                        >
                                                                                            <i className='fa fa-eye' />
                                                                                        </Link>
                                                                                        &nbsp;
                                                                                        <button className='btn btn-sm btn-danger'
                                                                                                onClick={() => setDeleteModal({
                                                                                                    show: true,
                                                                                                    type: DANGER,
                                                                                                    id: item.id,
                                                                                                    header: 'Suppression',
                                                                                                    body: `Supprimer cette notification?`
                                                                                                }
                                                                                            )}
                                                                                        >
                                                                                            <i className='fa fa-trash' />
                                                                                        </button>
                                                                                    </>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                                {searchEngine(notifications.list, needle).length === 0 &&
                                                                    <tr>
                                                                        <td colSpan={4}>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas de notifications
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Modal */}
            <CustomModal modal={deleteModal}
                   handleModal={handleDelete}
                   handleClose={() =>
                       setDeleteModal({...deleteModal, show: false})
                   }
            />
        </>
    )
}

// Search engine
function searchEngine(data, _needle) {
    // Avoid empty filtering
    if(_needle !== '' && _needle !== undefined) {
        // Filter
        data = data.filter((item) => {
            return (
                needleSearch(item.url, _needle) ||
                needleSearch(item.message, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

export default AppHigherOrder(NotificationsPage);

import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import CustomModal from "../../../components/Modal";
import Header from "../../../components/app/Header";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import LittleLoader from "../../../components/LittleLoader";
import CheckBox from "../../../components/app/form/CheckBox";
import UsersCard from "../../../components/app/users/UsersCard";
import ViewSwitcher from "../../../components/app/ViewSwitcher";
import {storeResetErrorData} from "../../../redux/errors/actions";
import UsersHigherOrder from "../../../components/layout/UsersHigherOrder";
import {
    emitUserDelete,
    emitToggleUserStatus
} from "../../../redux/users/actions";
import {
    UserContext,
    UsersContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";
import {
    dateToString,
    needleSearch,
    roleBadgeColor,
    shouldShowError,
    processingRequest,
} from "../../../helpers/functions";
import {
    ADMIN,
    DANGER,
    WARNING,
    SUPERVISOR,
    USERS_SCOPE,
    ALL_USERS_PAGE,
    USER_EDIT_PAGE_PATH,
} from "../../../helpers/constants";

// Component
function UsersPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [switcher, setSwitcher] = useState(false);
    const [blockModal, setBlockModal] = useState({show: false, header: '', body: '', type: '', id: 0});
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const user =  useContext(UserContext);
    const users =  useContext(UsersContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = USERS_SCOPE;
    const ActionButtons = ({item}) => {
        return (
            item.actionLoader ? <LittleLoader /> :
                <>
                    <Link className='btn btn-sm btn-primary'
                          to={{pathname: `${USER_EDIT_PAGE_PATH}/${item.id}`}}>
                        <i className='fa fa-pencil' />
                    </Link>&nbsp;
                    <button className='btn btn-sm btn-danger'
                            onClick={() => setDeleteModal({
                                show: true,
                                type: DANGER,
                                id: item.id,
                                header: 'Suppression',
                                body: `Supprimer l'utilisateur ${item.name}?`
                            })}
                    >
                        <i className='fa fa-trash' />
                    </button>
                </>
        )
    };

    // Set page title
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Trigger when sim delete confirmed on modal
    const handleDelete = (id) => {
        setDeleteModal({...deleteModal, show: false});
        dispatch(emitUserDelete({id}));
    };

    // Trigger when user change status confirmed on modal
    const handleChangeStatus = (id) => {
        setBlockModal({...blockModal, show: false});
        dispatch(emitToggleUserStatus({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-users'}
                        title={ALL_USERS_PAGE}
                        listLength={processingRequest(scope, requests.list) ? '?' : users.list.length}
                />
                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-12">
                                <div className='card custom-card-outline'>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            {processingRequest(scope, requests.list) ? <Loader/> : (
                                                <>
                                                    {shouldShowError(scope, errors.list) &&
                                                        <ErrorAlert scope={scope} />
                                                    }
                                                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                                                    <ViewSwitcher isBlockView={switcher} handleSwitch={() => setSwitcher(!switcher)} />
                                                    {switcher ? (
                                                        <div className='row'>
                                                            {searchEngine(users.list, needle).map((item, key) => {
                                                                return (
                                                                    <div key={key}
                                                                         className='d-flex align-items-stretch col-md-4 col-sm-6'>
                                                                        <UsersCard user={item}>
                                                                            {canProceed(user, item) &&
                                                                                <div className="card-footer">
                                                                                    <div className="text-right">
                                                                                        <ActionButtons item={item} />
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </UsersCard>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                            {searchEngine(users.list, needle).length === 0 &&
                                                                <div className='col-12'>
                                                                    <div className='alert alert-info text-center'>
                                                                        Pas d'utilisateur
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div className="table-responsive">
                                                            <table className="table table-hover text-nowrap table-bordered">
                                                                <thead className='bg-theme'>
                                                                    <tr>
                                                                        <th>CREER LE</th>
                                                                        <th>NOM</th>
                                                                        <th>EMAIL</th>
                                                                        <th>TELEPHONE</th>
                                                                        <th>ROLE</th>
                                                                        <th>STATUS</th>
                                                                        <th>ACTIONS</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {searchEngine(users.list, needle).map((item, key) => {
                                                                        return (
                                                                            <tr  key={key}>
                                                                                <td>{dateToString(item.creation)}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.email}</td>
                                                                                <td>{item.phone}</td>
                                                                                <td className='text-center'>
                                                                                    <span className={`badge badge-${roleBadgeColor(item.role.name)}`}>
                                                                                        {item.role.name}
                                                                                    </span>
                                                                                </td>
                                                                                {canProceed(user, item) &&
                                                                                    <>
                                                                                        <td>
                                                                                            {item.toggleLoader ? <LittleLoader /> :
                                                                                                <CheckBox id={item.id} input={item.status}
                                                                                                          handleInput={data => {
                                                                                                              shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
                                                                                                              // If user is wished to be blocked
                                                                                                              if(data) {
                                                                                                                  setBlockModal({
                                                                                                                      show: true,
                                                                                                                      id: item.id,
                                                                                                                      type: WARNING,
                                                                                                                      header: 'Blocage',
                                                                                                                      body: `Bloquer l'utilisateur ${item.name}?`
                                                                                                                  })
                                                                                                              } else handleChangeStatus(item.id);
                                                                                                          }
                                                                                                          }
                                                                                                />
                                                                                            }
                                                                                        </td>
                                                                                        <td className='text-center'>
                                                                                            <ActionButtons item={item} />
                                                                                        </td>
                                                                                    </>
                                                                                }
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                {searchEngine(users.list, needle).length === 0 &&
                                                                    <tr>
                                                                        <td colSpan={7}>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas d'utilisateur
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
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
            {/* Delete modal improvement */}
            <CustomModal modal={deleteModal}
                   handleModal={handleDelete}
                   handleClose={() =>
                       setDeleteModal({...deleteModal, show: false})
                   }
            />
            {/* Status modal improvement */}
            <CustomModal modal={blockModal}
                   handleModal={handleChangeStatus}
                   handleClose={() =>
                       setBlockModal({...blockModal, show: false})
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
                needleSearch(item.name, _needle) ||
                needleSearch(item.phone, _needle) ||
                needleSearch(item.email, _needle) ||
                needleSearch(item.role.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Can auth user toggle, delete or edit current user
function canProceed(user, currentUser) {
    const authUserRole = user.role.name;
    return (
        (authUserRole === ADMIN) ||
        ((authUserRole === SUPERVISOR) && (currentUser.role.name !== ADMIN))
    ) && (user.id !== currentUser.id);
}

export default UsersHigherOrder(UsersPage);
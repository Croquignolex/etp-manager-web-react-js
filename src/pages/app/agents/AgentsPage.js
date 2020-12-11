import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import CustomModal from "../../../components/Modal";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import LittleLoader from "../../../components/LittleLoader";
import CheckBox from "../../../components/app/form/CheckBox";
import ViewSwitcher from "../../../components/app/ViewSwitcher";
import {storeResetErrorData} from "../../../redux/errors/actions";
import AgentsCard from "../../../components/app/agents/AgentsCard";
import AgentsHigherOrder from "../../../components/layout/AgentsHigherOrder";
import UsersDetailModal from "../../../components/app/users/UsersDetailModal";
import {emitAgentDelete, emitToggleAgentStatus} from "../../../redux/agents/actions";
import {
    UserContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
} from "../../../helpers/contexts";
import {
    formatNumber,
    dateToString,
    needleSearch,
    shouldShowError,
    processingRequest
} from "../../../helpers/functions";
import {
    DANGER,
    WARNING,
    ADMIN_ROLE,
    AGENTS_SCOPE,
    ALL_AGENTS_PAGE,
    AGENT_EDIT_PAGE_PATH,
} from "../../../helpers/constants";

// Component
function AgentsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [switcher, setSwitcher] = useState(false);
    const [detailModal, setDetailModal] = useState({show: false, header: 'DETAIL', item: {}});
    const [blockModal, setBlockModal] = useState({show: false, header: '', body: '', type: '', id: 0});
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const agents =  useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const adminProcess = ADMIN_ROLE.includes(user.role.name);

    // Data
    const scope = AGENTS_SCOPE;
    const ActionButtons = ({item}) => {
        return (
            item.actionLoader ? <LittleLoader /> :
                <>
                    <button className='btn btn-sm btn-secondary'
                            onClick={() => setDetailModal({...detailModal, show: true, item})}
                    >
                        <i className='fa fa-eye' />
                    </button>
                    &nbsp;
                    <Link className='btn btn-sm btn-primary'
                          to={{pathname: `${AGENT_EDIT_PAGE_PATH}/${item.id}`}}>
                        <i className='fa fa-pencil' />
                    </Link>
                    &nbsp;
                    {(item.sims.length === 0) &&
                        <button className='btn btn-sm btn-danger'
                                onClick={() => setDeleteModal({
                                    show: true,
                                    type: DANGER,
                                    id: item.id,
                                    header: 'Suppression',
                                    body: `Supprimer l'agent ${item.name}?`
                                }
                            )}
                        >
                            <i className='fa fa-trash' />
                        </button>
                    }
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
        dispatch(emitAgentDelete({id}));
    };

    // Trigger when user change status confirmed on modal
    const handleChangeStatus = (id) => {
        setBlockModal({...blockModal, show: false});
        dispatch(emitToggleAgentStatus({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header title={ALL_AGENTS_PAGE}
                        icon={'fa fa-user-cog'}
                        listLength={processingRequest(scope, requests.list) ? '?' : agents.list.length}
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
                                                            {searchEngine(agents.list, needle).map((item, key) => {
                                                                return (
                                                                    <div key={key}
                                                                         className='d-flex align-items-stretch col-md-4 col-sm-6'>
                                                                        <AgentsCard agent={item}>
                                                                            {adminProcess &&
                                                                                <div className="card-footer">
                                                                                    <div className="text-right">
                                                                                        <ActionButtons item={item} />
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </AgentsCard>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                            {searchEngine(agents.list, needle).length === 0 &&
                                                                <div className='col-12'>
                                                                    <div className='alert alert-info text-center'>
                                                                        Pas d'agents
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
                                                                        <th>TELEPHONE</th>
                                                                        <th>ZONE</th>
                                                                        <th>PUCES</th>
                                                                        <th>CREATEUR</th>
                                                                        <><th>STATUS</th><th>ACTIONS</th></>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {searchEngine(agents.list, needle).map((item, key) => {
                                                                        return (
                                                                            <tr key={key}>
                                                                                <td>{dateToString(item.creation)}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.phone}</td>
                                                                                <td>{item.zone.name} {item.zone.reference && <small>({item.zone.reference})</small>}</td>
                                                                                <td className='text-right'>{formatNumber(item.sims.length)}</td>
                                                                                <td>{item.creator.name}</td>
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
                                                                                                              body: `Bloquer l'agent ${item.name}?`
                                                                                                          })
                                                                                                      } else handleChangeStatus(item.id);
                                                                                                  }}
                                                                                        />
                                                                                    }
                                                                                </td>
                                                                                <td className='text-center'>
                                                                                    <ActionButtons item={item} />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                    {searchEngine(agents.list, needle).length === 0 &&
                                                                        <tr>
                                                                            <td colSpan={8}>
                                                                                <div className='alert alert-info text-center'>
                                                                                    Pas d'agents
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
            {adminProcess &&
                <>
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
            }
            <FormModal modal={detailModal} handleClose={() => setDetailModal({...detailModal, show: false})}>
                <UsersDetailModal user={detailModal.item} />
            </FormModal>
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
                needleSearch(item.reference, _needle) ||
                needleSearch(item.zone.name, _needle) ||
                needleSearch(item.creator.name, _needle) ||
                needleSearch(item.zone.reference, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(formatNumber(item.sims.length), _needle) 
                // needleSearch(formatNumber(item.account.balance), _needle)
            )
        });
    }
    // Return data
    return data;
}

export default AgentsHigherOrder(AgentsPage);

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
import UsersDetailModal from "../../../components/app/users/UsersDetailModal";
import CollectorsCard from "../../../components/app/collectors/CollectorsCard";
import CollectorsHigherOrder from "../../../components/layout/CollectorsHigherOrder";
import {emitCollectorDelete, emitToggleCollectorStatus} from "../../../redux/collectors/actions";
import {
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    CollectorsContext
} from "../../../helpers/contexts";
import {
    dateToString,
    needleSearch,
    shouldShowError,
    processingRequest,
} from "../../../helpers/functions";
import {
    DANGER,
    WARNING,
    COLLECTORS_SCOPE,
    ALL_COLLECTORS_PAGE,
    COLLECTOR_EDIT_PAGE_PATH,
} from "../../../helpers/constants";

// Component
function CollectorsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [switcher, setSwitcher] = useState(false);
    const [detailModal, setDetailModal] = useState({show: false, header: 'DETAIL', item: {}});
    const [blockModal, setBlockModal] = useState({show: false, header: '', body: '', type: '', id: 0});
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const collectors =  useContext(CollectorsContext);

    // Data
    const scope = COLLECTORS_SCOPE;
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
                          to={{pathname: `${COLLECTOR_EDIT_PAGE_PATH}/${item.id}`}}>
                        <i className='fa fa-pencil' />
                    </Link>
                    &nbsp;
                    <button className='btn btn-sm btn-danger'
                            onClick={() => setDeleteModal({
                                show: true,
                                type: DANGER,
                                id: item.id,
                                header: 'Suppression',
                                body: `Supprimer le responsable de zone ${item.name}?`
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
        dispatch(emitCollectorDelete({id}));
    };

    // Trigger when user change status confirmed on modal
    const handleChangeStatus = (id) => {
        setBlockModal({...blockModal, show: false});
        dispatch(emitToggleCollectorStatus({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-user-clock'}
                        title={ALL_COLLECTORS_PAGE}
                        listLength={processingRequest(scope, requests.list) ? '?' : collectors.list.length}
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
                                                            {searchEngine(collectors.list, needle).map((item, key) => {
                                                                return (
                                                                    <div key={key}
                                                                         className='d-flex align-items-stretch col-md-4 col-sm-6'>
                                                                        <CollectorsCard collector={item}>
                                                                            <ActionButtons item={item} />
                                                                        </CollectorsCard>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                            {searchEngine(collectors.list, needle).length === 0 &&
                                                                <div className='col-12'>
                                                                    <div className='alert alert-info text-center'>
                                                                        Pas de responsables de zone
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
                                                                        <th>ZONE</th>
                                                                        <th>PUCES</th>
                                                                        {/*<th>SOLDE</th>*/}
                                                                        <th>STATUS</th>
                                                                        <th>ACTIONS</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {searchEngine(collectors.list, needle).map((item, key) => {
                                                                        return (
                                                                            <tr key={key}>
                                                                                <td>{dateToString(item.creation)}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.email}</td>
                                                                                <td>{item.phone}</td>
                                                                                <td>{item.zone.name} {item.zone.reference && <small>({item.zone.reference})</small>}</td>
                                                                                <td className='text-right'>{item.sims.length}</td>
                                                                                {/*<td className='text-right'>{formatNumber(item.account.balance)}</td>*/}
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
                                                                                                              body: `Bloquer le responsable de zone ${item.name}?`
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
                                                                {searchEngine(collectors.list, needle).length === 0 &&
                                                                    <tr>
                                                                        <td colSpan={7}>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas de responsables de zone
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
                needleSearch(item.email, _needle) ||
                needleSearch(item.zone.name, _needle) ||
                needleSearch(item.sims.length, _needle) ||
                needleSearch(item.zone.reference, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
                // needleSearch(formatNumber(item.account.balance), _needle)
            )
        });
    }
    // Return data
    return data;
}

export default CollectorsHigherOrder(CollectorsPage);
import React, {useContext, useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import CustomModal from "../../../components/Modal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {emitSimDelete} from "../../../redux/sims/actions";
import LittleLoader from "../../../components/LittleLoader";
import {storeResetErrorData} from "../../../redux/errors/actions";
import SimsHigherOrder from "../../../components/layout/SimsHigherOrder";
import {
    ADMIN_ROLE,
    SIMS_SCOPE,
    ALL_SIMS_PAGE,
    SIM_EDIT_PAGE_PATH
} from "../../../helpers/constants";
import {
    dateToString,
    needleSearch,
    shouldShowError,
    processingRequest,
    simTypeBadgeColor, formatNumber,
} from "../../../helpers/functions";
import {
    UserContext,
    SimsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from "../../../helpers/contexts";

// Component
function SimsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const sims = useContext(SimsContext);
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = SIMS_SCOPE;
    const adminProcess = ADMIN_ROLE.includes(user.role.name);

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Trigger when operator delete confirmed on modal
    const handleDelete = (id) => {
        setDeleteModal({...deleteModal, show: false});
        dispatch(emitSimDelete({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-sim-card'}
                        title={ALL_SIMS_PAGE}
                        listLength={processingRequest(scope, requests.list) ? '?' : sims.list.length}
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
                                                        <div className="table-responsive">
                                                            <table className="table table-hover text-nowrap table-bordered">
                                                                <thead className='bg-theme'>
                                                                    <tr>
                                                                        <th>CREER LE</th>
                                                                        <th>NOM</th>
                                                                        <th>NUMERO</th>
                                                                        <th>TYPE</th>
                                                                        <th>SOLDE</th>
                                                                        <th>OPERATEUR</th>
                                                                        <th>AGENT</th>
                                                                        {adminProcess && <th>ACTIONS</th>}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {searchEngine(sims.list, needle).map((item, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{dateToString(item.creation)}</td>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.number}</td>
                                                                            <td className='text-center'>
                                                                                <span className={`badge badge-${simTypeBadgeColor(item.type.name)}`}>
                                                                                    {item.type.name}
                                                                                </span>
                                                                            </td>
                                                                            <td className='text-right'>{formatNumber(item.balance)}</td>
                                                                            <td>{item.operator.name}</td>
                                                                            <td>{item.agent.name}</td>
                                                                            {adminProcess &&
                                                                                <td className='text-center'>
                                                                                    {item.actionLoader ? <LittleLoader /> :
                                                                                        <>
                                                                                            <Link className='btn btn-sm btn-primary'
                                                                                                  to={{pathname: `${SIM_EDIT_PAGE_PATH}/${item.id}`}}>
                                                                                                <i className='fa fa-pencil' />
                                                                                            </Link>&nbsp;
                                                                                            {/*<button className='btn btn-sm btn-danger'
                                                                                                    onClick={() => setDeleteModal({
                                                                                                        show: true,
                                                                                                        type: DANGER,
                                                                                                        id: item.id,
                                                                                                        header: 'Suppression',
                                                                                                        body: `Supprimer la puce commerciale ${item.number}?`
                                                                                                    })}
                                                                                            >
                                                                                                <i className='fa fa-trash' />
                                                                                            </button>*/}
                                                                                        </>
                                                                                    }
                                                                                </td>
                                                                            }
                                                                        </tr>
                                                                    )
                                                                })}
                                                                {searchEngine(sims.list, needle).length === 0 &&
                                                                    <tr>
                                                                        <td colSpan={8}>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas de puces commerciale
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {adminProcess &&
                <CustomModal modal={deleteModal}
                             handleModal={handleDelete}
                             handleClose={() =>
                                 setDeleteModal({...deleteModal, show: false})
                             }
                />
            }
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
                needleSearch(item.number, _needle) ||
                needleSearch(item.balance, _needle) ||
                needleSearch(item.type.name, _needle) ||
                needleSearch(item.reference, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.operator.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

export default SimsHigherOrder(SimsPage);

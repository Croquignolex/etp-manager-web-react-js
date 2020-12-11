import {Link} from "react-router-dom";
import React, {useContext, useLayoutEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import CustomModal from "../../../components/Modal";
import Header from "../../../components/app/Header";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import LittleLoader from "../../../components/LittleLoader";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitOperatorDelete} from "../../../redux/operators/actions";
import OperatorsHigherOrder from "../../../components/layout/OperatorsHigherOrder";
import OperatorsDetailModal from "../../../components/app/operators/OperatorsDetailModal";
import {
    dateToString,
    formatNumber,
    needleSearch,
    shouldShowError,
    processingRequest
} from "../../../helpers/functions";
import {
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    OperatorsContext
} from "../../../helpers/contexts";
import {
    DANGER,
    OPERATORS_SCOPE,
    ALL_OPERATORS_PAGE,
    OPERATOR_EDIT_PAGE_PATH,
} from "../../../helpers/constants";

// Component
function OperatorsPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [detailModal, setDetailModal] = useState({show: false, header: 'DETAIL', item: {}});
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);

    const scope = OPERATORS_SCOPE;

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
        dispatch(emitOperatorDelete({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-globe'}
                        title={ALL_OPERATORS_PAGE}
                        listLength={processingRequest(scope, requests.list) ? '?' : operators.list.length}
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
                                                                    <th>NOM</th>
                                                                    <th>PUCES</th>
                                                                    <th>ACTIONS</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {searchEngine(operators.list, needle).map((item, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{dateToString(item.creation)}</td>
                                                                            <td>{item.name}</td>
                                                                            <td className='text-right'>{formatNumber(item.sims.length)}</td>
                                                                            <td className='text-center'>
                                                                                {item.actionLoader ? <LittleLoader /> :
                                                                                    <>
                                                                                        <button className='btn btn-sm btn-secondary'
                                                                                                onClick={() => setDetailModal({...detailModal, show: true, item})}
                                                                                        >
                                                                                            <i className='fa fa-eye' />
                                                                                        </button>
                                                                                        &nbsp;
                                                                                        <Link className='btn btn-sm btn-primary'
                                                                                              to={{pathname: `${OPERATOR_EDIT_PAGE_PATH}/${item.id}`}}>
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
                                                                                                        body: `Supprimer l'opérateur de flotte ${item.name}?`
                                                                                                    }
                                                                                                )}
                                                                                            >
                                                                                                <i className='fa fa-trash' />
                                                                                            </button>
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                                {searchEngine(operators.list, needle).length === 0 &&
                                                                    <tr>
                                                                        <td colSpan={4}>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas d'opérateurs de flotte
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
            <FormModal modal={detailModal} handleClose={() => setDetailModal({...detailModal, show: false})}>
                <OperatorsDetailModal operator={detailModal.item} />
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
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(formatNumber(item.sims.length), _needle)
            )
        });
    }
    // Return data
    return data;
}

export default OperatorsHigherOrder(OperatorsPage);

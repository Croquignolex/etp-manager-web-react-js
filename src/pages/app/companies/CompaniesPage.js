import {Link} from "react-router-dom";
import React, {useContext, useLayoutEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import CustomModal from "../../../components/Modal";
import Header from "../../../components/app/Header";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import LittleLoader from "../../../components/LittleLoader";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {emitCompanyDelete} from "../../../redux/companies/actions";
import CompaniesHigherOrder from "../../../components/layout/CompaniesHigherOrder";
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
    CompaniesContext
} from "../../../helpers/contexts";
import {
    DANGER,
    COMPANIES_SCOPE,
    ALL_COMPANIES_PAGE,
    COMPANY_EDIT_PAGE_PATH,
} from "../../../helpers/constants";
import OperatorsDetailModal from "../../../components/app/operators/OperatorsDetailModal";
import FormModal from "../../../components/FormModal";

// Component
function CompaniesPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [detailModal, setDetailModal] = useState({show: false, header: 'DETAIL', item: {}});
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const companies = useContext(CompaniesContext);

    const scope = COMPANIES_SCOPE;

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
        dispatch(emitCompanyDelete({id}));
    };

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-university'}
                        title={ALL_COMPANIES_PAGE}
                        listLength={processingRequest(scope, requests.list) ? '?' : companies.list.length}
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
                                                                <th>RESPONSABLE</th>
                                                                <th>TELEPHONE</th>
                                                                <th>PUCES</th>
                                                                <th>ACTIONS</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {searchEngine(companies.list, needle).map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{dateToString(item.creation)}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.manager}</td>
                                                                        <td>{item.phone}</td>
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
                                                                                          to={{pathname: `${COMPANY_EDIT_PAGE_PATH}/${item.id}`}}>
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
                                                                                                    body: `Supprimer l'entreprise ${item.name}?`
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
                                                            {searchEngine(companies.list, needle).length === 0 &&
                                                                <tr>
                                                                    <td colSpan={6}>
                                                                        <div className='alert alert-info text-center'>
                                                                            Pas d'entreprises
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
                needleSearch(item.phone, _needle) ||
                needleSearch(item.manager, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(formatNumber(item.sims.length), _needle)
            )
        });
    }
    // Return data
    return data;
}

export default CompaniesHigherOrder(CompaniesPage);

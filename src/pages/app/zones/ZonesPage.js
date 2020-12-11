import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import Loader from "../../../components/Loader";
import Header from "../../../components/app/Header";
import CustomModal from "../../../components/Modal";
import FormModal from "../../../components/FormModal";
import ErrorAlert from "../../../components/ErrorAlert";
import TableSearch from "../../../components/TableSearch";
import {emitZoneDelete} from "../../../redux/zones/actions";
import LittleLoader from "../../../components/LittleLoader";
import ViewSwitcher from "../../../components/app/ViewSwitcher";
import {storeResetErrorData} from "../../../redux/errors/actions";
import ZonesHigherOrder from "../../../components/layout/ZonesHigherOrder";
import ZonesDetailModal from "../../../components/app/zones/ZonesDetailModal";
import {
    DANGER,
    ZONES_SCOPE,
    ALL_ZONES_PAGE,
    ZONE_EDIT_PAGE_PATH,
} from "../../../helpers/constants";
import {
    ZonesContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext
} from "../../../helpers/contexts";
import {
    dateToString,
    needleSearch,
    formatNumber,
    shouldShowError,
    processingRequest,
    extractGoogleMapUrl
} from "../../../helpers/functions";

// Component
function ZonesPage() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [switcher, setSwitcher] = useState(true);
    const [detailModal, setDetailModal] = useState({show: false, header: 'DETAIL', item: {}});
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const zones = useContext(ZonesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const scope = ZONES_SCOPE;
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
                          to={{pathname: `${ZONE_EDIT_PAGE_PATH}/${item.id}`}}>
                        <i className='fa fa-pencil' />
                    </Link>&nbsp;
                    {(item.agents.length === 0) &&
                        <button className='btn btn-sm btn-danger'
                                onClick={() => setDeleteModal({
                                    show: true,
                                    type: DANGER,
                                    id: item.id,
                                    header: 'Suppression',
                                    body: `Supprimer la zone de recouvrement ${item.name}?`
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
        dispatch(emitZoneDelete({id}));
    };console.log({zones})

    // Render
    return (
        <>
            <div className="content-wrapper">
                <Header icon={'fa fa-map'}
                        title={ALL_ZONES_PAGE}
                        listLength={processingRequest(scope, requests.list) ? '?' : zones.list.length}
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
                                                                    {searchEngine(zones.list, needle).map((item, key) => {
                                                                        return (
                                                                            <div key={key} className='col-lg-3 col-md-4 col-sm-6'>
                                                                                <div className="card card-widget custom-card-outline">
                                                                                    <iframe src={extractGoogleMapUrl(item.map)}
                                                                                            className='widget-user-header'
                                                                                            style={{border:0}}
                                                                                            allowFullScreen={true}
                                                                                            title="googleMap"
                                                                                    />
                                                                                    <div className="card-footer p-0">
                                                                                        <ul className="nav flex-column">
                                                                                            <li className="nav-item">
                                                                                                <span className="nav-link">
                                                                                                    {item.name} {item.reference && <small>({item.reference})</small>}
                                                                                                    <span className="float-right">
                                                                                                        <span className='badge badge-secondary mr-1' title="Agents">
                                                                                                            <i className='fa fa-users-cog' /> {formatNumber(item.agents.length)}
                                                                                                        </span>
                                                                                                        {/*<span className="badge badge-info ml-1" title="Responsables de zone">*/}
                                                                                                        {/*    <i className='fa fa-user-clock' /> {formatNumber(item.collectors.length)}*/}
                                                                                                        {/*</span>*/}
                                                                                                    </span>
                                                                                                </span>
                                                                                            </li>
                                                                                            <li className="nav-item">
                                                                                               <span className="nav-link">
                                                                                                    <ActionButtons item={item} />
                                                                                               </span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    }
                                                                    {searchEngine(zones.list, needle).length === 0 &&
                                                                        <div className='col-12'>
                                                                            <div className='alert alert-info text-center'>
                                                                                Pas de zones de recouvrement
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
                                                                                <th>REFERENCE</th>
                                                                                <th>AGENTS</th>
                                                                                <th>RESPONSABLE</th>
                                                                                <th>ACTIONS</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {searchEngine(zones.list, needle).map((item, key) => {
                                                                                return (
                                                                                    <tr key={key}>
                                                                                        <td>{dateToString(item.creation)}</td>
                                                                                        <td>{item.name}</td>
                                                                                        <td>{item.reference}</td>
                                                                                        <td className='text-right'>{formatNumber(item.agents.length)}</td>
                                                                                        <td>{item.collector.name}</td>
                                                                                        <td className='text-center'>
                                                                                            <ActionButtons item={item} />
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                            {searchEngine(zones.list, needle).length === 0 &&
                                                                                <tr>
                                                                                    <td colSpan={6}>
                                                                                        <div className='alert alert-info text-center'>
                                                                                            Pas de zones de recouvrement
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )
                                                        }

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
            {/* Modal */}
            <CustomModal modal={deleteModal}
                         handleModal={handleDelete}
                         handleClose={() =>
                             setDeleteModal({...deleteModal, show: false})
                         }
            />
            <FormModal modal={detailModal} handleClose={() => setDetailModal({...detailModal, show: false})}>
                <ZonesDetailModal zone={detailModal.item} />
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
                needleSearch(item.reference, _needle) ||
                needleSearch(item.agents.length, _needle) ||
                needleSearch(item.collector.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

export default ZonesHigherOrder(ZonesPage);

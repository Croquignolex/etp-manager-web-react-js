import {Link} from "react-router-dom";
import React, {useContext, useState} from 'react';

import Loader from "../../Loader";
import CustomModal from "../../Modal";
import ErrorAlert from "../../ErrorAlert";
import ViewSwitcher from "../ViewSwitcher";
import TableSearch from "../../TableSearch";
import LittleLoader from "../../LittleLoader";
import CollectorsCard from "../collectors/CollectorsCard";
import {emitRemoveZoneCollectors} from "../../../redux/zones/actions";
import {
    DANGER,
    ZONE_SCOPE,
    ZONES_COLLECTORS_SCOPE,
    COLLECTOR_EDIT_PAGE_PATH
} from "../../../helpers/constants";
import {
    ZonesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext
} from "../../../helpers/contexts";
import {
    dateToString,
    needleSearch,
    shouldShowError,
    processingRequest
} from "../../../helpers/functions";

// Component
function ZonesCollectors() {
    // Local states
    const [needle, setNeedle] = useState('');
    const [switcher, setSwitcher] = useState(false);
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const zones = useContext(ZonesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const parentScope = ZONE_SCOPE;
    const scope = ZONES_COLLECTORS_SCOPE;
    const collectors = zones.current.collectors;
    const ActionButtons = ({item}) => {
        return (
            item.actionLoader ? <LittleLoader /> :
                <>
                    <Link className='text-primary mr-2'
                          to={{pathname: `${COLLECTOR_EDIT_PAGE_PATH}/${item.id}`}}>
                        <i className='fa fa-pencil' />
                    </Link>
                    <span className='text-danger hand-cursor'
                          onClick={() => setDeleteModal({
                              show: true,
                              type: DANGER,
                              id: item.id,
                              header: 'Suppression',
                              body: `
                                    Supprimer l'agent de recouvrement
                                    ${item.name} (${item.phone})?
                                `
                          })}
                    >
                        <i className='fa fa-trash' />
                    </span>
                </>
        )
    };

    // Trigger when sim delete confirmed on modal
    const handleDelete = (id) => {
        setDeleteModal({...deleteModal, show: false});
        dispatch(emitRemoveZoneCollectors({id: zones.current.id, collector: id}));
    };

    // Render
    return (
        <>
            {processingRequest(parentScope, requests.list) ? <Loader/> : (
                <>
                    {shouldShowError(scope, errors.list) &&
                        <ErrorAlert scope={scope}/>
                    }
                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                    <ViewSwitcher isBlockView={switcher} handleSwitch={() => setSwitcher(!switcher)} />
                    {switcher ? (
                        <div className='row mt-2'>
                            {searchEngine(collectors, needle).map((item, key) =>
                                    <div key={key}
                                         className='d-flex align-items-stretch col-sm-6'
                                    >
                                        <CollectorsCard collector={item}>
                                            <ActionButtons item={item} />
                                        </CollectorsCard>
                                    </div>
                                )
                            }
                            {searchEngine(collectors, needle).length === 0 &&
                                <div className='col-12'>
                                    <div className='alert alert-info text-center'>
                                        Pas de responsable de zone pour cette zone
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap table-bordered">
                                <thead>
                                    <tr>
                                        <th>CREER LE</th>
                                        <th>NOM</th>
                                        <th>EMAIL</th>
                                        <th>TELEPHONE</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchEngine(collectors, needle).map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{dateToString(item.creation)}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td className='text-center'>
                                                    <ActionButtons item={item} />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {searchEngine(collectors, needle).length === 0 &&
                                        <tr>
                                            <td colSpan={5}>
                                                <div className='alert alert-info text-center'>
                                                    Pas de responsable de zone pour cette zone
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                    }
                    <CustomModal modal={deleteModal}
                                 handleModal={handleDelete}
                                 handleClose={() =>
                                     setDeleteModal({...deleteModal, show: false})
                                 }
                    />
                </>
            )}
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
                needleSearch(item.town, _needle) ||
                needleSearch(item.phone, _needle) ||
                needleSearch(item.email, _needle) ||
                needleSearch(item.creation, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default React.memo(ZonesCollectors);
import {Link} from "react-router-dom";
import React, {useContext, useState} from 'react';

import Loader from "../../Loader";
import CustomModal from "../../Modal";
import ErrorAlert from "../../ErrorAlert";
import ViewSwitcher from "../ViewSwitcher";
import TableSearch from "../../TableSearch";
import LittleLoader from "../../LittleLoader";
import AgentsCard from "../agents/AgentsCard";
import {emitRemoveZoneAgents} from "../../../redux/zones/actions";
import {
    DANGER,
    ZONE_SCOPE,
    ZONES_AGENTS_SCOPE,
    AGENT_EDIT_PAGE_PATH
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
function ZonesAgents() {
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
    const scope = ZONES_AGENTS_SCOPE;
    const parentScope = ZONE_SCOPE;
    const agents = zones.current.agents;
    const ActionButtons = ({item}) => {
        return (
            item.actionLoader ? <LittleLoader /> :
                <>
                    <Link className='text-primary mr-2'
                          to={{pathname: `${AGENT_EDIT_PAGE_PATH}/${item.id}`}}>
                        <i className='fa fa-pencil' />
                    </Link>
                    <span className='text-danger hand-cursor'
                          onClick={() => setDeleteModal({
                              show: true,
                              type: DANGER,
                              id: item.id,
                              header: 'Suppression',
                              body: `
                                    Supprimer l'agent 
                                    ${item.name} (${item.reference})?
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
        dispatch(emitRemoveZoneAgents({id: zones.current.id, agent: id}));
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
                                {searchEngine(agents, needle).map((item, key) =>
                                        <div key={key}
                                             className='d-flex align-items-stretch col-sm-6'
                                        >
                                            <AgentsCard agent={item}>
                                                <div className="card-footer">
                                                    <div className="text-right">
                                                        <ActionButtons item={item} />
                                                    </div>
                                                </div>
                                            </AgentsCard>
                                        </div>
                                    )
                                }
                                {searchEngine(agents, needle).length === 0 &&
                                    <div className='col-12'>
                                        <div className='alert alert-info text-center'>
                                            Pas d'agent pour cette zone
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
                                            {/*<th>REFERENCE</th>*/}
                                            <th>TELEPHONE</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchEngine(agents, needle).map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{dateToString(item.creation)}</td>
                                                    <td>{item.name}</td>
                                                    {/*<td>{item.reference}</td>*/}
                                                    <td>{item.phone}</td>
                                                    <td className='text-center'>
                                                        <ActionButtons item={item} />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {searchEngine(agents, needle).length === 0 &&
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className='alert alert-info text-center'>
                                                        Pas d'agent pour cette zone
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
                needleSearch(item.creation, _needle) ||
                needleSearch(item.reference, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default React.memo(ZonesAgents);

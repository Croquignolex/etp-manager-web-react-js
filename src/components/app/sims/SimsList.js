import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import React, {useContext, useState} from 'react';

import Loader from "../../Loader";
import CustomModal from "../../Modal";
import ErrorAlert from "../../ErrorAlert";
import TableSearch from "../../TableSearch";
import LittleLoader from "../../LittleLoader";
import {emitRemoveAgentSims} from "../../../redux/agents/actions";
import {emitRemoveCompanySims} from "../../../redux/companies/actions";
import {emitRemoveOperatorSims} from "../../../redux/operators/actions";
import {emitRemoveCollectorSims} from "../../../redux/collectors/actions";
import {
    dateToString,
    needleSearch,
    shouldShowError,
    processingRequest,
    extractDataInPartialRedux, formatNumber
} from "../../../helpers/functions";
import {
    DANGER,
    AGENT_SCOPE,
    COMPANY_SCOPE,
    OPERATOR_SCOPE,
    SIMS_LIST_SCOPE,
    COLLECTOR_SCOPE,
    SIM_EDIT_PAGE_PATH
} from "../../../helpers/constants";
import {
    AgentsContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    OperatorsContext,
    CompaniesContext,
    CollectorsContext,
} from "../../../helpers/contexts";

// Component
function SimsList({parentScope}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [deleteModal, setDeleteModal] = useState({show: false, header: '', body: '', type: '', id: 0});

    // Context states
    const errors = useContext(ErrorsContext);
    const agents = useContext(AgentsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);
    const companies = useContext(CompaniesContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const scope = SIMS_LIST_SCOPE;
    const extractData = extractDataInPartialRedux(parentScope, {agents, collectors, operators, companies});
    const sims = extractData.sims;

    // Trigger when sim delete confirmed on modal
    const handleDelete = (id) => {
        setDeleteModal({...deleteModal, show: false});
        const data = {id: extractData.id, sim: id};
        (parentScope === AGENT_SCOPE) && dispatch(emitRemoveAgentSims(data));
        (parentScope === COMPANY_SCOPE) && dispatch(emitRemoveCompanySims(data));
        (parentScope === OPERATOR_SCOPE) && dispatch(emitRemoveOperatorSims(data));
        (parentScope === COLLECTOR_SCOPE) && dispatch(emitRemoveCollectorSims(data));
    };

    // Render
    return (
        <>
            {processingRequest(parentScope, requests.list) ? <Loader/> : (
                <>
                    {shouldShowError(scope, errors.list) &&
                        <ErrorAlert scope={scope} />
                    }
                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap table-bordered">
                            <thead>
                            <tr>
                                <th>CREER LE</th>
                                <th>NOM</th>
                                <th>NUMERO</th>
                                <th>SOLDE</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchEngine(sims, needle).map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{dateToString(item.creation)}</td>
                                        <td>{item.name}</td>
                                        <td>{item.number}</td>
                                        <td className='text-right'>{formatNumber(item.balance)}</td>
                                        <td className='text-center'>
                                            {item.actionLoader ? <LittleLoader /> :
                                                <>
                                                    <Link className='text-primary mr-2'
                                                          to={{pathname: `${SIM_EDIT_PAGE_PATH}/${item.id}`}}>
                                                        <i className='fa fa-pencil' />
                                                    </Link>
                                                    <span className='text-danger hand-cursor'
                                                          onClick={() => setDeleteModal({
                                                              show: true,
                                                              type: DANGER,
                                                              id: item.id,
                                                              header: 'Suppression',
                                                              body: `
                                                                    Supprimer la puce commerciale 
                                                                    ${item.number} (${item.name})?
                                                                `
                                                          })}
                                                    >
                                                        <i className='fa fa-trash' />
                                                    </span>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                            {searchEngine(sims, needle).length === 0 &&
                            <tr>
                                <td colSpan={6}>
                                    <div className='alert alert-info text-center'>
                                        Pas de puces commerciale
                                    </div>
                                </td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>
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
                needleSearch(item.number, _needle) ||
                needleSearch(item.creation, _needle) ||
                needleSearch(item.balance, _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
SimsList.propTypes = {
    parentScope: PropTypes.string.isRequired,
};

export default React.memo(SimsList);

import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import React, {useState} from 'react';

import ViewSwitcher from "../ViewSwitcher";
import TableSearch from "../../TableSearch";
import LittleLoader from "../../LittleLoader";
import AgentsCard from "../agents/AgentsCard";
import {AGENT_EDIT_PAGE_PATH} from "../../../helpers/constants";
import {dateToString, needleSearch} from "../../../helpers/functions";

// Component
function ZonesAgentsPlain({agents}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [switcher, setSwitcher] = useState(false);

    const ActionButtons = ({item}) => {
        return (
            item.actionLoader ? <LittleLoader /> :
                <Link className='text-primary mr-2'
                      to={{pathname: `${AGENT_EDIT_PAGE_PATH}/${item.id}`}}>
                    <i className='fa fa-pencil' />
                </Link>
        )
    };

    // Render
    return (
        <>
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

// Prop types to ensure destroyed props data type
ZonesAgentsPlain.propTypes = {
    agents: PropTypes.array.isRequired,
};

export default React.memo(ZonesAgentsPlain);

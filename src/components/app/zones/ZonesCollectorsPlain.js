import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import React, {useState} from 'react';

import ViewSwitcher from "../ViewSwitcher";
import TableSearch from "../../TableSearch";
import CollectorsCard from "../collectors/CollectorsCard";
import {COLLECTOR_EDIT_PAGE_PATH} from "../../../helpers/constants";
import {dateToString, needleSearch} from "../../../helpers/functions";

// Component
function ZonesCollectorsPlain({collectors}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [switcher, setSwitcher] = useState(false);

    // Data
    const ActionButtons = ({item}) => {
        return (
                <Link className='text-primary mr-2'
                      to={{pathname: `${COLLECTOR_EDIT_PAGE_PATH}/${item.id}`}}>
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

// Prop types to ensure destroyed props data type
ZonesCollectorsPlain.propTypes = {
    collectors: PropTypes.array.isRequired,
};

export default React.memo(ZonesCollectorsPlain);
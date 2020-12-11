import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import React, {useState} from 'react';

import TableSearch from "../../TableSearch";
import LittleLoader from "../../LittleLoader";
import {SIM_EDIT_PAGE_PATH} from "../../../helpers/constants";
import {dateToString, needleSearch,} from "../../../helpers/functions";

// Component
function SimsListPlain({sims}) {
    // Local states
    const [needle, setNeedle] = useState('');

    // Render
    return (
        <>
            <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
            <div className="table-responsive">
                <table className="table table-hover text-nowrap table-bordered">
                    <thead>
                    <tr>
                        <th>CREER LE</th>
                        <th>NOM</th>
                        <th>NUMERO</th>
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
                                <td className='text-center'>
                                    {item.actionLoader ? <LittleLoader /> :
                                        <>
                                            <Link className='text-primary mr-2'
                                                  to={{pathname: `${SIM_EDIT_PAGE_PATH}/${item.id}`}}>
                                                <i className='fa fa-pencil' />
                                            </Link>
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
                needleSearch(item.reference, _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
SimsListPlain.propTypes = {
    sims: PropTypes.array.isRequired,
};

export default React.memo(SimsListPlain);

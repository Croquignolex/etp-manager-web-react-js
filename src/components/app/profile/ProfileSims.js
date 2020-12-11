import React, {useContext, useState} from 'react';

import TableSearch from "../../TableSearch";
import {UserContext} from "../../../helpers/contexts";
import {formatNumber, needleSearch} from "../../../helpers/functions";

// Component
function ProfileSims() {
    // Local states
    const [needle, setNeedle] = useState('');

    // Context states
    const user = useContext(UserContext);

    // Data
    const sims = searchEngine(user.sims, needle);

    // Render
    return (
        <>
            <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
            <div className="table-responsive">
                <table className="table table-hover text-nowrap table-bordered">
                    <thead>
                        <tr>
                            <th>NOM</th>
                            <th>NUMERO</th>
                            <th>SOLDE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sims.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.name}</td>
                                    <td>{item.number}</td>
                                    <td className='text-right'>{formatNumber(item.balance)}</td>
                                </tr>
                            )
                        })}
                        {sims.length === 0 &&
                            <tr>
                                <td colSpan={3}>
                                    <div className='alert alert-info text-center'>
                                        Pas de puces dispoonible
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
                needleSearch(item.balance, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default React.memo(ProfileSims);

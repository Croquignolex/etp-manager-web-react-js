import React, {useContext, useState} from 'react';

import Loader from "../../Loader";
import TableSearch from "../../TableSearch";
import {FLEET_SCOPE} from "../../../helpers/constants";
import {RequestsContext, FleetsContext} from "../../../helpers/contexts";
import {
    dateToString,
    needleSearch,
    processingRequest
} from "../../../helpers/functions";

// Component
function FleetsSupplies() {
    // Local states
    const [needle, setNeedle] = useState('');

    // Context states
    const fleets = useContext(FleetsContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = FLEET_SCOPE;
    const supplies = fleets.current.supplies;

    // Render
    return (
        <>
            {processingRequest(scope, requests.list) ? <Loader/> : (
                <>
                    <TableSearch needle={needle} handleNeedle={data => setNeedle(data)} />
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap table-bordered">
                            <thead>
                            <tr>
                                <th>CREER LE</th>
                                {/*<th>REFERENCE</th>*/}
                                <th>MONTANT</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchEngine(supplies, needle).map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{dateToString(item.creation)}</td>
                                        {/*<td>{item.reference}</td>*/}
                                        <td>{item.amount}</td>
                                    </tr>
                                )
                            })}
                            {searchEngine(supplies, needle).length === 0 &&
                            <tr>
                                <td colSpan={6}>
                                    <div className='alert alert-info text-center'>
                                        Pas d'approvisonnement
                                    </div>
                                </td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>
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
                needleSearch(item.amount, _needle) ||
                needleSearch(item.creation, _needle) ||
                needleSearch(item.reference, _needle)
            )
        });
    }
    // Return data
    return data;
}

export default React.memo(FleetsSupplies);

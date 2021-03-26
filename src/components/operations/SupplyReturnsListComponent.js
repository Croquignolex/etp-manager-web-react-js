import React from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {dateToString, formatNumber, requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function SupplyReturnsListComponent({returns, returnsRequestsList}) {
    // Render
    return (
        <>
            <strong className="text-theme">RETOURS FLOTTES</strong>
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>MONTANT</th>
                                <th>EMETTEUR</th>
                                <th>RECEPTEUR</th>
                                <th>RESPONSABLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestLoading(returnsRequestsList) ? <tr><td colSpan={5}><LoaderComponent /></td></tr> : (
                                requestFailed(returnsRequestsList) ? <tr><td colSpan={5}><ErrorAlertComponent message={returnsRequestsList.message} /></td></tr> : (
                                    <>
                                        {returns.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{dateToString(item.creation)}</td>
                                                    <td className='text-right'>{formatNumber(item.amount)}</td>
                                                    <td>{item.sim_outgoing.number}</td>
                                                    <td>{item.sim_incoming.number}</td>
                                                    <td>{item.collector.name}</td>
                                                </tr>
                                            )
                                        })}
                                        {returns.length === 0 && (
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className='alert custom-active text-center'>
                                                        Pas de retours flottes
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
SupplyReturnsListComponent.propTypes = {
    returns: PropTypes.array.isRequired,
    returnsRequestsList: PropTypes.object.isRequired,
};

export default React.memo(SupplyReturnsListComponent);

import React from 'react';
import PropTypes from "prop-types";

import {formatNumber} from "../../functions/generalFunctions";

// Component
function AgentSimsListComponent({sims}) {
    // Render
    return (
        <div className="card">
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
                        {sims.length === 0 && (
                            <tr>
                                <td colSpan={3}>
                                    <div className='alert custom-active text-center'>
                                        Pas de puces
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Prop types to ensure destroyed props data type
AgentSimsListComponent.propTypes = {
    sims: PropTypes.array.isRequired
};

export default React.memo(AgentSimsListComponent);

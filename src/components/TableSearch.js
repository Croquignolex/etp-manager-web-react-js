import React from 'react';
import PropTypes from 'prop-types';

// Component
function TableSearch({needle, handleNeedle}) {
    // Render
    return (
        <div className="card-header">
            <div className="card-tools">
                <div className="input-group input-group-sm">
                    {/* Search input */}
                    <input
                        type="text"
                        value={needle}
                        name="tableSearch"
                        placeholder="Rechercher..."
                        className="form-control float-right"
                        onChange={(e) => handleNeedle(e.target.value)}
                    />
                    {/* Search input */}
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                            <i className="fas fa-search" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Prop types to ensure destroyed props data type
TableSearch.propTypes = {
    needle: PropTypes.string.isRequired,
    handleNeedle: PropTypes.func.isRequired
};

export default React.memo(TableSearch)
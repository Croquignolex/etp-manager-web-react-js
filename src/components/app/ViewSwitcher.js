import React from 'react'
import PropTypes from 'prop-types';

// Component
const ViewSwitcher = ({isBlockView, handleSwitch}) => {
    // Render
    return (
        <div className='my-2'>
            <button onClick={handleSwitch}
                    className={`btn ${isBlockView ? 'btn-default' : 'btn-primary'}`}
                    title={`${isBlockView ? 'Blasculer vers une liste' : 'Basculer vers des blocs'}`}
            >
                {isBlockView
                    ? <i className='fa fa-align-justify' />
                    : <i className='fa fa-th-large' />
                }
            </button>
        </div>
    )
};

// Prop types to ensure destroyed props data type
ViewSwitcher.propTypes = {
    isBlockView: PropTypes.bool.isRequired,
    handleSwitch: PropTypes.func.isRequired,
};

export default React.memo(ViewSwitcher)
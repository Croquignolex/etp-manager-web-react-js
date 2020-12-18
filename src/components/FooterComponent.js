import React from 'react';
import PropTypes from 'prop-types';

import '../assets/scss/footer.scss';

// Component
function FooterComponent({needAbsolutePosition}) {
    // Render
    return (
        <footer className={`app-footer text-right ${needAbsolutePosition && 'absolute-position'}`}>
            <small><strong>Copyright &copy; 2020.</strong>&nbsp;&nbsp;All rights reserved.</small>
        </footer>
    )
}

// Prop types to ensure destroyed props data type
FooterComponent.propTypes = {
    needAbsolutePosition: PropTypes.bool
};

// Default props
FooterComponent.defaultProps = {
    needAbsolutePosition: false
};

export default React.memo(FooterComponent)
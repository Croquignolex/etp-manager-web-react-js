import React from "react";

// Component
function Loader() {
    // Render
    return (
        <div className='text-center'>
            <img alt='loading...'
                 src={require('../assets/images/spinner-theme.svg')}
            />
        </div>
    );
}

export default React.memo(Loader);

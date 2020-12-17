import React from "react";

// Component
function LoaderComponent() {
    // Render
    return (
        <div className='text-center'>
            <img alt='loading...' src={require('../assets/images/spinner-theme.svg')} className="img-fluid" />
        </div>
    );
}

export default React.memo(LoaderComponent);

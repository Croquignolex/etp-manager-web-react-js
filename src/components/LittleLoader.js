import React from "react";

// Component
function LittleLoader() {
    // Render
    return (
        <div className='text-center'>
            <img alt='loading...'
                 className="little-loader"
                 src={require('../assets/images/spinner-dark.svg')}
            />
        </div>
    );
}

export default React.memo(LittleLoader);

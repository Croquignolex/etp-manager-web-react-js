import React from 'react';
import PropTypes from 'prop-types';

// Component
function AgentCNIComponent({frontIDCard, backIDCard}) {
    // Data
    const Ribbon = ({text, image}) => {
        return (
            <div className="col-sm-6">
                <div className="position-relative">
                    <a href={image} data-toggle="lightbox" data-title={text} data-gallery="gallery">
                        <img src={image} className="img-fluid mb-2" alt="..."/>
                    </a>
                    <div className="ribbon-wrapper ribbon-lg">
                        <div className="ribbon bg-theme">{text}</div>
                    </div>
                </div>
            </div>
        )
    };

    // Render
    return (
        <div className='row'>
            <Ribbon text='Image avant' image={frontIDCard} />
            <Ribbon text='Image arrière' image={backIDCard} />
        </div>
    )
}

// Prop types to ensure destroyed props data type
AgentCNIComponent.propTypes = {
    backIDCard: PropTypes.string.isRequired,
    frontIDCard: PropTypes.string.isRequired,
};

// Connect component to Redux
export default React.memo(AgentCNIComponent);

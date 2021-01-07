import React from 'react';
import PropTypes from "prop-types";

import SimCardComponent from "./SimCardComponent";
import {simTypeBadgeColor} from "../../functions/typeFunctions";

// Component
function SimsCardsComponent({sims}) {
    // Render
    return (
        <div className="row m-1">
            {sims.map((item, key) => {
                return (
                    <div className="col-lg-4 col-md-6" key={key}>
                        <div className="card">
                            <div className={`${simTypeBadgeColor(item.type.name).background} card-header`}>
                                <h3 className="card-title">PUCE {simTypeBadgeColor(item.type.name).text}</h3>
                            </div>
                            <div className="card-body"><SimCardComponent sim={item} /></div>
                        </div>
                    </div>
                )
            })}
            {sims.length === 0 &&
                <div className="col-12">
                    <div className='alert custom-active text-center'>
                        Pas de puces
                    </div>
                </div>
            }
        </div>
    )
}

// Prop types to ensure destroyed props data type
SimsCardsComponent.propTypes = {
    sims: PropTypes.array.isRequired
};

export default React.memo(SimsCardsComponent);

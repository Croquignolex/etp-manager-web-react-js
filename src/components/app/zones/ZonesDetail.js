import {Link} from "react-router-dom";
import React, {useContext} from 'react';

import Loading from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {COLLECTOR_EDIT_PAGE_PATH, ZONE_SCOPE} from "../../../helpers/constants";
import {ZonesContext, ErrorsContext, RequestsContext} from "../../../helpers/contexts";
import {
    dateToString,
    shouldShowError,
    processingRequest,
    extractGoogleMapUrl
} from "../../../helpers/functions";

// Component
function ZonesDetail() {
    // Context states
    const zones = useContext(ZonesContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);

    // Destruct data
    const scope = ZONE_SCOPE;
    const requestFailed = shouldShowError(scope, errors.list);
    const requestProcessing = processingRequest(scope, requests.list);
    const {name, reference, description, creation, map, collector} = zones.current;

    // Render
    return (
        <div className="col-md-5">
            {/* Primary information */}
            <div className="card custom-card-outline">
                <div className="card-body box-profile">
                    {requestProcessing ? <Loading /> : (requestFailed ? <ErrorAlert scope={scope} /> : (
                            <>
                                <h3 className="profile-username text-center">{name}</h3>
                                <p className="text-muted text-center">{reference}</p>
                                <ul className="list-group list-group-unbordered mb-3">
                                    <li className="list-group-item">
                                        <b><i className='fa fa-calendar-alt' /> Date de céation</b>
                                        <span className="float-right">{dateToString(creation)}</span>
                                    </li>
                                </ul>
                            </>
                        )
                    )}
                </div>
            </div>
            {/* Secondary information*/}
            {(!requestFailed && !requestProcessing)  &&
                <div className="card custom-card-outline">
                    <div className="card-body">
                        <strong><i className="fa fa-user-secret mr-1" /> Description</strong>
                        <p className="text-muted">{description}</p>
                    </div>
                </div>
            }
            {/* Collector information */}
            {(!requestProcessing && !requestFailed) &&
                <div className="card custom-card-outline">
                    <div className="card-body">
                        <strong className='text-theme'>
                            <i className="fa fa-sim-card mr-1" /> Responsable
                        </strong>
                        <p className="text-muted">
                            <Link to={{pathname: `${COLLECTOR_EDIT_PAGE_PATH}/${collector.id}`}}>
                                {collector.name}
                            </Link>
                        </p>
                    </div>
                </div>
            }
            {/* Map */}
            {(!requestFailed && !requestProcessing) &&
                <div id="accordion1">
                    <div className="card custom-card-outline">
                        <div className="card-header" id="headingMap">
                            <strong className="mb-0">
                                <a data-toggle="collapse" data-parent="#accordion1" href="#collapseMap" className='text-theme'>
                                    <i className='fa fa-map-marked' /> Localisation
                                </a>
                            </strong>
                        </div>
                        <div id="collapseMap" className="collapse show" aria-labelledby="headingMap" data-parent="#accordion1">
                            <div className="card-body">
                                <div className='card card-widget'>
                                    <iframe src={extractGoogleMapUrl(map)}
                                            className='widget-user-header'
                                            style={{border:0}}
                                            allowFullScreen={true}
                                            title="googleMap"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default React.memo(ZonesDetail);
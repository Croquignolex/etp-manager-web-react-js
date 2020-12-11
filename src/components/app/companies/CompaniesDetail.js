import React, {useContext} from 'react';

import Loading from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {COMPANY_SCOPE} from "../../../helpers/constants";
import {ErrorsContext, RequestsContext, CompaniesContext} from "../../../helpers/contexts";
import {dateToString, processingRequest, shouldShowError} from "../../../helpers/functions";

// Component
function CompaniesDetail() {
    // Context states
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const companies = useContext(CompaniesContext);

    // Data
    const scope = COMPANY_SCOPE;
    const requestFailed = shouldShowError(scope, errors.list);
    const requestProcessing = processingRequest(scope, requests.list);
    const {name, description, phone, manager, address, document, creation} = companies.current;

    // Render
    return (
        <>
            {/* Primary information */}
            <div className="card card-primary custom-card-outline">
                <div className="card-body box-profile">
                    {requestProcessing ? <Loading /> : (requestFailed ? <ErrorAlert scope={scope} /> : (
                        <>
                            <h3 className="profile-username text-center">{name}</h3>
                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b><i className='fa fa-user-tie' /> Responsable</b>
                                    <span className="float-right">{manager}</span>
                                </li>
                                <li className="list-group-item">
                                    <b><i className='fa fa-phone' /> Téléphone</b>
                                    <span className="float-right">{phone}</span>
                                </li>
                                <li className="list-group-item">
                                    <b><i className='fa fa-calendar-alt' /> Date de céation</b>
                                    <span className="float-right">{dateToString(creation)}</span>
                                </li>
                            </ul>
                        </>
                    ))}
                </div>
            </div>
            {/* Secondary information */}
            {(!requestProcessing && !requestFailed) &&
                <>
                    <div className="card card-primary custom-card-outline">
                        <div className="card-body">
                            <strong><i className="fa fa-map-marker mr-1" /> Address</strong>
                            <p className="text-muted">{address}</p>
                            <hr />
                            <strong><i className="fa fa-user-secret mr-1" /> Description</strong>
                            <p className="text-muted">{description}</p>
                        </div>
                    </div>
                </>
            }
            {/* Document download link */}
            {(document) &&
                <div className="card custom-card-outline">
                    <div className="card-body">
                        <strong><i className="fa fa-file mr-1" /> Document</strong>
                        <p className="text-muted">
                            <a download
                               target='_blank'
                               href={document}
                               rel='noopener noreferrer'
                               className="btn btn-theme mt-2 btn-dark"
                            >
                                Apperçus <i className='fa fa-eye' />
                            </a>
                        </p>
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(CompaniesDetail);

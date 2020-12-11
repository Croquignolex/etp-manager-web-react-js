import React, {useContext, useEffect, useState} from 'react';

import Header from "../../components/app/Header";
import ErrorAlert from "../../components/ErrorAlert";
import Button from "../../components/app/form/Button";
import Select from "../../components/app/form/Select";
import {storeResetErrorData} from "../../redux/errors/actions";
import {emitCompareListing} from "../../redux/requests/actions";
import ListingHigherOrder from "../../components/layout/ListingHigherOrder";
import {requiredChecker, requiredFileChecker} from "../../helpers/formsChecker";
import {DispatchContext, ErrorsContext, RequestsContext, SimsContext} from "../../helpers/contexts";
import {
    mappedSims,
    shouldShowError,
    processingRequest,
    playWarningSound,
    dataToArrayForSelect, formatNumber
} from "../../helpers/functions";
import {
    SIMS_SCOPE,
    LISTING_SCOPE,
    FLEET_SIMS_TYPE,
    DEFAULT_FORM_DATA,
    IMPORT_LISTING_PAGE, WARNING, DANGER, SUCCESS
} from "../../helpers/constants";
import FileDocumentType from "../../components/app/form/FileDocumentType";

// Component
function ListingPage() {
    // Local state
    const [doc, setDoc] = useState(DEFAULT_FORM_DATA);
    const [managerSim, setManagerSim] = useState(DEFAULT_FORM_DATA);

    // Context states
    const sims = useContext(SimsContext);
    const errors = useContext(ErrorsContext);
    const requests = useContext(RequestsContext);
    const dispatch = useContext(DispatchContext);
    const {message, severity, importedLines, internalLines, internalBalance, importedBalance} = requests.listingResult;

    // Data
    const scope = LISTING_SCOPE;
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, [scope]);

    // Trigger listing form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _managerSim = requiredChecker(managerSim);
        const _document = requiredFileChecker(doc, 'xlsx');
        setManagerSim(_managerSim);
        // Set value
        setDoc(_document);
        const validationOK = (_document.isValid && _managerSim.isValid);
        // Check
        if(validationOK)
            dispatch(emitCompareListing({
                sim: _managerSim.val,
                document: _document.val,
            }));
        else playWarningSound();
    };

    // Listing display
    const ListingDisplay = () => (
        <div className='row'>
            <div className='col'>
                <div className={`alert alert-${severity}`}>
                    <div className='text-center mb-5'>
                        <h4>
                            <strong>
                                {(severity === DANGER.toLowerCase()) && <i className='fa fa-times' />}
                                {(severity === SUCCESS.toLowerCase()) && <i className='fa fa-check' />}
                                {(severity === WARNING.toLowerCase()) && <i className='fa fa-exclamation-triangle' />}
                                &nbsp;{message}
                            </strong>
                        </h4>
                    </div>
                    <ul>
                        <li><strong>Nombre de lignes importées:</strong>&nbsp;{formatNumber(importedLines)}</li>
                        <li><strong>Nombre de lignes dans l'application:</strong>&nbsp;{formatNumber(internalLines)}</li>
                        <li><strong>Solde importée:</strong>&nbsp;{formatNumber(importedBalance)}</li>
                        <li><strong>Solde dans l'application:</strong>&nbsp;{formatNumber(internalBalance)}</li>
                    </ul>
                </div>
            </div>
        </div>
    )

    // Render
    return (
        <div className="content-wrapper">
            <Header title={IMPORT_LISTING_PAGE} icon={'fa fa-list'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-8 col-sm-10 offset-lg-2 offset-sm-1">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    <div className="tab-content">
                                        {message && <ListingDisplay />}
                                        {shouldShowError(scope, errors.list) &&
                                            <ErrorAlert scope={scope} />
                                        }
                                        {/* Operator creation form */}
                                        <form onSubmit={handleSubmit}>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <Select input={managerSim}
                                                            id='inputSimManager'
                                                            title='Choisir une puce'
                                                            label='Puce de flottage'
                                                            requestProcessing={processingRequest(SIMS_SCOPE, requests.list)}
                                                            data={dataToArrayForSelect(mappedSims(sims.list.filter(item => FLEET_SIMS_TYPE.includes(item.type.name))))}
                                                            handleInput={(isValid, val) => {
                                                                shouldResetErrorData();
                                                                setManagerSim({...managerSim, isValid, val});
                                                            }}
                                                    />
                                                </div>
                                                <div className='col-sm-6'>
                                                    <FileDocumentType id='file' label='Fichier' input={doc}
                                                                      description="Le fichier doit être de type EXCEL et avoir une taille inférieure à 10Mo"
                                                                      handleInput={(isValid, val) => {
                                                                          shouldResetErrorData();
                                                                          setDoc({...doc, isValid, val});
                                                                      }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Button processing={processingRequest(scope, requests.list)} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListingHigherOrder(ListingPage);

import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import HeaderComponent from "../components/HeaderComponent";
import {SETTINGS_PAGE} from "../constants/pageNameConstants";
import {emitSettingsUpdate} from "../redux/settings/actions";
import {requiredChecker} from "../functions/checkerFunctions";
import InputComponent from "../components/form/InputComponent";
import {playWarningSound} from "../functions/playSoundFunctions";
import ButtonComponent from "../components/form/ButtonComponent";
import SelectComponent from "../components/form/SelectComponent";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import {storeSettingsRequestReset} from "../redux/requests/actions";
import TextareaComponent from "../components/form/TextareaComponent";
import CheckBoxComponent from "../components/form/CheckBoxComponent";
import {DEFAULT_ARRAY_FORM_DATA, DEFAULT_FORM_DATA} from "../constants/defaultConstants";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../functions/generalFunctions";

// Component
function SettingsPage({settings, request, dispatch, location}) {
    // Local state
    const [sound, setSound] = useState(settings.sound);
    const [bars, setBars] = useState({...DEFAULT_ARRAY_FORM_DATA, data: settings.bars});
    const [session, setSession] = useState({...DEFAULT_FORM_DATA, data: settings.session});
    const [cards, setCards] = useState({...DEFAULT_ARRAY_FORM_DATA, data: settings.cards});
    const [charts, setCharts] = useState({...DEFAULT_ARRAY_FORM_DATA, data: settings.charts});
    const [description, setDescription] = useState({...DEFAULT_FORM_DATA, data: settings.description});

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
        }
    }, [request]);

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Data
    const settingsData = useMemo(() => {
        return {
            bars: [
                // {value: 0, label: 'name'}
            ],
            cards: [
                {value: 0, label: 'Mon solde'},
                {value: 1, label: 'Flotte des PUCE DE FLOTTAGE'},
                {value: 2, label: 'Demandes de flote'},
                {value: 3, label: 'Agents'},
                {value: 4, label: 'Puces'},
                {value: 5, label: 'Demandes de déstockage'}
            ],
            charts: [
                {value: 0, label: 'Demandes de flote par status'},
                {value: 1, label: 'Puces par types'},
                {value: 2, label: 'Demandes de déstockage par status'},
            ]
        };
        // eslint-disable-next-line
    }, []);

    const handleCardSelect = (data) => {
        shouldResetErrorData();
        setCards({...cards,  isValid: true, data})
    }

    const handleChartSelect = (data) => {
        shouldResetErrorData();
        setCharts({...charts,  isValid: true, data})
    }

    const handleBarSelect = (data) => {
        shouldResetErrorData();
        setBars({...bars,  isValid: true, data})
    }

    const handleSoundCheckBox = (data) => {
        shouldResetErrorData();
        setSound(!data);
    }

    const handleSessionInput = (data) => {
        shouldResetErrorData();
        setSession({...session, isValid: true, data})
    }

    const handleDescriptionInput = (data) => {
        shouldResetErrorData();
        setDescription({...description, isValid: true, data})
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        requestFailed(request) && dispatch(storeSettingsRequestReset());
    };

    // Trigger setting form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _session = requiredChecker(session);
        // Set value
        setSession(_session);
        const validationOK = _session.isValid;
        // Check
        if(validationOK) {
            dispatch(emitSettingsUpdate({
                sound: sound,
                bars: bars.data,
                cards: cards.data,
                charts: charts.data,
                session: _session.data,
                description: description.data
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={SETTINGS_PAGE} icon={'fa fa-cogs'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-lg-8 col-sm-10 offset-lg-2 offset-sm-1">
                                <div className="card custom-card-outline">
                                    <div className="card-body">
                                        <div className="tab-content">
                                            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
                                            {/* Setting edit form */}
                                            <form onSubmit={handleSubmit}>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <SelectComponent multi={true}
                                                                         input={cards}
                                                                         id='inputCards'
                                                                         label='Blocs recapitulatifs'
                                                                         options={settingsData.cards}
                                                                         handleInput={handleCardSelect}
                                                                         title='Choisir les différents blocs recapitulatifs'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <SelectComponent multi={true}
                                                                         input={charts}
                                                                         id='inputCharts'
                                                                         label='Graphes de repartition'
                                                                         options={settingsData.charts}
                                                                         handleInput={handleChartSelect}
                                                                         title='Choisir les différents graphes de repartition'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <SelectComponent multi={true}
                                                                         input={bars}
                                                                         id='inputBars'
                                                                         options={settingsData.bars}
                                                                         handleInput={handleBarSelect}
                                                                         label='Graphes de progréssion'
                                                                         title='Choisir les différents graphes de progréssion'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <label htmlFor='sound'>Jouer le son</label>
                                                        <CheckBoxComponent id='sound'
                                                                           input={sound}
                                                                           center={false}
                                                                           handleInput={handleSoundCheckBox}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm-6'>
                                                        <InputComponent type='text'
                                                                        input={session}
                                                                        id='inputSession'
                                                                        label='Session (minute)'
                                                                        handleInput={handleSessionInput}
                                                        />
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <TextareaComponent label='Description'
                                                                           input={description}
                                                                           id='inputDescription'
                                                                           handleInput={handleDescriptionInput}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <ButtonComponent processing={requestLoading(request)} />
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
        </AppLayoutContainer>
    )
}

// Prop types to ensure destroyed props data type
SettingsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default React.memo(SettingsPage);
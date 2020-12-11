import React, {useContext, useState, useEffect} from 'react';

import Header from "../../components/app/Header";
import Input from "../../components/app/form/Input";
import ErrorAlert from "../../components/ErrorAlert";
import Button from "../../components/app/form/Button";
import Select from "../../components/app/form/Select";
import CheckBox from "../../components/app/form/CheckBox";
import TextArea from "../../components/app/form/Textarea";
import {requiredChecker} from "../../helpers/formsChecker";
import {emitUserSettingUpdate} from "../../redux/user/actions";
import {storeResetErrorData} from "../../redux/errors/actions";
import AppHigherOrder from "../../components/layout/AppHigherOrder";
import {
    ADMIN_ROLE,
    AGENT_ROLE,
    MANAGER_ROLE,
    SETTINGS_PAGE,
    SETTINGS_SCOPE,
    COLLECTOR_ROLE,
    DEFAULT_FORM_DATA,
    CASH_ACCOUNT_BALANCE,
    FLEET_ACCOUNT_BALANCE,
    DEFAULT_ARRAY_FORM_DATA
} from "../../helpers/constants";
import {
    shouldShowError,
    playWarningSound,
    processingRequest,
} from "../../helpers/functions";
import {
    UserContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from "../../helpers/contexts";

// Component
function SettingsPage() {
    // Local state
    const [sound, setSound] = useState(false);
    const [session, setSession] = useState(DEFAULT_FORM_DATA);
    const [bars, setBars] = useState(DEFAULT_ARRAY_FORM_DATA);
    const [cards, setCards] = useState(DEFAULT_ARRAY_FORM_DATA);
    const [charts, setCharts] = useState(DEFAULT_ARRAY_FORM_DATA);
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Context states
    const user = useContext(UserContext);
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const scope = SETTINGS_SCOPE;
    const roleSettingData = extractRoleSettingData(user.role.name);
    const shouldResetErrorData = () => {
        shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
    };

    useEffect(() => {
        setSound(user.setting.sound);
        setSession({...DEFAULT_FORM_DATA, val: user.setting.session});
        setBars({...DEFAULT_ARRAY_FORM_DATA, val: user.setting.bars});
        setCards({...DEFAULT_ARRAY_FORM_DATA, val: user.setting.cards});
        setCharts({...DEFAULT_ARRAY_FORM_DATA, val: user.setting.charts});
        setDescription({...DEFAULT_FORM_DATA, val: user.setting.description});
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Trigger setting form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _session = requiredChecker(session);
        // Set value
        setSession(_session);
        const validationOK = _session.isValid;
        // Check
        if(validationOK)
            dispatch(emitUserSettingUpdate({
                sound: sound,
                bars: bars.val,
                cards: cards.val,
                charts: charts.val,
                session: _session.val,
                description: description.val
            }));
        else playWarningSound();
    };

    // Render
    return (
        <div className="content-wrapper">
            <Header title={SETTINGS_PAGE} icon={'fa fa-cogs'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-8 col-sm-10 offset-lg-2 offset-sm-1">
                            <div className="card custom-card-outline">
                                <div className="card-body">
                                    <div className="tab-content">
                                        {shouldShowError(scope, errors.list) &&
                                        <ErrorAlert scope={scope} />
                                        }
                                        {/* Setting edit form */}
                                        <form onSubmit={handleSubmit}>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Select multi={true}
                                                            input={cards}
                                                            id='inputCards'
                                                            requestProcessing={false}
                                                            label='Blocs recapitulatifs'
                                                            data={roleSettingData.cards}
                                                            title='Choisir les différents blocs recapitulatifs'
                                                            handleInput={(isValid, val) => {
                                                                shouldResetErrorData();
                                                                setCards({...cards, isValid, val})
                                                            }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Select multi={true}
                                                            input={charts}
                                                            id='inputCharts'
                                                            requestProcessing={false}
                                                            label='Graphes de repartition'
                                                            data={roleSettingData.charts}
                                                            title='Choisir les différents graphes de repartition'
                                                            handleInput={(isValid, val) => {
                                                                shouldResetErrorData();
                                                                setCharts({...charts, isValid, val})
                                                            }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Select multi={true}
                                                            input={bars}
                                                            id='inputBars'
                                                            requestProcessing={false}
                                                            label='Graphes de progréssion'
                                                            data={roleSettingData.bars}
                                                            title='Choisir les différents graphes de progréssion'
                                                            handleInput={(isValid, val) => {
                                                                shouldResetErrorData();
                                                                setBars({...bars, isValid, val})
                                                            }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <label htmlFor='sound'>Jouer le son</label>
                                                    <CheckBox id='sound' input={sound} center={false}
                                                              handleInput={data => {
                                                                  shouldShowError(scope, errors.list) && dispatch(storeResetErrorData({scope}));
                                                                  setSound(!data)
                                                              }
                                                              }
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <Input type='number'
                                                           input={session}
                                                           id='inputSession'
                                                           label='Session (minute)'
                                                           handleInput={(isValid, val) => {
                                                               shouldResetErrorData();
                                                               setSession({...session, isValid, val})
                                                           }}
                                                    />
                                                </div>
                                                <div className='col-sm-6'>
                                                    <TextArea label='Description'
                                                              input={description}
                                                              id='inputDescription'
                                                              handleInput={(isValid, val) => {
                                                                  shouldResetErrorData();
                                                                  setDescription({...description, isValid, val})
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

// Extract user general setting data by his role
function extractRoleSettingData(role) {
    if(ADMIN_ROLE.includes(role)) return {
        bars: [
            // {value: 0, label: 'name'}
        ],
        cards: [
            {value: 0, label: CASH_ACCOUNT_BALANCE},
            {value: 1, label: 'Solde des SUPERVISEURS'},
            {value: 2, label: 'Flotte des MASTER SIM'},
            {value: 3, label: 'Solde des GESTIONNAIRES DE FLOTTE'},
            {value: 4, label: 'Flotte des PUCE DE FLOTTAGE'},
            {value: 5, label: 'Solde des RESPONSABLES DE ZONE'},
            {value: 6, label: 'Flotte des PUCE DES RESPONSABLES'},
            {value: 7, label: 'Solde des AGENTS'},
            {value: 8, label: 'Flotte des PUCE DES AGENTS'},
            {value: 9, label: 'Utilisateurs'},
            {value: 10, label: 'Opérateurs'},
            {value: 11, label: 'Puces'},
            {value: 12, label: 'Agents'},
            {value: 13, label: 'Zones'},
            {value: 14, label: 'Responsables de zone'},
            {value: 15, label: 'Demandes de flote'},
            {value: 16, label: 'Demandes de déstockage'}
        ],
        charts: [
            {value: 0, label: 'Solde par agents'},
            {value: 1, label: 'Solde par responsable'},
            {value: 2, label: 'Utilisateur par roles'},
            {value: 3, label: 'Agents par zones'},
            {value: 4, label: 'Responsables de zone par zones'},
            {value: 5, label: 'Puces par opérateurs'},
            {value: 6, label: 'Puces par types'},
            {value: 7, label: 'Demandes de flote par status'},
            {value: 8, label: 'Demandes de déstockage par status'},
        ]
    };
    else if(AGENT_ROLE.includes(role)) return {
        bars: [],
        cards: [
            {value: 0, label: CASH_ACCOUNT_BALANCE},
            {value: 1, label: FLEET_ACCOUNT_BALANCE},
            {value: 2, label: 'Puces'},
            {value: 3, label: 'Demandes de flote'},
            {value: 4, label: 'Demandes de déstockage'}
        ],
        charts: [
            {value: 0, label: 'Demandes de flote par status'},
            {value: 1, label: 'Demandes de déstockage par status'},
        ]
    };
    else if(MANAGER_ROLE.includes(role)) return {
        bars: [
            // {value: 0, label: 'name'}
        ],
        cards: [
            {value: 0, label: CASH_ACCOUNT_BALANCE},
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
    else if(COLLECTOR_ROLE.includes(role)) return {
        bars: [
            // {value: 0, label: 'name'}
        ],
        cards: [
            {value: 0, label: CASH_ACCOUNT_BALANCE},
            {value: 1, label: FLEET_ACCOUNT_BALANCE},
            {value: 2, label: 'Puces'},
            {value: 3, label: 'Demandes de flote'},
            {value: 4, label: 'Agents'},
            {value: 5, label: 'Demandes de déstockage'}
        ],
        charts: [
            {value: 0, label: 'Demandes de flote par status'},
            {value: 1, label: 'Demandes de déstockage par status'},
        ]
    };
    else return {bars: [], cards: [], charts: []};
}

export default AppHigherOrder(SettingsPage);
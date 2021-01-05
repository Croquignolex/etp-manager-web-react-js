import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import * as types from "../constants/typeConstants";
import * as path from "../constants/pagePathConstants";
import {emitAllSimsFetch} from "../redux/sims/actions";
import * as setting from "../constants/settingsConstants";
import {emitAllFleetsFetch} from "../redux/fleets/actions";
import {formatNumber} from "../functions/generalFunctions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import {SIMS_PAGE_PATH} from "../constants/pagePathConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {storeAllSimsRequestReset} from "../redux/requests/sims/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";

// Component
function DashboardPage({fleets, sims, settings, fleetsRequests, simsRequests, dispatch, location}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllFleetsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const fleetSimsFleetsData = useMemo(() => {
        return formatNumber(sims.filter(sim => types.FLEET_TYPE === sim.type.name).reduce((acc, val) => acc + val.balance, 0))
        // eslint-disable-next-line
    }, [sims]);

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className="row">
                            {/*{cardsData.includes(types.CARD_BALANCE) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCards color='bg-dark'
                                                    icon='fa fa-coin'
                                                    url={PROFILE_PAGE_PATH}
                                                    scope={USER_BALANCE_SCOPE}
                                                    label={CASH_ACCOUNT_BALANCE}
                                                    data={formatNumber(user.account.balance)}
                                    />
                                </div>
                            }*/}
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-phone'
                                                            color='bg-primary'
                                                            url={path.SIMS_PAGE_PATH}
                                                            request={simsRequests.all}
                                                            data={fleetSimsFleetsData}
                                                            label={setting.LABEL_FLEET_SIMS_FLEETS}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-rss'
                                                            color='bg-danger'
                                                            data={fleets.length}
                                                            request={fleetsRequests.all}
                                                            url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                            label={setting.LABEL_FLEETS_REQUESTS}
                                    />
                                </div>
                            }
                            {/*{cardsData.includes(3) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCards label="Agents"
                                                    color='bg-danger'
                                                    icon='fa fa-user-cog'
                                                    scope={AGENTS_SCOPE}
                                                    url={AGENTS_PAGE_PATH}
                                                    data={agents.list.length}
                                    />
                                </div>
                            }*/}
                            {cardsData.includes(setting.CARD_SIMS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-success'
                                                            data={sims.length}
                                                            url={SIMS_PAGE_PATH}
                                                            icon='fa fa-sim-card'
                                                            label={setting.LABEL_SIMS}
                                                            request={simsRequests.all}
                                    />
                                </div>
                            }
                            {/*{cardsData.includes(5) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCards color='bg-info'
                                                    icon='fa fa-rss-square'
                                                    scope={CLEARANCES_SCOPE}
                                                    data={clearances.list.length}
                                                    label="Demandes de déstockage"
                                                    url={REQUESTS_CLEARANCES_PAGE_PATH}
                                    />
                                </div>
                            }*/}
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutContainer>
    )
}

// Prop types to ensure destroyed props data type
DashboardPage.propTypes = {
    sims: PropTypes.array.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    simsRequests: PropTypes.object.isRequired,
    fleetsRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);
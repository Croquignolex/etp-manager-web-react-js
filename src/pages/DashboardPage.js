import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {SIMS_PAGE_PATH} from "../constants/pagePathConstants";
import {FLEET_TYPE} from "../constants/typeConstants";
import {formatNumber} from "../functions/generalFunctions";

// Component
function DashboardPage({settings, fleetsRequests, simsRequests, dispatch, location}) {
    // Data
    const cardsData = settings.cards;
    const fleetSimsFleetsData = useMemo(() => {
        return formatNumber(sims.list
                .filter(sim => FLEET_TYPE === sim.type.name)
                .reduce((acc, val) => acc + val.balance, 0)
        )
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className="row">
                            {/*{cardsData.includes(0) &&
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
                            {cardsData.includes(1) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-phone'
                                                            color='bg-primary'
                                                            request={simsRequests}
                                                            data={fleetSimsFleetsData}
                                                            label='TOTAL FLOTTES PUCES DE FLOTTAGES'
                                                            url={`${SIMS_PAGE_PATH}?search=${FLEET_TYPE}`}
                                    />
                                </div>
                            }
                            {/*{cardsData.includes(2) &&*/}
                            {/*    <div className="col-lg-3 col-md-4 col-sm-6">*/}
                            {/*        <DashboardCards icon='fa fa-rss'*/}
                            {/*                        color='bg-warning'*/}
                            {/*                        scope={FLEETS_SCOPE}*/}
                            {/*                        data={fleets.list.length}*/}
                            {/*                        label="Demandes de flotte"*/}
                            {/*                        url={REQUESTS_FLEETS_PAGE_PATH}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*}*/}
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
                            {/*{cardsData.includes(4) &&*/}
                            {/*    <div className="col-lg-3 col-md-4 col-sm-6">*/}
                            {/*        <DashboardCards label="Puces"*/}
                            {/*                        color='bg-success'*/}
                            {/*                        scope={SIMS_SCOPE}*/}
                            {/*                        url={SIMS_PAGE_PATH}*/}
                            {/*                        icon='fa fa-sim-card'*/}
                            {/*                        data={sims.list.length}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*}*/}
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
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    simsRequests: PropTypes.object.isRequired,
    fleetsRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);
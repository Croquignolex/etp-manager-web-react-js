import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import {PENDING} from "../constants/typeConstants";
import * as types from "../constants/typeConstants";
import * as path from "../constants/pagePathConstants";
import {emitAllSimsFetch} from "../redux/sims/actions";
import * as setting from "../constants/settingsConstants";
import {emitAllFleetsFetch} from "../redux/fleets/actions";
import {formatNumber} from "../functions/generalFunctions";
import {emitFetchUserBalance} from "../redux/user/actions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllClearancesFetch} from "../redux/clearances/actions";
import {storeAllSimsRequestReset} from "../redux/requests/sims/actions";
import {storeAllFleetsRequestReset} from "../redux/requests/fleets/actions";
import {storeUserBalanceFetchRequestReset} from "../redux/requests/user/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllClearancesRequestReset} from "../redux/requests/clearances/actions";

// Component
function DashboardPage({user, fleets, sims, clearances, agents, settings, dispatch, location, balanceUserRequests,
                           allClearancesRequests, allAgentsRequests, allFleetsRequests, allSimsRequests}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllFleetsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllClearancesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllFleetsRequestReset());
        dispatch(storeAllClearancesRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const fleetSimsFleetsData = useMemo(() => {
        return sims.filter(sim => types.FLEET_TYPE === sim.type.name).reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        // eslint-disable-next-line
    }, [sims]);
    const resourcesData = useMemo(() => {
        return agents.filter(agent => types.RESOURCE_TYPE === agent.reference).length
        // eslint-disable-next-line
    }, [agents]);


    const mtnFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status === PENDING) && fleet.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const orangeFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status === PENDING) && fleet.operator.id === '2');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const mtnClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status === PENDING) && clearance.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const orangeClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status === PENDING) && clearance.operator.id === '2');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);


    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className="row">
                            {cardsData.includes(setting.CARD_BALANCE) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-dark'
                                                            icon='fa fa-coin'
                                                            url={path.PROFILE_PAGE_PATH}
                                                            label={setting.LABEL_BALANCE}
                                                            request={balanceUserRequests}
                                                            data={formatNumber(user.balance)}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-phone'
                                                            color='bg-secondary'
                                                            request={allSimsRequests}
                                                            url={path.FLEETS_SIMS_PAGE_PATH}
                                                            label={setting.LABEL_FLEET_SIMS_FLEETS}
                                                            data={formatNumber(fleetSimsFleetsData)}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-rss'
                                                            color='bg-danger'
                                                            data={fleets.length}
                                                            request={allFleetsRequests}
                                                            url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                            label={setting.LABEL_FLEETS_REQUESTS}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-warning'
                                                            icon='fa fa-rss-square'
                                                            data={clearances.length}
                                                            request={allClearancesRequests}
                                                            url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                            label={setting.LABEL_CLEARANCES_REQUEST}
                                    />
                                </div>
                            }
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
    user: PropTypes.object.isRequired,
    fleets: PropTypes.array.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    clearances: PropTypes.array.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
    allFleetsRequests: PropTypes.object.isRequired,
    balanceUserRequests: PropTypes.object.isRequired,
    allClearancesRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);
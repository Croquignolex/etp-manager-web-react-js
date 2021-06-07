import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import {DONE} from "../constants/typeConstants";
import * as path from "../constants/pagePathConstants";
import * as setting from "../constants/settingsConstants";
import {emitAllFleetsFetch} from "../redux/fleets/actions";
import {formatNumber} from "../functions/generalFunctions";
import {emitFetchUserBalance} from "../redux/user/actions";
import {emitAllFleetSimsFetch} from "../redux/sims/actions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllClearancesFetch} from "../redux/clearances/actions";
import {storeAllFleetsRequestReset} from "../redux/requests/fleets/actions";
import {storeAllFleetSimsRequestReset} from "../redux/requests/sims/actions";
import {storeUserBalanceFetchRequestReset} from "../redux/requests/user/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllClearancesRequestReset} from "../redux/requests/clearances/actions";
import DashboardWithOperatorCardComponent from "../components/dashboard/DashboardWithOperatorCardComponent";

// Component
function DashboardPage({user, fleets, sims, clearances, settings, dispatch, location,
                           balanceUserRequests, allClearancesRequests, allFleetsRequests, simsRequests}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllFleetsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllFleetSimsFetch());
        dispatch(emitAllClearancesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllFleetsRequestReset());
        dispatch(storeAllFleetSimsRequestReset());
        dispatch(storeAllClearancesRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const mtnFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => (sim.operator.id === '1'));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const orangeFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => (sim.operator.id === '2'));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const mtnFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const orangeFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '2');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const mtnClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const orangeClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '2');
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
                                                            icon='fa fa-coins'
                                                            url={path.PROFILE_PAGE_PATH}
                                                            label={setting.LABEL_BALANCE}
                                                            request={balanceUserRequests}
                                                            data={formatNumber(user.balance)}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_MTN) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                        operator={{id: '1'}}
                                                                        request={simsRequests}
                                                                        url={path.FLEETS_SIMS_PAGE_PATH}
                                                                        data={formatNumber(mtnFleetSimsFleetsData.value)}
                                                                        label={`${setting.LABEL_FLEET_SIMS_FLEETS_MTN} (${mtnFleetSimsFleetsData.number})`}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_ORANGE) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                        operator={{id: '2'}}
                                                                        request={simsRequests}
                                                                        url={path.FLEETS_SIMS_PAGE_PATH}
                                                                        data={formatNumber(orangeFleetSimsFleetsData.value)}
                                                                        label={`${setting.LABEL_FLEET_SIMS_FLEETS_ORANGE} (${orangeFleetSimsFleetsData.number})`}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_MTN) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardWithOperatorCardComponent color='bg-success'
                                                            operator={{id: '1'}}
                                                            request={allFleetsRequests}
                                                            url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                            data={formatNumber(mtnFleetsData.value)}
                                                            label={`${setting.LABEL_FLEETS_REQUESTS_MTN} (${mtnFleetsData.number})`}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_ORANGE) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardWithOperatorCardComponent color='bg-success'
                                                                        operator={{id: '2'}}
                                                                        request={allFleetsRequests}
                                                                        url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                        data={formatNumber(orangeFleetsData.value)}
                                                                        label={`${setting.LABEL_FLEETS_REQUESTS_ORANGE} (${orangeFleetsData.number})`}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_MTN) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardWithOperatorCardComponent color='bg-primary'
                                                            operator={{id: '1'}}
                                                            request={allClearancesRequests}
                                                            url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                            data={formatNumber(mtnClearancesData.value)}
                                                            label={`${setting.LABEL_CLEARANCES_REQUEST_MTN} (${mtnClearancesData.number})`}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_ORANGE) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardWithOperatorCardComponent color='bg-primary'
                                                            operator={{id: '2'}}
                                                            request={allClearancesRequests}
                                                            url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                            data={formatNumber(orangeClearancesData.value)}
                                                            label={`${setting.LABEL_CLEARANCES_REQUEST_ORANGE} (${orangeClearancesData.number})`}
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
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    clearances: PropTypes.array.isRequired,
    simsRequests: PropTypes.object.isRequired,
    allFleetsRequests: PropTypes.object.isRequired,
    balanceUserRequests: PropTypes.object.isRequired,
    allClearancesRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);
import React, {useContext, useEffect} from 'react';

import DashboardCards from "../TopCard";
import {formatNumber} from "../../../../helpers/functions";
import {emitSimsFetch} from "../../../../redux/sims/actions";
import {emitUserBalance} from "../../../../redux/user/actions";
import {emitFleetsFetchByAgent} from "../../../../redux/fleets/actions";
import {emitClearancesFetchByAgent} from "../../../../redux/clearances/actions";
import AgentDashboardHigherOrder from "../../../layout/AgentDashboardHigherOrder";
import {
    UserContext,
    SimsContext,
    FleetsContext,
    DispatchContext,
    ClearancesContext
} from "../../../../helpers/contexts";
import {
    SIMS_SCOPE,
    FLEETS_SCOPE,
    SIMS_PAGE_PATH,
    CLEARANCES_SCOPE,
    PROFILE_PAGE_PATH,
    USER_BALANCE_SCOPE,
    CASH_ACCOUNT_BALANCE,
    FLEET_ACCOUNT_BALANCE,
    REQUESTS_FLEETS_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE_PATH
} from "../../../../helpers/constants";

// Component
function AgentDashboard() {
    // Context states
    const user = useContext(UserContext);
    const sims = useContext(SimsContext);
    const fleets = useContext(FleetsContext);
    const dispatch = useContext(DispatchContext);
    const clearances = useContext(ClearancesContext);

    useEffect(() => {
        dispatch(emitSimsFetch());
        dispatch(emitUserBalance());
        dispatch(emitFleetsFetchByAgent());
        dispatch(emitClearancesFetchByAgent());
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <>
            <div className="row">
                {user.setting.cards.includes(0) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards color='bg-dark'
                                        icon='fa fa-coin'
                                        url={PROFILE_PAGE_PATH}
                                        scope={USER_BALANCE_SCOPE}
                                        label={CASH_ACCOUNT_BALANCE}
                                        data={formatNumber(user.account.balance)}
                        />
                    </div>
                }
                {user.setting.cards.includes(1) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-phone'
                                        scope={SIMS_SCOPE}
                                        color='bg-primary'
                                        url={SIMS_PAGE_PATH}
                                        label={FLEET_ACCOUNT_BALANCE}
                                        data={
                                            formatNumber(
                                                sims.list
                                                    .filter(sim => user.id === sim.agent.id)
                                                    .reduce((acc, val) => acc + val.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(2) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards label="Puces"
                                        color='bg-success'
                                        scope={SIMS_SCOPE}
                                        icon='fa fa-sim-card'
                                        url={PROFILE_PAGE_PATH}
                                        data={user.sims.length}
                        />
                    </div>
                }
                {user.setting.cards.includes(3) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-rss'
                                        color='bg-warning'
                                        scope={FLEETS_SCOPE}
                                        label="Demandes de flote"
                                        data={fleets.list.length}
                                        url={REQUESTS_FLEETS_PAGE_PATH}
                        />
                    </div>
                }
                {user.setting.cards.includes(4) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards color='bg-danger'
                                        icon='fa fa-rss-square'
                                        scope={CLEARANCES_SCOPE}
                                        data={clearances.list.length}
                                        label="Demandes de déstockage"
                                        url={REQUESTS_CLEARANCES_PAGE_PATH}
                        />
                    </div>
                }
            </div>
            {/* TODO: Uncomment this while ready to show charts */}
            {/*<div className="row">
                {user.setting.charts.includes(0) &&
                    <div className="col-lg-4 col-sm-6"><AgentStatusFleetsChart/></div>
                }
                {user.setting.charts.includes(1) &&
                    <div className="col-lg-4 col-sm-6"><AgentStatusClearancesChart/></div>
                }
            </div>*/}
        </>
    )
}

export default AgentDashboardHigherOrder(AgentDashboard);
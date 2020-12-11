import React, {useContext, useEffect} from 'react';

import DashboardCards from "../TopCard";
import {formatNumber} from "../../../../helpers/functions";
import {emitSimsFetch} from "../../../../redux/sims/actions";
import {emitZonesFetch} from "../../../../redux/zones/actions";
import {emitUserBalance} from "../../../../redux/user/actions";
import {emitUsersFetch} from "../../../../redux/users/actions";
import {emitAgentsFetch} from "../../../../redux/agents/actions";
import {emitOperatorsFetch} from "../../../../redux/operators/actions";
import {emitCollectorsFetch} from "../../../../redux/collectors/actions";
import {emitFleetsFetchByManager} from "../../../../redux/fleets/actions";
import AdminDashboardHigherOrder from "../../../layout/AdminDashboardHigherOrder";
import {emitClearancesFetchByCollector} from "../../../../redux/clearances/actions";
import {
    MANAGER,
    SIMS_SCOPE,
    SUPERVISOR,
    FLEET_TYPE,
    ZONES_SCOPE,
    USERS_SCOPE,
    MASTER_TYPE,
    AGENTS_SCOPE,
    FLEETS_SCOPE,
    SIMS_PAGE_PATH,
    COLLECTOR_TYPE,
    OPERATORS_SCOPE,
    ZONES_PAGE_PATH,
    USERS_PAGE_PATH,
    AGENT_SIMS_TYPE,
    COLLECTORS_SCOPE,
    AGENTS_PAGE_PATH,
    CLEARANCES_SCOPE,
    PROFILE_PAGE_PATH,
    USER_BALANCE_SCOPE,
    OPERATORS_PAGE_PATH,
    CASH_ACCOUNT_BALANCE,
    COLLECTORS_PAGE_PATH,
    REQUESTS_FLEETS_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE_PATH,
} from "../../../../helpers/constants";
import {
    UserContext,
    SimsContext,
    ZonesContext,
    UsersContext,
    FleetsContext,
    AgentsContext,
    DispatchContext,
    OperatorsContext,
    CollectorsContext,
    ClearancesContext,
} from "../../../../helpers/contexts";

// Component
function AdminDashboard() {
    // Context states
    const user = useContext(UserContext);
    const sims = useContext(SimsContext);
    const zones = useContext(ZonesContext);
    const users = useContext(UsersContext);
    const agents = useContext(AgentsContext);
    const fleets = useContext(FleetsContext);
    const dispatch = useContext(DispatchContext);
    const operators = useContext(OperatorsContext);
    const collectors = useContext(CollectorsContext);
    const clearances = useContext(ClearancesContext);

    useEffect(() => {
        dispatch(emitSimsFetch());
        dispatch(emitUsersFetch());
        dispatch(emitZonesFetch());
        dispatch(emitUserBalance());
        dispatch(emitAgentsFetch());
        dispatch(emitOperatorsFetch());
        dispatch(emitCollectorsFetch());
        dispatch(emitFleetsFetchByManager());
        dispatch(emitClearancesFetchByCollector());
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
                        <DashboardCards icon='fa fa-coin'
                                        color='bg-success'
                                        scope={USERS_SCOPE}
                                        url={USERS_PAGE_PATH}
                                        label='Solde des SUPERVISEURS'
                                        data={
                                            formatNumber(
                                                users.list
                                                    .filter(user => SUPERVISOR === user.role.name)
                                                    .reduce((acc, val) => acc + val.account.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(2) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-phone'
                                        scope={SIMS_SCOPE}
                                        color='bg-primary'
                                        url={SIMS_PAGE_PATH}
                                        label='Flotte des MASTER SIM'
                                        data={
                                            formatNumber(
                                                sims.list
                                                    .filter(sim => MASTER_TYPE === sim.type.name)
                                                    .reduce((acc, val) => acc + val.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(3) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-coin'
                                        color='bg-success'
                                        scope={USERS_SCOPE}
                                        url={USERS_PAGE_PATH}
                                        label='Solde des GESTIONNAIRES DE FLOTTE'
                                        data={
                                            formatNumber(
                                                users.list
                                                    .filter(user => MANAGER === user.role.name)
                                                    .reduce((acc, val) => acc + val.account.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(4) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-phone'
                                        scope={SIMS_SCOPE}
                                        color='bg-primary'
                                        url={SIMS_PAGE_PATH}
                                        label='Flotte des PUCE DE FLOTTAGE'
                                        data={
                                            formatNumber(
                                                sims.list
                                                    .filter(sim => FLEET_TYPE === sim.type.name)
                                                    .reduce((acc, val) => acc + val.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(5) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-coin'
                                        color='bg-success'
                                        scope={COLLECTORS_SCOPE}
                                        url={COLLECTORS_PAGE_PATH}
                                        label='Solde des RESPONSABLES DE ZONE'
                                        data={
                                            formatNumber(
                                                collectors.list
                                                    .reduce((acc, val) => acc + val.account.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(6) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-phone'
                                        scope={SIMS_SCOPE}
                                        color='bg-primary'
                                        url={SIMS_PAGE_PATH}
                                        label='Flotte des PUCE DES RESPONSABLES'
                                        data={
                                            formatNumber(
                                                sims.list
                                                    .filter(sim => COLLECTOR_TYPE === sim.type.name)
                                                    .reduce((acc, val) => acc + val.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(7) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-coin'
                                        color='bg-success'
                                        scope={AGENTS_SCOPE}
                                        url={AGENTS_PAGE_PATH}
                                        label='Solde des AGENTS'
                                        data={
                                            formatNumber(
                                                agents.list
                                                    .reduce((acc, val) => acc + val.account.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(8) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-phone'
                                        scope={SIMS_SCOPE}
                                        color='bg-primary'
                                        url={SIMS_PAGE_PATH}
                                        label='Flotte des PUCE DES AGENTS'
                                        data={
                                            formatNumber(
                                                sims.list
                                                    .filter(sim => AGENT_SIMS_TYPE.includes(sim.type.name))
                                                    .reduce((acc, val) => acc + val.balance, 0)
                                            )
                                        }
                        />
                    </div>
                }
                {user.setting.cards.includes(9) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards color='bg-info'
                                        icon='fa fa-users'
                                        scope={USERS_SCOPE}
                                        label="Utilisateurs"
                                        url={USERS_PAGE_PATH}
                                        data={users.list.length}
                        />
                    </div>
                }
                {user.setting.cards.includes(10) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards label="Opérateurs"
                                        icon='fa fa-globe'
                                        color='bg-secondary'
                                        scope={OPERATORS_SCOPE}
                                        url={OPERATORS_PAGE_PATH}
                                        data={operators.list.length}
                        />
                    </div>
                }
                {user.setting.cards.includes(11) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards label="Puces"
                                        color='bg-warning'
                                        scope={SIMS_SCOPE}
                                        url={SIMS_PAGE_PATH}
                                        icon='fa fa-sim-card'
                                        data={sims.list.length}
                        />
                    </div>
                }
                {user.setting.cards.includes(12) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards label="Agents"
                                        color='bg-white'
                                        icon='fa fa-user-cog'
                                        scope={AGENTS_SCOPE}
                                        url={AGENTS_PAGE_PATH}
                                        data={agents.list.length}
                        />
                    </div>
                }
                {user.setting.cards.includes(13) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards label="Zones"
                                        icon='fa fa-map'
                                        color='bg-warning'
                                        scope={ZONES_SCOPE}
                                        url={ZONES_PAGE_PATH}
                                        data={zones.list.length}
                        />
                    </div>
                }
                {user.setting.cards.includes(14) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards color='bg-danger'
                                        icon='fa fa-user-clock'
                                        scope={COLLECTORS_SCOPE}
                                        url={COLLECTORS_PAGE_PATH}
                                        label="Responsables de zone"
                                        data={collectors.list.length}
                        />
                    </div>
                }
                {user.setting.cards.includes(15) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards icon='fa fa-rss'
                                        color='bg-white'
                                        scope={FLEETS_SCOPE}
                                        label="Demandes de flotte"
                                        data={fleets.list.length}
                                        url={REQUESTS_FLEETS_PAGE_PATH}
                        />
                    </div>
                }
                {user.setting.cards.includes(16) &&
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <DashboardCards color='bg-info'
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
                    <div className="col-lg-4 col-sm-6"><AdminAgentsBalancesChart/></div>
                }
                {user.setting.charts.includes(1) &&
                    <div className="col-lg-4 col-sm-6"><AdminCollectorsBalancesChart/></div>
                }
                {user.setting.charts.includes(2) &&
                    <div className="col-lg-4 col-sm-6"><AdminRolesUsersChart/></div>
                }
            </div>*/}
            {/*<div className="row">
                {user.setting.charts.includes(3) &&
                    <div className="col-lg-4 col-sm-6"><AdminZonesAgentsChart/></div>
                }
                {user.setting.charts.includes(4) &&
                    <div className="col-lg-4 col-sm-6"><AdminZonesCollectorsChart/></div>
                }
                {user.setting.charts.includes(5) &&
                    <div className="col-lg-4 col-sm-6"><AdminOperatorsSimsChart/></div>
                }
            </div>*/}
            {/*<div className="row">
                {user.setting.charts.includes(6) &&
                    <div className="col-lg-4 col-sm-6"><SimsTypesSimsChart/></div>
                }
                {user.setting.charts.includes(7) &&
                    <div className="col-lg-4 col-sm-6"><StatusFleetsChart/></div>
                }
                {user.setting.charts.includes(8) &&
                    <div className="col-lg-4 col-sm-6"><StatusClearancesChart/></div>
                }
            </div>*/}
        </>
    )
}

export default AdminDashboardHigherOrder(AdminDashboard);

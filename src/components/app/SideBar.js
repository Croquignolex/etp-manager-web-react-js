import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, {useState, useMemo} from 'react';

import {
    SIMS,
    USERS,
    ZONES,
    AGENTS,
    REQUESTS,
    APP_NAME,
    CHECKOUT,
    COMPANIES,
    OPERATORS,
    ADMIN_ROLE,
    MY_NETWORK,
    COLLECTORS,
    OPERATIONS,
    RECOVERIES,
    MANAGER_ROLE,
    LISTING_PAGE,
    SIM_NEW_PAGE,
    EVERYONE_ROLE,
    ALL_SIMS_PAGE,
    USER_NEW_PAGE,
    ZONE_NEW_PAGE,
    COLLECTOR_ROLE,
    AGENT_NEW_PAGE,
    ALL_USERS_PAGE,
    DASHBOARD_PAGE,
    ALL_ZONES_PAGE,
    SIMS_PAGE_PATH,
    ZONES_PAGE_PATH,
    ALL_AGENTS_PAGE,
    USERS_PAGE_PATH,
    COLLECTOR_FLEETS,
    AGENTS_PAGE_PATH,
    COMPANY_NEW_PAGE,
    SIM_NEW_PAGE_PATH,
    PROFILE_PAGE_PATH,
    HANDING_OVER_PAGE,
    LISTING_PAGE_PATH,
    OPERATOR_NEW_PAGE,
    ADMIN_MANAGER_ROLE,
    COLLECTOR_NEW_PAGE,
    ZONE_NEW_PAGE_PATH,
    ALL_OPERATORS_PAGE,
    USER_NEW_PAGE_PATH,
    SIM_EDIT_PAGE_PATH,
    ALL_COMPANIES_PAGE,
    COMPANIES_PAGE_PATH,
    AGENT_NEW_PAGE_PATH,
    DASHBOARD_PAGE_PATH,
    OPERATORS_PAGE_PATH,
    ZONE_EDIT_PAGE_PATH,
    ALL_COLLECTORS_PAGE,
    INVISIBLE_MENU_ITEM,
    USER_EDIT_PAGE_PATH,
    REQUESTS_FLEETS_PAGE,
    RECOVERIES_CASH_PAGE,
    AGENT_EDIT_PAGE_PATH,
    COLLECTORS_PAGE_PATH,
    CHECKOUT_OUTlAYS_PAGE,
    COMPANY_NEW_PAGE_PATH,
    RECOVERIES_FLEET_PAGE,
    COMPANY_EDIT_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE,
    HANDING_OVER_PAGE_PATH,
    OPERATOR_NEW_PAGE_PATH,
    CHECKOUT_PAYMENTS_PAGE,
    OPERATOR_EDIT_PAGE_PATH,
    OPERATIONS_AFFORDS_PAGE,
    COLLECTOR_NEW_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE,
    NETWORK_FLEETS_PAGE_PATH,
    COLLECTOR_EDIT_PAGE_PATH,
    RECOVERIES_CASH_PAGE_PATH,
    OPERATIONS_TRANSFERS_PAGE,
    REQUESTS_FLEETS_PAGE_PATH,
    COLLECTOR_FLEETS_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE,
    CHECKOUT_OUTLAYS_PAGE_PATH,
    CHECKOUT_PAYMENTS_PAGE_PATH,
    OPERATION_AFFORDS_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE_PATH,
    ADMIN_MANAGER_COLLECTOR_ROLE,
    REQUESTS_FLEET_NEW_PAGE_PATH,
    REQUESTS_FLEET_EDIT_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE_PATH,
    OPERATIONS_TRANSFERS_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE_PATH,
    REQUESTS_CLEARANCE_NEW_PAGE_PATH,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH,
} from "../../helpers/constants";

// Component
function AppSideBar({user, requests}) {
    // Local states
    const [toggle, setToggle] = useState({show: false, key: 0});

    // Data
    const {currentPath} = requests;
    const {role, name, avatar} = user;

    const authorisedMenu = useMemo(() => {
        let authorisedMenu = [];
        // Dashboard dropdown
        EVERYONE_ROLE.includes(role.name) && authorisedMenu.push({name: DASHBOARD_PAGE, path: DASHBOARD_PAGE_PATH, icon: 'fa fa-tachometer-alt', sub: []});
        // My network dropdown
        COLLECTOR_ROLE.includes(role.name) && authorisedMenu.push({name: MY_NETWORK, icon: 'fa fa-network-wired', sub: buildAuthorisedNetworkSubmenu()});
        // Requests dropdown
        EVERYONE_ROLE.includes(role.name) && authorisedMenu.push({name: REQUESTS, icon: 'fa fa-paste', sub: buildAuthorisedRequestsSubmenu()});
        // Operations dropdown
        EVERYONE_ROLE.includes(role.name) && authorisedMenu.push({name: OPERATIONS, icon: 'fa fa-exchange', sub: buildAuthorisedOperationsSubmenu(role.name)});
        // Recovery dropdown
        EVERYONE_ROLE.includes(role.name) && authorisedMenu.push({name: RECOVERIES, icon: 'fa fa-share', sub: buildAuthorisedRecoveriesSubmenu()});
        // Checkout dropdown
        MANAGER_ROLE.includes(role.name) && authorisedMenu.push({name: CHECKOUT, icon: 'fa fa-coins', sub: buildAuthorisedCheckoutSubmenu()});
        // Company dropdown
        ADMIN_ROLE.includes(role.name) && authorisedMenu.push({name: COMPANIES, icon: 'fa fa-university', sub: buildAuthorisedCompaniesSubmenu()});
        // Users dropdown
        ADMIN_ROLE.includes(role.name) && authorisedMenu.push({name: USERS, icon: 'fa fa-users', sub: buildAuthorisedUsersSubmenu()});
        // Agents dropdown
        ADMIN_MANAGER_COLLECTOR_ROLE.includes(role.name) && authorisedMenu.push({name: AGENTS, icon: 'fa fa-user-cog', sub: buildAuthorisedAgentSubmenu(role.name)});
        // Collectors dropdown
        ADMIN_ROLE.includes(role.name) && authorisedMenu.push({name: COLLECTORS, icon: 'fa fa-user-clock', sub: buildAuthorisedCollectorsSubmenu()});
        // Zones dropdown
        ADMIN_ROLE.includes(role.name) && authorisedMenu.push({name: ZONES, icon: 'fa fa-map', sub: buildAuthorisedZoneSubmenu()});
        // Sim cards dropdown
        ADMIN_MANAGER_ROLE.includes(role.name) && authorisedMenu.push({name: SIMS, icon: 'fa fa-sim-card', sub: buildAuthorisedSimsSubmenu(role.name)});
        // Operators dropdown
        ADMIN_ROLE.includes(role.name) && authorisedMenu.push({name: OPERATORS, icon: 'fa fa-globe', sub: buildAuthorisedOperatorsSubmenu()});
        // Listing dropdown
        ADMIN_ROLE.includes(role.name) && authorisedMenu.push({name: LISTING_PAGE, path: LISTING_PAGE_PATH, icon: 'fa fa-list', sub: []});
        return authorisedMenu;
        // eslint-disable-next-line
    }, [role.name]);

    // Render
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* App logo */}
            <span className="brand-link">
                    <img alt="logo..."
                         className="brand-image img-circle elevation-3"
                         src={require('../../assets/images/logo-square.png')}
                    />
                    <strong className="brand-text">{APP_NAME}</strong>
                </span>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={avatar} className="img-circle elevation-2" alt="avatar..."/>
                    </div>
                    <div className="info">
                        <Link className="text-white" to={PROFILE_PAGE_PATH}>{name}</Link>
                    </div>
                </div>
                {/* Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {authorisedMenu.map((prop, key) => {
                            if (prop.sub.length === 0) {
                                return (
                                    <li className="nav-item" key={key}>
                                        <Link to={prop.path}
                                              className={`${prop.path === currentPath && 'custom-active'} nav-link`}
                                        >
                                            <i className={`${prop.icon} nav-icon`}/>
                                            <p style={{fontSize: 14}}>{prop.name}</p>
                                        </Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className={`nav-item has-treeview ${(drawer(toggle, key, prop.sub, currentPath)) && 'menu-open'}`}
                                        key={key}>
                                        <a className="nav-link" href='http://'
                                           onClick={(e) => {
                                               e.preventDefault();
                                               setToggle({show: (toggle.key !== key) ? true : !toggle.show, key})
                                           }}
                                        >
                                            <i className={`${prop.icon} nav-icon`}/>
                                            <p style={{fontSize: 14}}>
                                                {prop.name}
                                                <i className="fas fa-angle-left right"/>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            {
                                                prop.sub.map((subProp, subKey) => {
                                                    if(subProp.name !== INVISIBLE_MENU_ITEM) {
                                                        return (
                                                            <li className="nav-item" key={subKey}>
                                                                <Link to={subProp.path}
                                                                      className={`${subProp.path === currentPath && 'custom-active'} nav-link ml-3`}
                                                                >
                                                                    <i className="far fa-circle nav-icon"/>
                                                                    <p style={{fontSize: 14}}>{subProp.name}</p>
                                                                </Link>
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

// Side bar drawer open
function drawer(toggle, key, sub, activePage) {
    let flag = false;
    // Event fired by page loaded
    sub.forEach(item => {
        if(item.path === activePage) flag = true;
    });
    // Event fired by mouse click
    const toggleStatus = (toggle.show && toggle.key === key);
    return (toggleStatus || flag);
}

// Build companies submenu
function buildAuthorisedCompaniesSubmenu() {
    return [
        {name: ALL_COMPANIES_PAGE, path: COMPANIES_PAGE_PATH},
        {name: COMPANY_NEW_PAGE, path: COMPANY_NEW_PAGE_PATH},
        {name: INVISIBLE_MENU_ITEM, path: `${COMPANY_EDIT_PAGE_PATH}/:id`},
    ];
}

// Build users submenu
function buildAuthorisedUsersSubmenu() {
    return [
        {name: ALL_USERS_PAGE, path: USERS_PAGE_PATH},
        {name: USER_NEW_PAGE, path: USER_NEW_PAGE_PATH},
        {name: INVISIBLE_MENU_ITEM, path: `${USER_EDIT_PAGE_PATH}/:id`},
    ];
}

// Build collectors submenu
function buildAuthorisedCollectorsSubmenu() {
    return [
        {name: ALL_COLLECTORS_PAGE, path: COLLECTORS_PAGE_PATH},
        {name: COLLECTOR_NEW_PAGE, path: COLLECTOR_NEW_PAGE_PATH},
        {name: COLLECTOR_FLEETS, path: COLLECTOR_FLEETS_PAGE_PATH},
        {name: INVISIBLE_MENU_ITEM, path: `${COLLECTOR_EDIT_PAGE_PATH}/:id`},
    ];
}

// Build operators submenu
function buildAuthorisedOperatorsSubmenu() {
    return [
        {name: ALL_OPERATORS_PAGE, path: OPERATORS_PAGE_PATH},
        {name: OPERATOR_NEW_PAGE, path: OPERATOR_NEW_PAGE_PATH},
        {name: INVISIBLE_MENU_ITEM, path: `${OPERATOR_EDIT_PAGE_PATH}/:id`}
    ];
}

// Build zones submenu
function buildAuthorisedZoneSubmenu() {
    return [
        {name: ALL_ZONES_PAGE, path: ZONES_PAGE_PATH},
        {name: ZONE_NEW_PAGE, path: ZONE_NEW_PAGE_PATH},
        {name: INVISIBLE_MENU_ITEM, path: `${ZONE_EDIT_PAGE_PATH}/:id`},
    ];
}

// Build sims submenu
function buildAuthorisedSimsSubmenu(role) {
    let authorisedSubmenu = [];
    // List link
    ADMIN_MANAGER_ROLE.includes(role) && authorisedSubmenu.push({name: ALL_SIMS_PAGE, path: SIMS_PAGE_PATH});
    // Add link
    ADMIN_ROLE.includes(role) && authorisedSubmenu.push({name: SIM_NEW_PAGE, path: SIM_NEW_PAGE_PATH});
    // Invisible menu item
    authorisedSubmenu.push({name: INVISIBLE_MENU_ITEM, path: `${SIM_EDIT_PAGE_PATH}/:id`});
    return authorisedSubmenu;
}

// Build agents submenu
function buildAuthorisedAgentSubmenu(role) {
    let authorisedSubmenu = [];
    // List link
    ADMIN_MANAGER_COLLECTOR_ROLE.includes(role) && authorisedSubmenu.push({name: ALL_AGENTS_PAGE, path: AGENTS_PAGE_PATH});
    // Add link
    ADMIN_MANAGER_COLLECTOR_ROLE.includes(role) && authorisedSubmenu.push({name: AGENT_NEW_PAGE, path: AGENT_NEW_PAGE_PATH});
    // Invisible menu item
    authorisedSubmenu.push({name: INVISIBLE_MENU_ITEM, path: `${AGENT_EDIT_PAGE_PATH}/:id`});
    return authorisedSubmenu;
}

// Build operations submenu
function buildAuthorisedOperationsSubmenu(role) {
    let authorisedSubmenu = [];
    // List link
    ADMIN_MANAGER_COLLECTOR_ROLE.includes(role) && authorisedSubmenu.push({name: OPERATIONS_TRANSFERS_PAGE, path: OPERATIONS_TRANSFERS_PAGE_PATH});
    authorisedSubmenu.push({name: OPERATIONS_FLEETS_PAGE, path: OPERATIONS_FLEETS_PAGE_PATH});
    ADMIN_MANAGER_COLLECTOR_ROLE.includes(role) && authorisedSubmenu.push({name: OPERATIONS_ANONYMOUS_FLEETS_PAGE, path: OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH});
    authorisedSubmenu.push({name: OPERATIONS_CLEARANCES_PAGE, path: OPERATIONS_CLEARANCES_PAGE_PATH});
    ADMIN_MANAGER_COLLECTOR_ROLE.includes(role) && authorisedSubmenu.push({name: OPERATIONS_AFFORDS_PAGE, path: OPERATION_AFFORDS_PAGE_PATH});
    return authorisedSubmenu;
}

// Build checkout submenu
function buildAuthorisedCheckoutSubmenu() {
    return [
        {name: CHECKOUT_PAYMENTS_PAGE, path: CHECKOUT_PAYMENTS_PAGE_PATH},
        {name: CHECKOUT_OUTlAYS_PAGE, path: CHECKOUT_OUTLAYS_PAGE_PATH},
        {name: HANDING_OVER_PAGE, path: HANDING_OVER_PAGE_PATH},
    ];
}

// Build recoveries submenu
function buildAuthorisedRecoveriesSubmenu() {
    return [
        {name: RECOVERIES_CASH_PAGE, path: RECOVERIES_CASH_PAGE_PATH},
        {name: RECOVERIES_FLEET_PAGE, path: RECOVERIES_FLEETS_PAGE_PATH},
    ];
}

// Build requests submenu
function buildAuthorisedRequestsSubmenu() {
    return [
        {name: REQUESTS_FLEETS_PAGE, path: REQUESTS_FLEETS_PAGE_PATH},
        {name: REQUESTS_CLEARANCES_PAGE, path: REQUESTS_CLEARANCES_PAGE_PATH},

        {name: INVISIBLE_MENU_ITEM, path: REQUESTS_FLEET_NEW_PAGE_PATH},
        {name: INVISIBLE_MENU_ITEM, path: REQUESTS_CLEARANCE_NEW_PAGE_PATH},
        {name: INVISIBLE_MENU_ITEM, path: `${REQUESTS_FLEET_EDIT_PAGE_PATH}/:id`},
        {name: INVISIBLE_MENU_ITEM, path: `${REQUESTS_FLEET_EDIT_PAGE_PATH}/:id`},
    ];
}

// Build requests submenu
function buildAuthorisedNetworkSubmenu() {
    return [
        {name: OPERATIONS_FLEETS_PAGE, path: NETWORK_FLEETS_PAGE_PATH}
    ];
}

// Prop types to ensure destroyed props data type
AppSideBar.propTypes = {
    user: PropTypes.object.isRequired,
    requests: PropTypes.object.isRequired
};

// Connect component to Redux
export default React.memo(AppSideBar);

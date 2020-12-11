import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

import {dateToString} from "../../helpers/functions";
import {emitUserLogout} from "../../redux/user/actions";
import {emitNotificationRead} from "../../redux/notifications/actions";
import {
    PROFILE_PAGE,
    SETTINGS_PAGE,
    PROFILE_PAGE_PATH,
    SETTINGS_PAGE_PATH,
    NOTIFICATIONS_PAGE_PATH,
} from "../../helpers/constants";

// Component
function AppNavBar({user, unreadNotifications, dispatch}) {
    // Data
    const {name, role} = user;

    // Render
    return (
        <nav id="app-navbar" className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Menu toggle*/}
            <ul className="navbar-nav">
                <li className="nav-item">
                        <span className="nav-link hand-cursor" data-widget="pushmenu">
                            <i className="fas fa-bars"/>
                        </span>
                </li>
            </ul>
            <ul className='navbar-nav ml-auto'>
                <li className='text-center'>
                    {name}<br/>
                    <strong className='text-theme'>{role.name}</strong>
                </li>
            </ul>
            {/* Nav bar*/}
            <ul className="navbar-nav ml-auto">
                {/* Notification menu */}
                <li className="nav-item dropdown">
                    <span className="nav-link hand-cursor" data-toggle="dropdown">
                        <i className="far fa-bell"/>
                        {unreadNotifications.length === 0
                            ? <span className="badge badge-success navbar-badge">0</span>
                            : <span className="badge badge-danger navbar-badge">{unreadNotifications.length}</span>
                        }
                    </span>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        {unreadNotifications.map((item, index) => (
                            (index < 5) &&
                                <Fragment key={index}>
                                    <Link className="dropdown-item"
                                          to={item.url}
                                          onClick={() => dispatch(emitNotificationRead({id: item.id}))}
                                    >
                                        <div className="media">
                                            <div className="media-body">
                                                <p className="text-sm">{item.message}</p>
                                                <p className="text-sm text-muted">
                                                    <i className={`far fa-clock mr-1 ${item.className}`} /> {dateToString(item.creation)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                        ))}
                        <Link className="dropdown-item dropdown-footer bg-theme" to={NOTIFICATIONS_PAGE_PATH}>
                            Voir toutes les notifications
                        </Link>
                    </div>
                </li>
                {/* User menu */}
                <li className="nav-item dropdown">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <span className="nav-link hand-cursor" data-toggle="dropdown">
                        <i className="far fa-user"/>
                    </span>
                    <div className="dropdown-menu dropdown-menu-lg min-width-200 dropdown-menu-right">
                        <Link to={PROFILE_PAGE_PATH} className="dropdown-item dropdown-header">
                            <i className='fa fa-user' /> {PROFILE_PAGE}
                        </Link>
                        <div className="dropdown-divider"/>
                        <Link to={SETTINGS_PAGE_PATH} className="dropdown-item dropdown-header">
                            <i className='fa fa-cogs' /> {SETTINGS_PAGE}
                        </Link>
                        <div className="dropdown-divider"/>
                        {/* Logout */}
                        <span className="dropdown-item dropdown-footer bg-danger text-white hand-cursor"
                              onClick={() => dispatch(emitUserLogout())}>
                                <i className='fa fa-sign-out' /> Deconnexion
                            </span>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

// Prop types to ensure destroyed props data type
AppNavBar.propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    unreadNotifications: PropTypes.array.isRequired,
};

export default React.memo(AppNavBar);
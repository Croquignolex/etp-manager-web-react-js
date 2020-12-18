import React from 'react';
import PropTypes from "prop-types";

import HeaderComponent from "../components/HeaderComponent";
import {PROFILE_PAGE} from "../constants/pageNameConstants";
import UsersDetailComponent from "../components/users/UsersDetailComponent";

// Component
function ProfilePage({user}) {
    // Render
    return (
        <div className="content-wrapper">
            <HeaderComponent title={PROFILE_PAGE} icon={'fa fa-user'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            {/* User information */}
                            <UsersDetailComponent user={user} />
                        </div>
                        <div className="col-lg-8 col-md-7 col-sm-6">
                            <div className="card custom-card-outline">
                                {/* Tab header*/}
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#password" data-toggle="tab">
                                                <i className='fa fa-key' /> Modifier le mot de passe
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#info" data-toggle="tab">
                                                <i className='fa fa-list' /> Modifier mes info
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#avatar" data-toggle="tab">
                                                <i className='fa fa-image' /> Modifier la photo
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Tab content */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="password">
                                            {/*Password update form*/}
                                            {/*<ProfilePassword />*/}
                                        </div>
                                        <div className="tab-pane" id="info">
                                            {/*Information update form*/}
                                            {/*<UsersEdit parentScope={scope} />*/}
                                        </div>
                                        <div className="tab-pane" id="avatar">
                                            {/* Avatar update form */}
                                            {/*<UsersAvatarEdit />*/}
                                        </div>
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

// Prop types to ensure destroyed props data type
ProfilePage.propTypes = {
    user: PropTypes.object.isRequired,
};

export default React.memo(ProfilePage);
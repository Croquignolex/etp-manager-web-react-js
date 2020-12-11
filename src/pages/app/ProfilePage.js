import React, {useContext} from 'react';

import Header from "../../components/app/Header";
import {UserContext} from "../../helpers/contexts";
import UsersEdit from "../../components/app/users/UsersEdit";
import UsersZone from "../../components/app/users/UsersZone";
import AgentsCNI from "../../components/app/agents/AgentsCNI";
import UsersDetail from "../../components/app/users/UsersDetail";
import ProfileSims from "../../components/app/profile/ProfileSims";
import AppHigherOrder from "../../components/layout/AppHigherOrder";
import UsersAvatarEdit from "../../components/app/users/UsersAvatarEdit";
import ProfilePassword from "../../components/app/profile/ProfilePassword";
import {
    AGENT_ROLE,
    PROFILE_PAGE,
    PROFILE_SCOPE,
    COLLECTOR_AGENT_ROLE
} from "../../helpers/constants";

// Component
function ProfilePage() {
    // Context states
    const user = useContext(UserContext);

    // Data
    const {role} = user;
    const scope = PROFILE_SCOPE;

    // Render
    return (
        <div className="content-wrapper">
            <Header title={PROFILE_PAGE} icon={'fa fa-user'} />
            <section className="content">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            {/* User information */}
                            <UsersDetail scope={scope} />
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
                                            <ProfilePassword />
                                        </div>
                                        <div className="tab-pane" id="info">
                                            {/*Information update form*/}
                                            <UsersEdit parentScope={scope} />
                                        </div>
                                        <div className="tab-pane" id="avatar">
                                            {/* Avatar update form */}
                                            <UsersAvatarEdit />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Agent data */}
                            {(COLLECTOR_AGENT_ROLE.includes(role.name)) &&
                                <div id="accordionAgent">
                                    {/* Zone */}
                                    <div className="card custom-card-outline">
                                        <div className="card-header" id="headingZone">
                                            <strong className="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordionAgent" href="#collapseAgent" className='text-theme'>
                                                    <i className='fa fa-map' /> Ma zone
                                                </a>
                                            </strong>
                                        </div>
                                        <div id="collapseAgent" className="collapse show" aria-labelledby="headingZone" data-parent="#accordionAgent">
                                            <div className="card-body">
                                                <UsersZone scope={scope} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Sims */}
                                    <div className="card custom-card-outline">
                                        <div className="card-header" id="headingSims">
                                            <strong className="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordionAgent" href="#collapseSims" className='text-theme'>
                                                    <i className='fa fa-sim-card' /> Mes puces
                                                </a>
                                            </strong>
                                        </div>
                                        <div id="collapseSims" className="collapse" aria-labelledby="headingSims" data-parent="#accordionAgent">
                                            <div className="card-body">
                                                <ProfileSims />
                                            </div>
                                        </div>
                                    </div>
                                    {AGENT_ROLE.includes(role.name) &&
                                        <>
                                            {/* CNI */}
                                            <div className="card custom-card-outline">
                                                <div className="card-header" id="headingCNI">
                                                    <strong className="mb-0">
                                                        <a data-toggle="collapse" data-parent="#accordionAgent" href="#collapseCNI" className='text-theme'>
                                                            <i className='fa fa-id-card' /> Ma CNI
                                                        </a>
                                                    </strong>
                                                </div>
                                                <div id="collapseCNI" className="collapse" aria-labelledby="headingCNI" data-parent="#accordionAgent">
                                                    <div className="card-body">
                                                        <AgentsCNI scope={scope} />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AppHigherOrder(ProfilePage);
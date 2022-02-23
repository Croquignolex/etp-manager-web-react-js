import React from 'react';
import PropTypes from "prop-types";

import {HOME_PAGE} from "../constants/pageNameConstants";
import HeaderComponent from "../components/HeaderComponent";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import HomeCardComponent from "../components/dashboard/HomeCardComponent";
import {
    FLEETS_SIMS_PAGE_PATH,
    REQUESTS_FLEETS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
    OPERATIONS_TRANSFERS_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE_PATH
} from "../constants/pagePathConstants";

// Component
function HomePage({location}) {
    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={HOME_PAGE} icon={'fa fa-home'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-lg-4 col-md-4 col-6">
                                <HomeCardComponent
                                    label="Demandes de flottes"
                                    color="bg-success"
                                    url={REQUESTS_FLEETS_PAGE_PATH}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <HomeCardComponent
                                    label="Flottages"
                                    color="bg-primary"
                                    url={OPERATIONS_FLEETS_PAGE_PATH}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <HomeCardComponent
                                    label="Déstockages"
                                    color="bg-danger"
                                    url={OPERATIONS_CLEARANCES_PAGE_PATH}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <HomeCardComponent
                                    label="Transferts de flottes"
                                    color="bg-warning"
                                    url={OPERATIONS_TRANSFERS_PAGE_PATH}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <HomeCardComponent
                                    label="Retour flottes"
                                    color="bg-info"
                                    url={RECOVERIES_FLEETS_PAGE_PATH}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <HomeCardComponent
                                    label="Mes comptes"
                                    color="bg-dark"
                                    url={FLEETS_SIMS_PAGE_PATH}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutContainer>
    )
}

// Prop types to ensure destroyed props data type
HomePage.propTypes = {
    location: PropTypes.object.isRequired
};

export default React.memo(HomePage);

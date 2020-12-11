import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitZoneFetch, emitZonesFetch} from "../../redux/zones/actions";
import {
    ZonesContext,
    AgentsContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    CollectorsContext,
} from '../../helpers/contexts'
import {
    ZONE_NEW_PAGE,
    ALL_ZONES_PAGE,
    ZONE_EDIT_PAGE,
    ZONES_PAGE_PATH,
    ZONE_NEW_PAGE_PATH,
    ZONE_EDIT_PAGE_PATH,
} from "../../helpers/constants";

// Component
function ZonesHigherOrder(WrappedComponent) {
    // Higher order component
    class ZonesHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === ZONE_NEW_PAGE_PATH) {
                document.title = getPageTitle(ZONE_NEW_PAGE);
            } else if(path === ZONES_PAGE_PATH) {
                dispatch(emitZonesFetch());
                document.title = getPageTitle(ALL_ZONES_PAGE);
            } else if (path ===`${ZONE_EDIT_PAGE_PATH}/:id`) {
                document.title = getPageTitle(ZONE_EDIT_PAGE);
                dispatch(emitZoneFetch({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, dispatch, zones, agents, collectors} = this.props;

            return (
                <ZonesContext.Provider value={zones}>
                    <AgentsContext.Provider value={agents}>
                        <ErrorsContext.Provider value={errors}>
                            <RequestsContext.Provider value={requests}>
                                <DispatchContext.Provider value={dispatch}>
                                    <CollectorsContext.Provider value={collectors}>
                                        <WrappedComponent />
                                    </CollectorsContext.Provider>
                                </DispatchContext.Provider>
                            </RequestsContext.Provider>
                        </ErrorsContext.Provider>
                    </AgentsContext.Provider>
                </ZonesContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    ZonesHigherOrderClass.propTypes = {
        zones: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
        collectors: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        zones: state.zones,
        errors: state.errors,
        agents: state.agents,
        requests: state.requests,
        collectors: state.collectors,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(ZonesHigherOrderClass);
}

export default ZonesHigherOrder;

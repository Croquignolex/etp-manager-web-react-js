import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getPageTitle} from "../../helpers/functions";
import {emitZonesFetch} from "../../redux/zones/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {emitCollectorsFleetsFetch} from "../../redux/supplies/actions";
import {emitCollectorFetch, emitCollectorsFetch} from "../../redux/collectors/actions";
import {
    ZonesContext,
    ErrorsContext,
    RequestsContext,
    DispatchContext,
    SuppliesContext,
    OperatorsContext,
    CollectorsContext,
} from '../../helpers/contexts'
import {
    COLLECTOR_NEW_PAGE,
    ALL_COLLECTORS_PAGE,
    COLLECTOR_EDIT_PAGE,
    COLLECTORS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE,
    COLLECTOR_NEW_PAGE_PATH,
    COLLECTOR_EDIT_PAGE_PATH,
    COLLECTOR_FLEETS_PAGE_PATH,
} from "../../helpers/constants";

// Component
function CollectorsHigherOrder(WrappedComponent) {
    // Higher order component
    class CollectorsHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === COLLECTOR_NEW_PAGE_PATH) {
                dispatch(emitZonesFetch());
                document.title = getPageTitle(COLLECTOR_NEW_PAGE);
            } else if(path === COLLECTORS_PAGE_PATH) {
                dispatch(emitCollectorsFetch());
                document.title = getPageTitle(ALL_COLLECTORS_PAGE);
            } else if(path === COLLECTOR_FLEETS_PAGE_PATH) {
                dispatch(emitCollectorsFleetsFetch());
                document.title = getPageTitle(OPERATIONS_FLEETS_PAGE);
            } else if (path ===`${COLLECTOR_EDIT_PAGE_PATH}/:id`) {
                document.title = getPageTitle(COLLECTOR_EDIT_PAGE);
                dispatch(emitCollectorFetch({id: match.params.id}));
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {requests, errors, dispatch, collectors, zones, operators, supplies, match} = this.props;

            return (
                <ZonesContext.Provider value={zones}>
                    <ErrorsContext.Provider value={errors}>
                        <RequestsContext.Provider value={requests}>
                            <DispatchContext.Provider value={dispatch}>
                                <SuppliesContext.Provider value={supplies}>
                                    <OperatorsContext.Provider value={operators}>
                                        <CollectorsContext.Provider value={collectors}>
                                            <WrappedComponent match={match} />
                                        </CollectorsContext.Provider>
                                    </OperatorsContext.Provider>
                                </SuppliesContext.Provider>
                            </DispatchContext.Provider>
                        </RequestsContext.Provider>
                    </ErrorsContext.Provider>
                </ZonesContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    CollectorsHigherOrderClass.propTypes = {
        zones: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
        supplies: PropTypes.object.isRequired,
        operators: PropTypes.object.isRequired,
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
        supplies: state.supplies,
        requests: state.requests,
        operators: state.operators,
        collectors: state.collectors,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(CollectorsHigherOrderClass);
}

export default CollectorsHigherOrder;

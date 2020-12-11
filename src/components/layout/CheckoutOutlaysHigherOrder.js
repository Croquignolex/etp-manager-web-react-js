import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {emitOutlaysFetch} from "../../redux/outlays/actions";
import {storeCurrentPath} from "../../redux/requests/actions";
import {CHECKOUT_OUTLAYS_PAGE_PATH} from "../../helpers/constants";
import {
    UserContext,
    ErrorsContext,
    OutlaysContext,
    DispatchContext,
    RequestsContext,
    CollectorsContext,
} from '../../helpers/contexts'

// Component
function CheckoutOutlaysHigherOrder(WrappedComponent) {
    // Higher order component
    class CheckoutOutlaysHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === CHECKOUT_OUTLAYS_PAGE_PATH) {
                // List page
                dispatch(emitOutlaysFetch());
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {user, errors, requests, dispatch, outlays, collectors} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <ErrorsContext.Provider value={errors}>
                        <OutlaysContext.Provider value={outlays}>
                            <RequestsContext.Provider value={requests}>
                                <DispatchContext.Provider value={dispatch}>
                                    <CollectorsContext.Provider value={collectors}>
                                        <WrappedComponent />
                                    </CollectorsContext.Provider>
                                </DispatchContext.Provider>
                            </RequestsContext.Provider>
                        </OutlaysContext.Provider>
                    </ErrorsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    CheckoutOutlaysHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        outlays: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        collectors: PropTypes.object.isRequired,
    };

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Map state function to component props
    const mapStateToProps = (state) => ({
        user: state.user,
        errors: state.errors,
        outlays: state.outlays,
        requests: state.requests,
        collectors: state.collectors,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(CheckoutOutlaysHigherOrderClass);
}

export default CheckoutOutlaysHigherOrder;

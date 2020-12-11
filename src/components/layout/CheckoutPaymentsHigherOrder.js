import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {storeCurrentPath} from "../../redux/requests/actions";
import {emitPaymentsFetch} from "../../redux/payments/actions";
import {CHECKOUT_PAYMENTS_PAGE_PATH} from "../../helpers/constants";
import {
    UserContext,
    ErrorsContext,
    DispatchContext,
    RequestsContext,
    PaymentsContext,
    CollectorsContext,
} from '../../helpers/contexts'

// Component
function CheckoutPaymentsHigherOrder(WrappedComponent) {
    // Higher order component
    class CheckoutPaymentsHigherOrderClass extends React.Component {

        componentDidMount() {
            const {dispatch, match} = this.props;
            const path = match.path;

            if(path === CHECKOUT_PAYMENTS_PAGE_PATH) {
                // List page
                dispatch(emitPaymentsFetch());
            }

            dispatch(storeCurrentPath({path}));
        }

        render() {
            // All store
            const {user, errors, requests, dispatch, payments, collectors} = this.props;

            return (
                <UserContext.Provider value={user}>
                    <ErrorsContext.Provider value={errors}>
                        <PaymentsContext.Provider value={payments}>
                            <RequestsContext.Provider value={requests}>
                                <DispatchContext.Provider value={dispatch}>
                                    <CollectorsContext.Provider value={collectors}>
                                        <WrappedComponent />
                                    </CollectorsContext.Provider>
                                </DispatchContext.Provider>
                            </RequestsContext.Provider>
                        </PaymentsContext.Provider>
                    </ErrorsContext.Provider>
                </UserContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    CheckoutPaymentsHigherOrderClass.propTypes = {
        user: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        requests: PropTypes.object.isRequired,
        payments: PropTypes.object.isRequired,
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
        requests: state.requests,
        payments: state.payments,
        collectors: state.collectors,
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentsHigherOrderClass);
}

export default CheckoutPaymentsHigherOrder;

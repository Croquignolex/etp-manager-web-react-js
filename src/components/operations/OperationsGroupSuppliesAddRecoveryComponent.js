import PropTypes from "prop-types";
import React, {useEffect} from 'react';

import DisabledInput from "../form/DisabledInput";
import ButtonComponent from "../form/ButtonComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitGroupSupplyAddRecovery} from "../../redux/supplies/actions";
import {storeRecoverRequestReset} from "../../redux/requests/recoveries/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function OperationsGroupSuppliesAddRecoveryComponent({supply, request, dispatch, handleClose}) {
    const amount = supply.reduce((acc, val) => acc + val.remaining, 0);

    // Local effects
    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);


    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeRecoverRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const ids = [];
        supply.forEach(item => {
            ids.push(item.id);
        });
        dispatch(emitGroupSupplyAddRecovery({
            ids,
            amount
        }));
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <DisabledInput id='inputAgent'
                                       label='Agent/Ressource'
                                       val={supply[0].agent.name}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <DisabledInput id='inputNumber'
                                       val={supply.length}
                                       label='Flottages groupés'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <DisabledInput val={amount}
                                       id='inputAmount'
                                       label='Montant à récouvrir'
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsGroupSuppliesAddRecoveryComponent.propTypes = {
    supply: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default React.memo(OperationsGroupSuppliesAddRecoveryComponent);

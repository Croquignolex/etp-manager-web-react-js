import PropTypes from "prop-types";
import {Pie} from "react-chartjs-2";
import React, {useContext, useEffect} from 'react';

import Loader from "../../Loader";
import ErrorAlert from "../../ErrorAlert";
import {storeResetErrorData} from "../../../redux/errors/actions";
import {DispatchContext, ErrorsContext, RequestsContext} from "../../../helpers/contexts";
import {formatString, processingRequest, shouldShowError} from "../../../helpers/functions";

// Component
function DetailCard({title, handleRefresh, charData, scope}) {
    // Context states
    const errors = useContext(ErrorsContext);
    const dispatch = useContext(DispatchContext);
    const requests = useContext(RequestsContext);

    // Data
    const {data, backgroundColor, labels} = charData;

    useEffect(() => {
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            dispatch(storeResetErrorData({scope}));
        };
        // eslint-disable-next-line
    }, []);

    // Render
    return (
        <>
            <div className="card custom-card-outline">
                <div className="card-header">
                    <small title={title}>
                        {formatString(title, 50)}
                    </small>
                    <div className="card-tools">
                        {!processingRequest(scope, requests.list) &&
                            <button type="button"
                                    className="btn btn-tool"
                                    onClick={handleRefresh}
                            >
                                <i className="fas fa-sync-alt" />
                            </button>
                        }
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus" />
                        </button>
                        <button type="button" className="btn btn-tool" data-card-widget="maximize">
                            <i className="fas fa-expand" />
                        </button>
                        <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="chart-responsive">
                                {processingRequest(scope, requests.list) ? <Loader /> : (shouldShowError(scope, errors.list) ? <ErrorAlert scope={scope} /> : (
                                        <Pie data={{datasets: [{data, backgroundColor}], labels}}/>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
DetailCard.propTypes = {
    scope: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    charData: PropTypes.object.isRequired,
    handleRefresh: PropTypes.func.isRequired,
};

export default React.memo(DetailCard);
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import {REQUESTS_FLEETS_PAGE} from "../../constants/pageNameConstants";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeFleetsRequestReset} from "../../redux/requests/fleets/actions";
import FleetsCardsComponent from "../../components/fleets/FleetsCardsComponent";
import {emitFleetsFetch, emitNextFleetsFetch} from "../../redux/fleets/actions";
import {
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function RequestsFleetsPage({fleets, fleetsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');

    // Local effects
    useEffect(() => {
        dispatch(emitFleetsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        requestFailed(fleetsRequests.list) && dispatch(storeFleetsRequestReset());
    };

    const handleNextFleetsData = () => {
        dispatch(emitNextFleetsFetch({page}));
    }

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={REQUESTS_FLEETS_PAGE} icon={'fa fa-rss'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className="row">
                            <div className="col-12">
                                <div className="card custom-card-outline">
                                    {/* Search input */}
                                    <div className="card-header">
                                        <div className="card-tools">
                                            <TableSearchComponent needle={needle} handleNeedle={handleNeedleInput} />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {/* Error message */}
                                        {requestFailed(fleetsRequests.list) && <ErrorAlertComponent message={fleetsRequests.list.message} />}
                                        {requestLoading(fleetsRequests.list) ? <LoaderComponent /> :
                                            <InfiniteScroll hasMore={hasMoreData}
                                                            dataLength={fleets.length}
                                                            next={handleNextFleetsData}
                                                            loader={<LoaderComponent little={true} />}
                                            >
                                                <FleetsCardsComponent dispatch={dispatch} fleets={fleets} />
                                            </InfiniteScroll>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutContainer>
    )
}

// Search engine
function searchEngine(data, _needle) {
    // Avoid empty filtering
    if(_needle !== '' && _needle !== undefined) {
        // Filter
        data = data.filter((item) => {
            return (
                needleSearch(item.message, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
RequestsFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    fleetsRequests: PropTypes.object.isRequired
};

export default React.memo(RequestsFleetsPage);
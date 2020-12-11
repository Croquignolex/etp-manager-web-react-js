import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "./DetailCard";
import {FLEETS_SCOPE} from "../../../helpers/constants";
import {fleetsByTypeChartData} from "../../../helpers/functions";
import {emitFleetsFetchByManager} from "../../../redux/fleets/actions";
import {DispatchContext, FleetsContext} from "../../../helpers/contexts";

// Component
function StatusFleetsChart() {
    // Context states
    const fleets = useContext(FleetsContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch(emitFleetsFetchByManager());
        // eslint-disable-next-line
    }, []);

    // Data
    const charData = useMemo(() => {
        return fleetsByTypeChartData(fleets.list);
        // eslint-disable-next-line
    }, [fleets]);

    // Render
    return (
        <DetailCard charData={charData}
                    scope={FLEETS_SCOPE}
                    title='Demandes de flote par status'
                    handleRefresh={() => dispatch(emitFleetsFetchByManager())}
        />
    )
}

export default React.memo(StatusFleetsChart);

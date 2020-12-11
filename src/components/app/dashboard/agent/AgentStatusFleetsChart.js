import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {FLEETS_SCOPE} from "../../../../helpers/constants";
import {fleetsByTypeChartData} from "../../../../helpers/functions";
import {emitFleetsFetchByAgent} from "../../../../redux/fleets/actions";
import {FleetsContext, DispatchContext} from "../../../../helpers/contexts";

// Component
function AgentStatusFleetsChart() {
    // Context states
    const fleets = useContext(FleetsContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch(emitFleetsFetchByAgent());
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
                    handleRefresh={() => dispatch(emitFleetsFetchByAgent())}
                    title='Demandes de flote par statuts'
        />
    )
}

export default React.memo(AgentStatusFleetsChart);
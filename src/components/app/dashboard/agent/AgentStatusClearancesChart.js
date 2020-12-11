import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {CLEARANCES_SCOPE} from "../../../../helpers/constants";
import {fleetsByTypeChartData} from "../../../../helpers/functions";
import {emitClearancesFetchByAgent} from "../../../../redux/clearances/actions";
import {DispatchContext, ClearancesContext} from "../../../../helpers/contexts";

// Component
function AgentStatusClearancesChart() {
    // Context states
    const dispatch = useContext(DispatchContext);
    const clearances = useContext(ClearancesContext);

    useEffect(() => {
        dispatch(emitClearancesFetchByAgent());
        // eslint-disable-next-line
    }, []);

    // Data
    const charData = useMemo(() => {
        return fleetsByTypeChartData(clearances.list);
        // eslint-disable-next-line
    }, [clearances]);

    // Render
    return (
        <DetailCard charData={charData}
                    scope={CLEARANCES_SCOPE}
                    handleRefresh={() => dispatch(emitClearancesFetchByAgent())}
                    title='Demandes de déstockage par statuts'
        />
    )
}

export default React.memo(AgentStatusClearancesChart);
import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "./DetailCard";
import {CLEARANCES_SCOPE} from "../../../helpers/constants";
import {fleetsByTypeChartData} from "../../../helpers/functions";
import {ClearancesContext, DispatchContext} from "../../../helpers/contexts";
import {emitClearancesFetchByCollector} from "../../../redux/clearances/actions";

// Component
function StatusClearancesChart() {
    // Context states
    const dispatch = useContext(DispatchContext);
    const clearances = useContext(ClearancesContext);

    useEffect(() => {
        dispatch(emitClearancesFetchByCollector());
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
                    title='Demandes de déstockage par statuts'
                    handleRefresh={() => dispatch(emitClearancesFetchByCollector())}
        />
    )
}

export default React.memo(StatusClearancesChart);

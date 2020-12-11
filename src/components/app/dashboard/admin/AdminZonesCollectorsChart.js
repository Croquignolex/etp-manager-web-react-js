import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {groupArrayBy} from "../../../../helpers/functions";
import {COLLECTORS_SCOPE} from "../../../../helpers/constants";
import {emitCollectorsFetch} from "../../../../redux/collectors/actions";
import {DispatchContext, CollectorsContext} from "../../../../helpers/contexts";

// Component
function AdminZonesCollectorsChart() {
    // Context states
    const dispatch = useContext(DispatchContext);
    const collectors = useContext(CollectorsContext);

    useEffect(() => {
        dispatch(emitCollectorsFetch());
        // eslint-disable-next-line
    }, []);

    // Data
    const charData = useMemo(() => {
        // Data
        const data = [];
        const labels = [];
        const backgroundColor = [];
        // Proceed
        const groupedCollectors = groupArrayBy(collectors.list, collector => collector.zone.id);
        groupedCollectors.forEach(collectorGroup => {
            data.push(collectorGroup.length);
            labels.push(collectorGroup[0].zone.name);
            backgroundColor.push('#' + Math.floor(Math.random()*16777215).toString(16));
        });
        // Return
        return {data, labels, backgroundColor}
        // eslint-disable-next-line
    }, [collectors]);

    // Render
    return (
        <DetailCard charData={charData}
                    scope={COLLECTORS_SCOPE}
                    title='Responsables de zone par zones'
                    handleRefresh={() => dispatch(emitCollectorsFetch())}
        />
    )
}

export default React.memo(AdminZonesCollectorsChart);
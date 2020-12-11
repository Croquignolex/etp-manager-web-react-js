import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {SIMS_SCOPE} from "../../../../helpers/constants";
import {groupArrayBy} from "../../../../helpers/functions";
import {emitSimsFetch} from "../../../../redux/sims/actions";
import {DispatchContext, SimsContext} from "../../../../helpers/contexts";

// Component
function AdminOperatorsSimsChart() {
    // Context states
    const sims = useContext(SimsContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch(emitSimsFetch());
        // eslint-disable-next-line
    }, []);

    // Data
    const charData = useMemo(() => {
        // Data
        const data = [];
        const labels = [];
        const backgroundColor = [];
        // Proceed
        const groupedSims = groupArrayBy(sims.list, sim => sim.operator.id);
        groupedSims.forEach(simGroup => {
            const operatorChartData = {label: simGroup[0].operator.name, background: '#' + Math.floor(Math.random()*16777215).toString(16)};
            data.push(simGroup.length);
            labels.push(operatorChartData.label);
            backgroundColor.push(operatorChartData.background);
        });
        // Return
        return {data, labels, backgroundColor}
        // eslint-disable-next-line
    }, [sims]);

    // Render
    return (
        <DetailCard scope={SIMS_SCOPE}
                    charData={charData}
                    title='Puces par opérateurs'
                    handleRefresh={() => dispatch(emitSimsFetch())}
        />
    )
}

export default React.memo(AdminOperatorsSimsChart);
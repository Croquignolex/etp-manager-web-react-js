import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "./DetailCard";
import {groupArrayBy} from "../../../helpers/functions";
import {emitSimsFetch} from "../../../redux/sims/actions";
import {DispatchContext, SimsContext} from "../../../helpers/contexts";
import {
    UNKNOWN,
    AGENT_TYPE,
    FLEET_TYPE,
    SIMS_SCOPE,
    MASTER_TYPE,
    ETP_AGENT_TYPE,
    CORPORATE_TYPE,
    COLLECTOR_TYPE
} from "../../../helpers/constants";

// Component
function SimsTypesSimsChart() {
    // Context states
    const sims = useContext(SimsContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch(emitSimsFetch());
        // eslint-disable-next-line
    }, []);

    // Data
    // Data
    const charData = useMemo(() => {
        // Data
        const data = [];
        const labels = [];
        const backgroundColor = [];
        // Proceed
        const groupedSims = groupArrayBy(sims.list, sim => sim.type.id);
        groupedSims.forEach(simGroup => {
            let typeChartData;
            switch (simGroup[0].type.name) {
                case AGENT_TYPE: typeChartData = {label: AGENT_TYPE, background: '#007bff'}; break;
                case FLEET_TYPE: typeChartData = {label: FLEET_TYPE, background: '#e08e0b'}; break;
                case MASTER_TYPE: typeChartData = {label: MASTER_TYPE, background: '#dd4b39'}; break;
                case ETP_AGENT_TYPE: typeChartData = {label: ETP_AGENT_TYPE, background: '#00acd6'}; break;
                case CORPORATE_TYPE: typeChartData = {label: CORPORATE_TYPE, background: '#737375'}; break;
                case COLLECTOR_TYPE: typeChartData = {label: COLLECTOR_TYPE, background: '#008d4c'}; break;
                default: typeChartData = {label: UNKNOWN, background: '#ffffff'};
            }
            data.push(simGroup.length);
            labels.push(typeChartData.label);
            backgroundColor.push(typeChartData.background);
        });
        // Return
        return {data, labels, backgroundColor}
        // eslint-disable-next-line
    }, [sims]);

    // Render
    return (
        <DetailCard scope={SIMS_SCOPE}
                    charData={charData}
                    title='Puces par types'
                    handleRefresh={() => dispatch(emitSimsFetch())}
        />
    )
}

export default React.memo(SimsTypesSimsChart);

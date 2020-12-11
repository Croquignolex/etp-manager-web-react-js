import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {ZONES_SCOPE} from "../../../../helpers/constants";
import {groupArrayBy} from "../../../../helpers/functions";
import {emitAgentsFetch} from "../../../../redux/agents/actions";
import {AgentsContext, DispatchContext} from "../../../../helpers/contexts";

// Component
function AdminZonesAgentsChart() {
    // Context states
    const agents = useContext(AgentsContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch(emitAgentsFetch());
        // eslint-disable-next-line
    }, []);

    // Data
    const charData = useMemo(() => {
        // Data
        const data = [];
        const labels = [];
        const backgroundColor = [];
        // Proceed
        const groupedAgents = groupArrayBy(agents.list, agent => agent.zone.id);
        groupedAgents.forEach(agentGroup => {
            data.push(agentGroup.length);
            labels.push(agentGroup[0].zone.name);
            backgroundColor.push('#' + Math.floor(Math.random()*16777215).toString(16));
        });
        // Return
        return {data, labels, backgroundColor}
        // eslint-disable-next-line
    }, [agents]);

    // Render
    return (
        <DetailCard scope={ZONES_SCOPE}
                    charData={charData}
                    title='Agents par zones'
                    handleRefresh={() => dispatch(emitAgentsFetch())}
        />
    )
}

export default React.memo(AdminZonesAgentsChart);

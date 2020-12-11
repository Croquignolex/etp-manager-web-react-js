import React, {useContext, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {AGENTS_SCOPE} from "../../../../helpers/constants";
import {emitAgentsFetch} from "../../../../redux/agents/actions";
import {AgentsContext, DispatchContext} from "../../../../helpers/contexts";

// Component
function AdminAgentsBalancesChart() {
    // Context states
    const agents = useContext(AgentsContext);
    const dispatch = useContext(DispatchContext);

    // Data
    const charData = useMemo(() => {
        // Data
        const data = [];
        const labels = [];
        const backgroundColor = [];
        // Proceed
        agents.list.forEach(agent => {
            data.push(agent.account.balance);
            labels.push(agent.name);
            backgroundColor.push('#' + Math.floor(Math.random()*16777215).toString(16));
        })
        // Return
        return {data, labels, backgroundColor}
        // eslint-disable-next-line
    }, [agents]);

    // Render
    return (
        <DetailCard scope={AGENTS_SCOPE}
                    charData={charData}
                    title='Solde par agents'
                    handleRefresh={() => dispatch(emitAgentsFetch())}
        />
    )
}

export default React.memo(AdminAgentsBalancesChart);

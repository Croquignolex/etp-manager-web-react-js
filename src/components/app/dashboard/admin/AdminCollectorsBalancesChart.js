import React, {useContext, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {COLLECTORS_SCOPE} from "../../../../helpers/constants";
import {emitCollectorsFetch} from "../../../../redux/collectors/actions";
import {CollectorsContext, DispatchContext} from "../../../../helpers/contexts";

// Component
function AdminAgentsBalancesChart() {
    // Context states
    const dispatch = useContext(DispatchContext);
    const collectors = useContext(CollectorsContext);

    // Data
    const charData = useMemo(() => {
        // Data
        const data = [];
        const labels = [];
        const backgroundColor = [];
        // Proceed
        collectors.list.forEach(collector => {
            data.push(collector.account.balance);
            labels.push(collector.name);
            backgroundColor.push('#' + Math.floor(Math.random()*16777215).toString(16));
        })
        // Return
        return {data, labels, backgroundColor}
        // eslint-disable-next-line
    }, [collectors]);

    // Render
    return (
        <DetailCard scope={COLLECTORS_SCOPE}
                    charData={charData}
                    title='Solde par responsables'
                    handleRefresh={() => dispatch(emitCollectorsFetch())}
        />
    )
}

export default React.memo(AdminAgentsBalancesChart);

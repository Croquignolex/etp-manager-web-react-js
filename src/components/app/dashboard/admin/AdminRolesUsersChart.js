import React, {useContext, useEffect, useMemo} from 'react';

import DetailCard from "../DetailCard";
import {groupArrayBy} from "../../../../helpers/functions";
import {emitUsersFetch} from "../../../../redux/users/actions";
import {UsersContext, DispatchContext} from "../../../../helpers/contexts";
import {
    ADMIN,
    MANAGER,
    UNKNOWN,
    SUPERVISOR,
    USERS_SCOPE
} from "../../../../helpers/constants";

// Component
function AdminRolesUsersChart() {
    // Context states
    const users = useContext(UsersContext);
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch(emitUsersFetch());
        // eslint-disable-next-line
    }, []);

    // Data
    const charData = useMemo(() => {
        // Data
        const data = [];
        const labels = [];
        const backgroundColor = [];
        // Proceed
        const groupedUsers = groupArrayBy(users.list, user => user.role.id);
        groupedUsers.forEach(userGroup => {
            let roleChartData;
            switch (userGroup[0].role.name) {
                case ADMIN: roleChartData = {label: ADMIN, background: '#dd4b39'}; break;
                case MANAGER: roleChartData = {label: MANAGER, background: '#008d4c'}; break;
                case SUPERVISOR: roleChartData = {label: SUPERVISOR, background: '#00acd6'}; break;
                default: roleChartData = {label: UNKNOWN, background: '#ffffff'};
            }
            data.push(userGroup.length);
            labels.push(roleChartData.label);
            backgroundColor.push(roleChartData.background);
        });
        // Return
        return {data, labels, backgroundColor}
        // eslint-disable-next-line
    }, [users]);

    // Render
    return (
        <DetailCard scope={USERS_SCOPE}
                    charData={charData}
                    title='Utilisateurs par roles'
                    handleRefresh={() => dispatch(emitUsersFetch())}
        />
    )
}

export default React.memo(AdminRolesUsersChart);
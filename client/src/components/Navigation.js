import React from 'react';
import {getGroupsQuery} from '../queries/getGroups';
import {useQuery} from '@apollo/react-hooks';
import {NavLink} from 'react-router-dom';

function Navigation() {
    const {loading, error, data} = useQuery(getGroupsQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <ul className="group-list">
            {
                data.groups.map(group => {
                    return (
                        <li className="group" key={group.id}>
                            <NavLink to={`/group/${group.id}`}>{group.name}</NavLink>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default Navigation;

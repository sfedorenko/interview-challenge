import React from 'react';
import {getColorRandomQuery} from '../queries/getColorRandom';
import {useQuery} from '@apollo/react-hooks';
import {NavLink} from 'react-router-dom';

function RandomColor() {
    const {loading, error, data, refetch} = useQuery(getColorRandomQuery);

    if (loading) return null;
    if (error) return {error};

    return (
        <NavLink className="button" to={`/color/${data.colorRandom.id}`} onClick={() => refetch()}>Random Color</NavLink>
    );
}

export default RandomColor;

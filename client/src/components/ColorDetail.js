import React from 'react';
import {getColorDetailQuery} from '../queries/getColorDetail';
import {useQuery} from '@apollo/react-hooks';
import ColorSimilar from './ColorSimilar';

function ColorDetail({ match }) {
    const {loading, error, data} = useQuery(getColorDetailQuery, {
        variables: {id: match.params.id}
    });

    if (loading) return null;
    if (error) return {error};

    return (
        <div className="color-details" >
            <div className="color-primary" style={{background: data.colorDetail.hex}}>
                <h1 className="name">{data.colorDetail.hex}</h1>
            </div>
            <ColorSimilar colors={data.colorDetail.similar} currentId={data.colorDetail.id}/>
        </div>
    );
}

export default ColorDetail;

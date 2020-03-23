import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getColorsQuery} from '../queries/getColors';
import Pagination from 'react-js-pagination';
import ColorNode from './ColorNode';

function ColorList({match}) {
    const [page, setPage] = useState(1);
    const limit = 12;

    useEffect(() => {
        setPage(1);
    }, [match]);

    const {loading, error, data} = useQuery(getColorsQuery, {
        variables: {
            groupId: match.params.id,
            limit: limit,
            skip: page * limit - limit
        }
    });

    if (loading) return null;
    if (error) return {error};

    return (
        <div className="color-list-page">
            <ul className="color-list">
                {data.colors.map(color => (<ColorNode key={color.id} color={color}/>))}
            </ul>
            <Pagination
                activePage={page}
                itemsCountPerPage={limit}
                totalItemsCount={data.colorsTotal}
                pageRangeDisplayed={10}
                onChange={(page) => {setPage(page)}}
                itemClass={'page-link'}
                prevPageText={<i className='icon-angle-left'/>}
                firstPageText={<i className='icon-angle-double-left'/>}
                lastPageText={<i className='icon-angle-double-right'/>}
                nextPageText={<i className='icon-angle-right'/>}
            />
        </div>
    );
}

export default ColorList;

import React from 'react';
import {Link} from 'react-router-dom';

const ColorNode = ({color}) => {
    return (
        <li key={color.id} className="color" style={{background: color.hex}}>
            <Link to={`/color/${color.id}`}>
                <span className="name">{color.hex}</span>
            </Link>
        </li>
    );
};

export default ColorNode;

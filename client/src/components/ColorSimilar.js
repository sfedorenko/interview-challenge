import React from 'react';
import ColorNode from './ColorNode';
import {compareValues} from '../misc/compare';

function ColorSimilar({colors, currentId}) {
    // Sort colors by lightness
    colors.sort(compareValues('lightness', 'asc'));

    // Create array of objects with current color and 2 neighbors
    let delta = parseInt(process.env.REACT_APP_SIMILAR_COLORS_DELTA) || 2,
        current = colors.map(e => e.id).indexOf(currentId) + 1,
        total = colors.length,
        pageLimit = 2 * delta + 1;
    let upperLimit, lowerLimit = upperLimit = Math.min(current, total);

    for (let b = 1; b < pageLimit && b < total;) {
        if (lowerLimit > 1) {
            lowerLimit--;
            b++;
        }
        if (b < pageLimit && upperLimit < total) {
            upperLimit++;
            b++;
        }
    }

    let similarColors = [];

    for (let i = lowerLimit; i <= upperLimit; i++) {
        similarColors.push(colors[i - 1]);
    }

    return (
        <ul className="similar-color-list">
            {similarColors.map(color => (<ColorNode key={color.id} color={color}/>))}
        </ul>
    );
}

export default ColorSimilar;

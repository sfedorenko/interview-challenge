import React from 'react';
import ColorNode from './ColorNode';
import {compareValues} from '../misc/compare';

function ColorSimilar({colors, currentId}) {
    colors.sort(compareValues('lightness', 'asc'));

    let delta = 2,
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
            {similarColors.map(color => (<ColorNode color={color}/>))}
        </ul>
    );
}

export default ColorSimilar;

import { gql } from 'apollo-boost';

const getColorsQuery = gql`
    query colors($groupId: ID, $limit: Int, $skip: Int) {
        colors(groupId: $groupId, limit: $limit, skip: $skip) {
            id
            hex
            hue
            saturation
            lightness
        },
        colorsTotal(groupId: $groupId)
    }
`;

export { getColorsQuery };

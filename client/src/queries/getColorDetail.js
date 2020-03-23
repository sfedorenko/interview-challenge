import { gql } from 'apollo-boost';

const getColorDetailQuery = gql`
    query colorDetail($id: ID!) {
        colorDetail(id: $id) {
            id
            hex
            hue
            saturation
            lightness
            group {
                id
                name
            }
            similar {
                id
                hex
                hue
                saturation
                lightness
            }
        }
    }
`;

export { getColorDetailQuery };

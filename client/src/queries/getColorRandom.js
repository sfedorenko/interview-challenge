import { gql } from 'apollo-boost';

const getColorRandomQuery = gql`
    query colorRandom {
        colorRandom {
            id
        }
    }
`;

export { getColorRandomQuery };

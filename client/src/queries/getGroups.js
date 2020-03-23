import { gql } from 'apollo-boost';

const getGroupsQuery = gql`
    {
        groups {
            name
            id
        }
    }
`;


export { getGroupsQuery };
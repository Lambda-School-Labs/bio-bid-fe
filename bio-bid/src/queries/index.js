import {gql} from 'apollo-boost';

export const GET_STUDIES = gql`
    {
        studies {
            id
            name
            area
            phase
        }
    }
`;
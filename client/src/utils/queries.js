import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
        }
    }
`;

export const QUERY_BOOK = gql`
    query book {
        book {
            bookId
        }
    }
`
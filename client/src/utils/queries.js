import { gql } from '@apollo/client';

export const GET_ME = gql`
   query me{
        me {
            _id
            username
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const QUERY_BOOK = gql`
    query book {
        book {
            bookId
        }
    }
`;

import { gql } from '@apollo/client';

export const GET_ME = gql`
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
`;

export const REMOVE_BOOK = gql`
    query user { 
        userId
        savedBooks
    }
`;

export const ADD_USER = gql`
    query user {
        username
        email
    }
`;
export const LOGIN_USER = gql`
    query user {
        username
        password
    }
`;


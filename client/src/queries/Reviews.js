import gql from 'graphql-tag'

// Queries for User Reviews.
export const QueryReviews = gql`
    {
        reviews {
            id
            title
            body
            experience
            published
            comments {
                id
                text
            }
        }
    }
`
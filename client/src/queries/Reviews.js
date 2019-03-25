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
            createdAt
            updatedAt
            comments {
                id
                text
                author {
                    id
                    name
                }
            }
            author {
                name
            }
        }
    }
`
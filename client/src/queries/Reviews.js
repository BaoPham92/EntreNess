import gql from 'graphql-tag'

// Queries for User Reviews.
export const QueryReviews = gql`
    query Reviews($query: String) {
        reviews(query: $query) {
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
            createdAt
            updatedAt
                author {
                    id
                    name
                    createdAt
                    reviews {
                        id
                    }
                    comments {
                        id
                    }
                    companies {
                        id
                        name
                    }
                    employment {
                        id
                        name
                    }
                }
            }
            author {
                id
                name
                createdAt
                reviews {
                    id
                }
                comments {
                    id
                }
                companies {
                    id
                    name
                }
                employment {
                    id
                    name
                }
            }
        }
    }
`
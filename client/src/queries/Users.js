import gql from 'graphql-tag'

// Queries Users Component.
export const UsersQuery = gql`
    {
        users {
            id
            name
            posts {
                id
                title
                body
                published
            }
            comments {
                id
                text
            }
        }
    }
`

// Queries for UserProfile component.
export const UserProfileQuery = gql`
    {
        self {
            id
            name
            email
            contactNumber
            age
            password
            createdAt
            updatedAt
            posts {
                id
                title
                body
                published
            }
            comments {
                id
                text
            }
        }
    }
`
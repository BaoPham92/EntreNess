import gql from 'graphql-tag'

// Queries Users Component.
export const UsersQuery = gql`
    {
        users {
            id
            name
            reviews {
                id
                title
                body
                experience
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
            reviews {
                id
                title
                body
                experience
                published
            }
            comments {
                id
                text
            }
        }
    }
`
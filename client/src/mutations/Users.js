import gql from 'graphql-tag'

// Mutations for Login component.
export const LoginMutation = gql`
    mutation Login($data: LoginUserInput!) {
        login(data: $data) {
            user {
                id
                name
                email
                password
            }
            token
        }
    }
`

// Mutations for CreateUser component.
export const CreateUserMutation = gql`
    mutation CreateUser($data: CreateUserInput!) {
        createUser(data: $data) {
            user {
                id
                name
                email
                contactNumber
                age
            }
            token
        }
    }
`

// Mutations for CreateUser component.
export const UpdateUserMutation = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
            id
            name
            email
            contactNumber
            age
            password
        }
    }
`
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
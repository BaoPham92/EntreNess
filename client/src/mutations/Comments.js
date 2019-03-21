import gql from 'graphql-tag'

// Mutation for CreateComment
export const CreateCommentMutation = gql`
    mutation CreateComment($data: CreateCommentInput!) {
        createComment(data: $data) {
            id
            text
            author {
                id
                name
            }
            review {
                id
                title
            }
        }
    }
`

// Mutation for UpdateComment
export const UpdateCommentMutation = gql`
    mutation UpdateComment($id: ID!, $data: UpdateCommentInput!) {
        updateComment(id: $id, data: $data) {
            id
            text
            author {
                id
                name
            }
            review {
                id
                title
            }
        }
    }
`
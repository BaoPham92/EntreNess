import gql from 'graphql-tag'

// Queries for Comments
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
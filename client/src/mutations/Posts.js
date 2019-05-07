import gql from 'graphql-tag'

// Mutation for CreateReview
export const CreatePostMutation = gql`
    mutation CreatePost($data: CreateReviewInput!) {
        createPost(data: $data) {
            id
            title
            body
            published
            author {
                id
                name
            }
        }
    }
`
// Mutation for UpdateReview
export const UpdatePostMutation = gql`
    mutation UpdatePost($id: ID!, $data: UpdateReviewInput!) {
        updatePost(id: $id, data: $data) {
            id
            title
            body
            published
        }
    }
`

// Mutation for DeleteReview
export const DeletePostMutation = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id) {
            title
            body
            published
        }
    }
`
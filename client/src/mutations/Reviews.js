import gql from 'graphql-tag'

// Mutation for CreateReview
export const CreateReviewMutation = gql`
    mutation CreateReview($data: CreateReviewInput!) {
        createReview(data: $data) {
            id
            title
            body
            experience
            published
            author {
                id
                name
            }
        }
    }
`
// Mutation for UpdateReview
export const UpdateReviewMutation = gql`
    mutation UpdateReview($id: ID!, $data: UpdateReviewInput!) {
        updateReview(id: $id, data: $data) {
            id
            title
            body
            experience
            published
        }
    }
`

// Mutation for DeleteReview
export const DeleteReviewMutation = gql`
    mutation DeleteReview($id: ID!) {
        deleteReview(id: $id) {
            title
            body
            experience
            published
        }
    }
`
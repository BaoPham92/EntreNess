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
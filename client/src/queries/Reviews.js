import gql from 'graphql-tag'

// Queries for User Reviews.
export const QueryReviews = gql`
    query Reviews($query: String) {
        reviews(query: $query) {
            id
            title
            body
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

export const QueryReview = gql`
    query Review($id: ID, $after: String) {
        review(id: $id) {
            id
            title
            body
            published
            createdAt
            updatedAt
            commentsConnection(first: 9, after: $after) {
                aggregate {
                    count
                }
                edges {
                    node {
                        id
                        text
                        updatedAt
                        createdAt
                        author {
                            id
                            name
                            createdAt
                            updatedAt
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
                    cursor
                }
                pageInfo {
                    endCursor
                    hasNextPage
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

export const QueryReviewProps = {
    props: ({ data, data: { networkStatus, fetchMore } }) => ({
        data: data,
        review: data.review,
        connection: networkStatus === 7 && data.review.commentsConnection,
        loadMore: () =>
            fetchMore({
                variables: {
                    after: data.review.commentsConnection.pageInfo.endCursor
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    return {
                        review: {
                            ...prevResult.review,
                            commentsConnection: {
                                ...prevResult.review.commentsConnection,
                                edges: [
                                    ...prevResult.review.commentsConnection.edges,
                                    ...fetchMoreResult.review.commentsConnection.edges
                                ],
                                pageInfo: {
                                    ...prevResult.review.commentsConnection.pageInfo,
                                    ...fetchMoreResult.review.commentsConnection.pageInfo
                                }
                            }
                        }
                    }
                }
            })
    }),
    options: props => ({
        notifyOnNetworkStatusChange: true,
        variables: {
            id: props.match.params.id
        }
    })
}
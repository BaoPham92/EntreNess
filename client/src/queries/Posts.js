import gql from 'graphql-tag'

// Queries for User Posts.
export const QueryPosts = gql`
    query Posts($query: String) {
        posts(query: $query) {
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
                    posts {
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
                posts {
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

export const QueryPost = gql`
    query Post($id: ID, $after: String) {
        post(id: $id) {
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
                            posts {
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
                posts {
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

export const QueryPostProps = {
    props: ({ data, data: { networkStatus, fetchMore } }) => ({
        data: data,
        post: data.post,
        connection: networkStatus === 7 && data.post.commentsConnection,
        loadMore: () =>
            fetchMore({
                variables: {
                    after: data.post.commentsConnection.pageInfo.endCursor
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    return {
                        post: {
                            ...prevResult.post,
                            commentsConnection: {
                                ...prevResult.post.commentsConnection,
                                edges: [
                                    ...prevResult.post.commentsConnection.edges,
                                    ...fetchMoreResult.post.commentsConnection.edges
                                ],
                                pageInfo: {
                                    ...prevResult.post.commentsConnection.pageInfo,
                                    ...fetchMoreResult.post.commentsConnection.pageInfo
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
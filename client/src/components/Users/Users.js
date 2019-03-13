import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Login from './Login'

// Queries for GraphQL API
const USERS_DATA = gql`
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

export default class Users extends Component {

    render() {
        return (
            <div>

                <h2> One or more User info should show: </h2>

                <Query query={USERS_DATA}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading</p>
                        if (error) return <p>Error</p>
                        return data.users.map(({ id, name, reviews, comments }) => (
                            <ul key={id}>
                                <li>User id:{id}</li>
                                <li>Name: {name}</li>
                                <li>Reviews: {reviews.length}</li>
                                <li>Comments: {comments.length}</li>
                            </ul>
                        ))
                    }}
                </Query>

            </div>
        )
    }
}
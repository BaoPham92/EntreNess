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
            email
            password
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

                        return data.users.map(({ id, name, email, password }) => (
                            <ul key={id}>
                                <li>User id:{id}</li>
                                <li>Name: {name}</li>
                                <li>Email: {this.props.authExist ? email : 'Not logged in to see email.'}</li>
                            </ul>
                        ))
                    }}
                </Query>

                {!localStorage.getItem('auth_token') && <Login getAuth={this.props.getAuth} />}

            </div>
        )
    }
}
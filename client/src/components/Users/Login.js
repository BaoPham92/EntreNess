import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// Mutations & Queries for GraphQL API
const LOGIN_DATA = gql`
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

const USERS_DATA = gql`
    query GetUsers {
    users {
        id
        name
        email
        password
    }
}
`

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    saveEmailInput = (e) => {
        e.preventDefault()

        const email = e.target.value.trim()

        if (email) {
            this.setState(() => ({ email }))   
        }
    }

    savePasswordInput = (e) => {
        e.preventDefault()

        const password = e.target.value.trim()

        if (password) {
            this.setState(() => ({ password }))
        }
    }

    render() {
        return (
            <div>
                <Mutation
                    mutation={LOGIN_DATA}
                    update={(cache, { data: { login } }) => {
                        const { users } = cache.readQuery({ query: USERS_DATA })
                        cache.writeQuery({
                            query: USERS_DATA,
                            data: { users: users.assign(users, [login.user]) }
                        })
                    }}
                >
                    {(login, { data }) => (
                        <div>
                            <form
                                onSubmit={
                                    e => {
                                        e.preventDefault()
                                        login({
                                            variables: {
                                                data: { email: this.state.email, password: this.state.password }
                                            }
                                        }).then(results => {
                                            console.log(results)
                                            this.props.getAuth(results.data.login.token)
                                            localStorage.setItem('auth_token', results.data.login.token)
                                        })
                                    }
                                }>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.saveEmailInput}
                                />
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.savePasswordInput}
                                />
                                <button type="submit"> Login </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            </div>
        )
    }
}

export default Login
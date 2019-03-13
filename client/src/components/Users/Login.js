import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AuthService from '../../utils/authentication/AuthService'

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

class Login extends Component {

    Auth = new AuthService()

    handleChange = (e) => {
        e.persist();
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    componentDidMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/')
        }
    }

    render() {
        return (
            <div>
                <Mutation
                    mutation={LOGIN_DATA}>
                    {(login, { data }) => (
                        <div>
                            <form
                                onSubmit={
                                    (e) => {
                                        e.preventDefault()
                                        login({
                                            variables: {
                                                data: { email: this.state.email, password: this.state.password }
                                            }
                                        }).then(results => {
                                            this.Auth.setToken(results.data.login.token)
                                            this.props.history.replace('/')
                                            }).catch((e) => alert(e))
                                    }
                                }>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
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
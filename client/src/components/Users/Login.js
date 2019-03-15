import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { checkAuth } from '../../actions/auth'

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

    handleChange = (e) => {
        e.persist();
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    setToken = (token) => {
        localStorage.setItem('auth_token', token)
        this.props.history.replace('/')
    }

    componentDidMount() {
        this.props.checkAuth()
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
                                            this.setToken(results.data.login.token)
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

const mapToDispatch = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapToDispatch)(Login)
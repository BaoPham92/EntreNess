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
                                            this.props.getAuth(results.data.login.token)
                                            console.log(results)
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
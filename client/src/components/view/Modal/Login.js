import React, { Component } from 'react'
import { graphql, withApollo } from 'react-apollo'
import Modal from 'react-modal'
import { LoginMutation } from '../../../mutations/Users'

class Login extends Component {

    state = {
        email: undefined,
        password: undefined
    }

    handleChange = (e) => {
        e.persist();
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    setToken = (token) => {
        localStorage.setItem('auth_token', token)
    }

    render() {
        const { mutate, client } = this.props
        const variables = {
            variables: {
                data: {
                    email: this.state.email,
                    password: this.state.password
                }
            }
        }

        return (
            <div className="login--main">
            {/*
                Convert to Modal
            */}
                <form
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            mutate(variables)
                                .then((res) => {
                                    this.setToken(res.data.login.token)
                                    this.props.checkAuth()
                                }).catch(e => alert(e))
                        }
                    }>

                    <div className="login--grid">

                        <h2 className="form__head">Login</h2>

                            <div className="login-user-input">
                                <label classNames="login-input-label">Email:</label>
                                <input
                                    className="login--input"
                                    type="text"
                                    name="email"
                                    required
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="login-user-input">
                                <label classNames="login-input-label">Password:</label>
                                <input
                                    className="login--input"
                                    type="password"
                                    name="password"
                                    required
                                    onChange={this.handleChange}
                                />
                            </div>

                        <button className="btn__main" type="submit">Login</button>
                        
                    </div>
                </form>
            </div>
        )
    }
}

const mapMutationToProps = graphql(LoginMutation)
const LoginWithMutation = withApollo(mapMutationToProps(Login))

export default (LoginWithMutation)
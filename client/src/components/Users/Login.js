import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { LoginMutation } from '../../mutations/Users'
import { checkAuth } from '../../actions/auth'

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

                        <section className="login--head">
                            <h3>Login</h3>
                        </section>

                        <div className="login--info">

                            <div className="login-email">
                                <strong>Email:</strong>
                                <input
                                    className="login--input"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="login-password">
                                <strong>Password:</strong>
                                <input
                                    className="login--input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={this.handleChange}
                                />
                            </div>

                        </div>

                        <div className="login--options">
                            <button className="btn__main" type="submit">Login</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        )
    }
}

const mapMutationToProps = graphql(LoginMutation)
const LoginWithMutation = withApollo(mapMutationToProps(Login))

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapDispatchToProps)(LoginWithMutation)
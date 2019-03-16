import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
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

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        const { mutate } = this.props
        
        return (
            <div>
                <form
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            mutate({
                                variables: {
                                    data: {
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                }
                            })
                            .then((res) => {
                                this.setToken(res.data.login.token)
                                this.props.checkAuth()
                            })
                            .catch(e => alert(e))
                        }
                    }>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={this.handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

const mapMutationToProps = graphql(LoginMutation)
const LoginWithMutation = mapMutationToProps(Login)

const mapToDispatch = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapToDispatch)(LoginWithMutation)
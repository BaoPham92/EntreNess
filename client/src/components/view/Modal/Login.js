import React, { Component } from 'react'
import { graphql, withApollo } from 'react-apollo'
import Modal from 'react-modal'
import { LoginMutation } from '../../../mutations/Users'

class Login extends Component {

    state = {
        email: undefined,
        password: undefined
    }

    // Input redux state logic.
    handleChange = (e) => {
        e.persist();
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    //  Save token upon successful user login.
    setToken = (token) => {
        localStorage.setItem('auth_token', token)
    }

    // React-Modal
    componentDidMount() {
        Modal.setAppElement('#app')
    }

    closeModal = () => this.props.setPick(undefined)

    render() {

        //  Variables for GraphQL Mutation operation.
        const variables = {
            variables: {
                data: {
                    email: this.state.email,
                    password: this.state.password
                }
            }
        }

        const { 
            mutate,
            client,
            picked,
            setPick 
        } = this.props
        console.log(picked)

        return (
            <Modal
                isOpen={!!picked}
                onRequestClose={this.closeModal}
                contentLabel="Login Modal"
            >
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

                            <button onClick={this.closeModal} className="login--close">X</button>

                            <h2 className="form__head">Login</h2>

                            <div className="login-user-input">
                                <label className="login-input-label">Email:</label>
                                <input
                                    className="login--input"
                                    type="text"
                                    name="email"
                                    required
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="login-user-input">
                                <label className="login-input-label">Password:</label>
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
            </Modal>
        )
    }
}

const mapMutationToProps = graphql(LoginMutation)
const LoginWithMutation = withApollo(mapMutationToProps(Login))

export default (LoginWithMutation)
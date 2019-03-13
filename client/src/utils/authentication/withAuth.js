import React, { Component } from 'react'
import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://localhost:4000/')

    return class AuthWrapped extends Component {
        state = {
            user: undefined
        }

        handleLogout = () => {
            Auth.logout()
            this.props.history.replace('/login')
        }

        componentDidMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/')
            } 
            else {
                try {
                    const profile = Auth.getProfile()
                    this.setState(() => ({ user: profile }))
                }
                catch (e) {
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent {...this.props} handleLogout={this.handleLogout} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    }
}
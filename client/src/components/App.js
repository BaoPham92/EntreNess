import React, { Component } from 'react'
import Users from './Users/Users'

export default class App extends Component {

    state = {
        authExist: undefined
    }

    // Enabler for triggers based on token.
    getAuth = (authData) => {
        console.log(authData)

        if (authData) {
            this.setState(() => ({ authExist: true }))
        }
    }

    render() {
        return (
            <div>
                <h1> EntreNess </h1>
                <Users getAuth={this.getAuth} {...this.state} />
            </div>
        )
    }
}
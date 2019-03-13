import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import withAuth from '../../utils/authentication/withAuth'

class HomePage extends Component {

    render() {
        return (
            <div>
                <div>
                    <h2>Welcome {this.props.user.userId}</h2>
                </div>

                <button type="button" onClick={this.props.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default withAuth(HomePage)
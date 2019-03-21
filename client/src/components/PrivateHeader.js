import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { logout } from '../actions/auth'

const PrivateHeader = (props) => (
    <div className="container">
        <header className="header">
            <div className="header__inner-container">
                <h1 className="header__title">EntreNess</h1>
                <nav>
                    <NavLink exact to="/DashBoard">DashBoard</NavLink>
                    <NavLink to="/Users">Users</NavLink>
                    <NavLink to="/UserProfile">UserProfile</NavLink>
                    <NavLink to="/Reviews">Reviews</NavLink>
                </nav>
            </div>

            <div className="header__inner-container">
                <h2 className="header__subtitle">
                    Explore entreprenuership, authentic ratings, and community trust!
                </h2>

                <button
                    className="button"
                    type="button"
                    onClick={() => {
                        props.logout()
                        props.client.resetStore()
                    }}>
                    Logout
                </button>
            </div>

        </header>
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId
    }
}

export default withApollo(connect(mapToStateProps)(PrivateHeader))
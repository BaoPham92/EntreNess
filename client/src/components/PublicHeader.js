import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { logout } from '../actions/auth'

const PublicHeader = (props) => (
    <div className="container">
        <header className="header">

            <div className="header__inner-container">
                <h1 className="header__title">EntreNess</h1>

                <nav>
                    <NavLink exact to="/">HomePage</NavLink>
                    <NavLink to="/Users">Users</NavLink>
                    <NavLink to="/Reviews">Reviews</NavLink>
                </nav>
            </div>

        <div className="header__inner-container">
            <h2 className="header__subtitle">
                Explore entreprenuership, authentic ratings, and community trust!
            </h2>

            <span className="header__login">Log In and get started!</span>
        </div>

        </header>
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId
    }
}

const mapToDispatch = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default withApollo(connect(mapToStateProps, mapToDispatch)(PublicHeader))
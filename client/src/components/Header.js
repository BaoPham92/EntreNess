import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { logout } from '../actions/auth'

const Header = (props) => (
    <header>
        <NavLink exact to="/">HomePage</NavLink>
        <NavLink to="/Users">Users</NavLink>
        <NavLink to="/UserProfile">UserProfile</NavLink>
        <NavLink to="/Reviews">Reviews</NavLink>
        <button type="button" onClick={ () => {
            props.logout()
            props.client.resetStore()
        }}>Logout</button>
    </header>
)

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId
    }
}

const mapToDispatch = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default withApollo(connect(mapToStateProps, mapToDispatch)(Header))
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../actions/auth'

const Header = (props) => (
    <header>
        <NavLink exact to="/">HomePage</NavLink>
        <NavLink to="/Users">Users</NavLink>
        <button type="button" onClick={props.logout}>Logout</button>
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

export default connect(mapToStateProps, mapToDispatch)(Header)
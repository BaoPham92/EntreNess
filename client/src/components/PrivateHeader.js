import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { logout } from '../actions/auth'

const PrivateHeader = (props) => (
    <div className="container__header">
        <div className="header">
            <span>Welcome { props.auth && `back, user: ${props.id}`}</span>

            <button
                className="btn__header"
                type="button"
                onClick={() => {
                    props.logout()
                    props.client.resetStore()
                }}>
                Logout
            </button>
        </div>

        <div className="nav-menu">
            <NavLink exact to="/DashBoard">DashBoard</NavLink>
            <NavLink to="/Users">Users</NavLink>
            <NavLink to="/UserProfile">UserProfile</NavLink>
            <NavLink to="/Reviews">Reviews</NavLink>
        </div>
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId,
        id: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default withApollo(connect(mapToStateProps, mapDispatchToProps)(PrivateHeader))
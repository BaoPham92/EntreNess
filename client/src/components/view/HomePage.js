import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

export const HomePage = (props) => (
    <div>
        <h2>Welcome To EntreNess User: {props.auth.userId ? props.auth.userId : 'Guest'}</h2>
        {props.auth.userId && <button type="button" onClick={props.logout}>Logout</button>}
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapToDispatch = (dispatch) => ({
    logout: () => dispatch(logout())
})
export default connect(mapToStateProps, mapToDispatch)(HomePage)
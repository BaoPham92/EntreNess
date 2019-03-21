import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateUser from '../Users/CreateUser'
import Login from '../Users/Login'

export const HomePage = (props) => (
    <div>
        <h3>Login</h3>
        { props.auth.userId ? <Redirect to="/DashBoard" /> : <Login />}
        <h3>Would you like to register?</h3>
        <CreateUser />
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapToStateProps)(HomePage)
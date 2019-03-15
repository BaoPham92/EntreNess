import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../Users/Login'

export const HomePage = (props) => (
    <div>
        <h2>Welcome To EntreNess</h2>
        { props.auth.userId ? <Redirect to="/DashBoard" /> : <Login />}
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapToStateProps)(HomePage)
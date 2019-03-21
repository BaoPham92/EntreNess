import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAuth } from '../../actions/auth'

export const DashBoard = (props) => (
    <div>
        <h2>EntreNess</h2>
        <span>User: {props.auth.userId ? props.auth.userId : <Redirect to="/" />}</span>
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapToStateProps)(DashBoard)
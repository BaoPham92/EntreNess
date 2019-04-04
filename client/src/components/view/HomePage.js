import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateUser from '../Users/CreateUser'
import Login from '../Users/Login'

export const HomePage = (props) => (
    <div className="container__main">
        {
            props.auth.userId
                ?<Redirect to="/DashBoard" />
                :<Login />
        }
        <CreateUser />
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapToStateProps)(HomePage)
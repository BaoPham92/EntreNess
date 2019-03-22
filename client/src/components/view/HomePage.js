import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateUser from '../Users/CreateUser'
import Login from '../Users/Login'

export const HomePage = (props) => (
    <div className="container__user-details">
        <section className="user__form-background">
            <h3 className="user__detail-header">Login</h3>
            {
                props.auth.userId
                    ?
                    <Redirect to="/DashBoard" />
                    :
                    <div className="user__details">
                        <Login />
                    </div>
            }

            <h3 className="user__detail-header">Would you like to register?</h3>
            <div className="user__details">
                <CreateUser />
            </div>
        </section>
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapToStateProps)(HomePage)
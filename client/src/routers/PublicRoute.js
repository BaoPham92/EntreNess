import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const PublicRoute = ({
    auth,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            auth ? (
                <Redirect to="/Dashboard" />
            ) : (
                        <Component {...props}/>
                )
        )} />
    )

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId
    }
}

export default connect(mapToStateProps)(PublicRoute)
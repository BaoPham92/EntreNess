import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateHeader from '../components/view/Header/PrivateHeader'

export const PrivateRoute = ({
    auth,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        auth ? (
            <>
                <PrivateHeader />
                <Component {...props} />
            </>
        ) : (
                <Redirect to="/" />
            )
    )}/>
)

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId
    }
}

export default connect(mapToStateProps)(PrivateRoute)
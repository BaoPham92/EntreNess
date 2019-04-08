import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PublicHeader from '../components/PublicHeader'
import PrivateHeader from '../components/PrivateHeader'

export const PublicRoute = ({
    auth,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            auth ? (

                <div>
                    <PrivateHeader />
                    <Component {...props} />
                </div>

            ) : (
                <div>
                    <PublicHeader />
                    <Component {...props} />
                </div>
                )
        )} />
    )

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId
    }
}

export default connect(mapToStateProps)(PublicRoute)
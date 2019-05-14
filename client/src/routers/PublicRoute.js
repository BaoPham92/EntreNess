import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PublicHeader from '../components/view/Header/PublicHeader'
import PrivateHeader from '../components/view/Header/PrivateHeader'

export const PublicRoute = ({
    auth,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            auth ? (

                <div className="app__layout-grid">
                    <PrivateHeader />
                    <Component {...props} />
                </div>

            ) : (
                <div className="app__layout-grid">
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
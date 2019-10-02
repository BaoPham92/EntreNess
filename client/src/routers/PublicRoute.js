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

                <>
                    <PrivateHeader />
                    <Component {...props} />
                </>

            ) : (
                <>
                    <PublicHeader />
                    <Component {...props} />
                </>
                )
        )} />
    )

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId
    }
}

export default connect(mapToStateProps)(PublicRoute)
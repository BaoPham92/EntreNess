import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SideBar from '../components/view/SideBar/SideBar'

import PrivateHeader from '../components/PrivateHeader'

export const PrivateRoute = ({
    auth,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        auth ? (
            <div className="app__layout-grid">
                <PrivateHeader />
                <SideBar />
                <Component {...props} />
            </div>
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
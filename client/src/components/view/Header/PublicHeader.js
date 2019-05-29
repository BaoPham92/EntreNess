import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { logout } from '../../../actions/auth'
import UserCP from '../Header/utils/UserCP'

const PublicHeader = (props) => {

    const [isActive, ifActive] = useState(false)
    const isFocused = () => isActive !== true ? ifActive(true) : ifActive(false)

    return (
        <div className="container__header">
            <div className="header">
                <span>Welcome{!props.auth ? `, Guest` : `back, user: ${props.id}`}</span>
                <UserCP 
                    isFocused={isFocused}
                    isActive={isActive}
                />
            </div>
            <div className={isActive === true ? "dropdown-overlay open" : "dropdown-overlay"}></div>
        </div>
    )
}

const mapToStateProps = (state) => {
    return {
        auth: !!state.auth.userId,
        id: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default withApollo(connect(mapToStateProps, mapDispatchToProps)(PublicHeader))
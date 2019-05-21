import React from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { logout } from '../../../actions/auth'
import UserCP from '../Header/utils/UserCP'

const PublicHeader = (props) => (
    <div className="container__header">
        <div className="header">
            <span>Welcome{!props.auth ? `, Guest` : `back, user: ${props.id}`}</span>
            <UserCP />
        </div>
        <div className="dropdown-overlay"></div>
    </div>
)

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
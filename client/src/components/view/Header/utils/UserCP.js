import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../../../view/Modal/Login'
import { logout } from '../../../../actions/auth'
import CreateUser from '../../../Users/CreateUser'

const UserCP = (props) => {

    console.log(props)

    return (

        <div className="userCP">
            <ul className="userCP-options">
                <li>
                    <div className="userCP-Stats">
                        Stats
                    </div>
                </li>
                <li>
                    <div className="userCP-profile">

                        <div className="userCP-icon">
                            {
                                props.auth.userId
                                    ? 'User'
                                    : 'Anon'
                            }
                        </div>

                        <div className="userCP-dropdown">
                            {
                                props.auth.userId ?
                                    <div className="registered-options">
                                        <Link to="/UserProfile">
                                            <div className="dropdown-option">
                                                <h3>Details</h3>
                                                <p>Lorem ipsum</p>
                                            </div>
                                        </Link>
                                        <Link to="/UpdateUser">
                                            <div className="dropdown-option">
                                                <h3>Edit</h3>
                                                <p>Lorem ipsum</p>
                                            </div>
                                        </Link>
                                        <Link to="/">
                                            <div className="dropdown-option">
                                                <h3>Logout</h3>
                                                <p>Lorem ipsum</p>
                                            </div>
                                        </Link>
                                    </div>

                                    :
                                    <div className="unregistered-options">
                                        <div className="dropdown-option">
                                            <h3>Sign Up</h3>
                                        </div>
                                        <div className="dropdown-option">
                                            <h3>Log In</h3>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCP)
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../../../view/Modal/Login'
import { logout } from '../../../../actions/auth'
import CreateUser from '../../../Users/CreateUser'

const UserCP = (props) => {

    const {
        isActive,
        isFocused,
        auth
    } = props

    // Tracker for dropdown items picked by clicks / selection.
    const [picked, setPick] = useState(undefined)

    const optionPick = async (e) => {
        const target = e.currentTarget.textContent
        target !== picked && setPick(target)
    }

    return (
        <div className="userCP">
            <ul className="userCP-options">
                <li>
                    <div className="userCP-Stats">
                        Stats
                    </div>
                </li>
                <li
                    className={isActive === true ? "userCP-icon active" : "userCP-icon"}
                    onClick={isFocused}>
                    <div className="userCP-profile">
                        <div> {props.auth.userId ? 'User' : 'Anon'} </div>
                        <div className={isActive === true ? "userCP-dropdown open" : "userCP-dropdown"}>
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
                                        <div
                                            className="dropdown-option"
                                            onClick={(e) => optionPick(e)}>
                                            <h3>Sign Up</h3>
                                        </div>

                                        <div
                                            className="dropdown-option"
                                            onClick={(e) => optionPick(e)}>
                                            <h3>Login</h3>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </li>
                <Login
                    picked={picked}
                    setPick={setPick}
                />
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
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'

const Form = (props) => {

    // Track focus.
    const [isActive, ifActive] = useState(false)
    const isFocused = (e) => { ifActive !== isActive && ifActive(e.target.name) }

    const pathname = props.location.pathname

    useEffect((e) => {
        window.addEventListener("keydown", (e) => isFocused(e))
        window.addEventListener("keyup", (e) => isFocused(e))
    })

    return (
        <form
            onSubmit={
                (e) => {
                    e.preventDefault()
                    const user = props.user
                    const valideAge = user.age >= 16 && user.age <= 99

                    if (user.age && !valideAge) {
                        alert('Require age: 16')
                    }

                    props.mutate({ variables: { data: user } })
                        .then(res => {
                            console.log(res)
                            if (pathname === "/UpdateUser") {
                                return props.history.replace('/UserProfile')
                            }
                        })
                        .catch(e => console.log(e))
                }
            }>
            <div className="create-user">

                {
                    pathname === "/"
                    && <h2 className="form__head">Create Account</h2>
                }


                    <div className="create-user-input">
                        <label className={isActive === 'name' ? 'input-label-focused' : 'create-input-label'}>Username</label>
                        <input
                            onClick={(e) => isFocused(e)}
                            className="create--input"
                            type="text"
                            name="name"
                            required={pathname === "/CreateUser" && true}
                            onChange={props.handleChange}
                        />
                    </div>

                    <div className="create-user-input">
                        <label className={isActive === 'email' ? 'input-label-focused' : 'create-input-label'}>Email</label>
                        <input
                            onClick={(e) => isFocused(e)}
                            className="create--input"
                            type="text"
                            name="email"
                            required={pathname === "/CreateUser" && true}
                            onChange={props.handleChange}
                        />
                    </div>

                    <div className="create-user-input">
                        <label className={isActive === 'password' ? 'input-label-focused' : 'create-input-label'}>Password</label>
                        <input
                            onClick={(e) => isFocused(e)}
                            className="create--input"
                            type="password"
                            name="password"
                            required={pathname === "/CreateUser" && true}
                            onChange={props.handleChange}
                        />
                    </div>

                <button className="btn__main" type="submit">
                    {
                        pathname === '/'
                            ? 'Create Account'
                            : 'Update'
                    }
                </button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(withApollo(connect(mapStateToProps)(Form)))
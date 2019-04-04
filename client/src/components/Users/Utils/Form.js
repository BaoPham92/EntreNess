import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'

const Form = (props) => {

    const pathname = props.location.pathname
    console.log(props)

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
            <div className="create-user--grid">

                <section className="create-user--head">
                    <h3>Create Account</h3>
                </section>

                <div className="create-user--info">
                    <div className="create-user-name">
                        <strong>User:</strong>
                        <input
                            className="create--input"
                            type="text"
                            placeholder="name"
                            name="name"
                            required={pathname === "/CreateUser" && true}
                            on
                            Change={props.handleChange}
                        /></div>
                    <div className="create-user-email">
                        <strong>Email:</strong>
                        <input
                            className="create--input"
                            type="text"
                            placeholder="email"
                            name="email"
                            required={pathname === "/CreateUser" && true}
                            on
                            Change={props.handleChange}
                        /></div>
                    <div className="create-user-password">
                        <strong>Password:</strong>
                        <input
                            className="create--input"
                            type="text"
                            placeholder="password"
                            name="password"
                            required={pathname === "/CreateUser" && true}
                            on
                            Change={props.handleChange}
                        /></div>
                    <div className="create-user-contact">
                        <strong>Contact Number:</strong>
                        <input
                            className="create--input"
                            type="text"
                            placeholder="contact number"
                            name="contactNumber"
                            onChange={props.handleChange}
                        />
                    </div>
                    <div className="create-user-age">
                        <strong>Age:</strong>
                        <input
                            className="create--input"
                            type="number"
                            placeholder="age"
                            name="age"
                            onChange={props.handleChange}
                        />
                    </div>
                </div>

                <div className="create-user--options">
                    <button className="btn__main" type="submit">
                        {
                            pathname === '/'
                                ? 'Register'
                                : pathname === '/UpdateUser'
                                    ? 'Update'
                                    : console.log('Error')
                        }
                    </button>

                    <button className="btn__main">
                        Cancel
                    </button>
                </div>
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
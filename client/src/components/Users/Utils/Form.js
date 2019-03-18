import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'
import { UserProfileQuery } from '../../../queries/Users'

const Form = (props) => {
    const isCreateUser = history
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
                            if (props.location.pathname === "/UpdateUser") {
                                props.client.query({query: UserProfileQuery})
                                return props.history.replace('/UserProfile')
                            }
                        })
                        .catch(e => console.log(e))
                }
            }>
            <input
                type="text"
                placeholder="name"
                name="name"
                required={props.location.pathname === "/CreateUser" && true}
                onChange={props.handleChange}
            />
            <input
                type="text"
                placeholder="email"
                name="email"
                required={props.location.pathname === "/CreateUser" && true}
                onChange={props.handleChange}
            />
            <input
                type="text"
                placeholder="password"
                name="password"
                required={props.location.pathname === "/CreateUser" && true}
                onChange={props.handleChange}
            />
            <input
                type="text"
                placeholder="contact number"
                name="contactNumber"
                onChange={props.handleChange}
            />
            <input
                type="number"
                placeholder="age"
                name="age"
                onChange={props.handleChange}
            />
            <button type="submit">Register</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(withApollo(connect(mapStateToProps)(Form)))
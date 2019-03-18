import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { CreateUserMutation } from '../../mutations/Users'
import { startCreateUser } from '../../actions/users'

export class CreateUser extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startCreateUser({ [e.target.name]: e.target.value })
    }

    checkAge = (age) => {
        const valideAge = age >= 16 && age <= 99

        if (!valideAge) {
            alert('Require age: 16')
        }
    }

    render() {
        const { mutate, user } = this.props

        return (
            <div>
                <form
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            this.checkAge(user.age)

                            mutate({variables: { data: user }})
                            .then(res => console.log(res))
                            .catch(e => console.log(e))
                        }
                    }>
                    <input
                        type="text"
                        placeholder="name"
                        name="name"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="email"
                        name="email"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="password"
                        name="password"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="contact number"
                        name="contactNumber"
                        onChange={this.handleChange}
                    />
                    <input
                        type="number"
                        placeholder="age"
                        name="age"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}

const mapMutationToProps = graphql(CreateUserMutation)
const createUserWithMutation = mapMutationToProps(CreateUser)

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    startCreateUser: (userData) => dispatch(startCreateUser(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(createUserWithMutation)
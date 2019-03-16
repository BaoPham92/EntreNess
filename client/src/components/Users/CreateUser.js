import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { CreateUserMutation } from '../../mutations/Users'

export class CreateUser extends Component {

    state = {
        name: undefined,
        email: undefined,
        passowrd: undefined,
        contactNumber: undefined,
        age: undefined
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    checkAge = () => {
        const age = this.state.age
        const valideAge = age >= 16 && age <= 99

        if (!valideAge) {
            alert('Require age: 16')
        }
    }

    render() {
        const { mutate } = this.props

        return (
            <div>
                <form
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            this.checkAge()

                            mutate({
                                variables: {
                                    data: {
                                        name: this.state.name,
                                        email: this.state.email,
                                        password: this.state.password,
                                        contactNumber: this.state.contactNumber,
                                        age: parseInt(this.state.age, 10)
                                    }
                                }
                            })
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

export default createUserWithMutation
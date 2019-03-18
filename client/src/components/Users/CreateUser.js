import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { CreateUserMutation } from '../../mutations/Users'
import { startCreateUser } from '../../actions/users'
import Form from './Utils/Form'

export class CreateUser extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startCreateUser({ [e.target.name]: e.target.value })
    }

    render() {
        const { mutate } = this.props

        return (
            <div>
                <Form 
                handleChange={this.handleChange}
                mutate={mutate}
                />
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
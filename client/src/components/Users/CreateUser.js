import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { CreateUserMutation } from '../../mutations/Users'
import { startCreateUser } from '../../actions/users'
import Form from './Utils/Form'
import { checkAuth } from '../../actions/auth'

export class CreateUser extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startCreateUser({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        const { mutate } = this.props

        return (
            <div className="create-user--main">
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
    startCreateUser: (userData) => dispatch(startCreateUser(userData)),
    checkAuth: () => dispatch(checkAuth())
})

export default connect(mapStateToProps, mapDispatchToProps)(createUserWithMutation)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo, compose } from 'react-apollo'
import { UpdateUserMutation } from '../../mutations/Users'
import { startUpdateUser } from '../../actions/users'
import { logout } from '../../actions/auth'
import { DeleteUserMutation } from '../../mutations/Users'
import Form from './Utils/Form'

export class UpdateUser extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startUpdateUser({ [e.target.name]: e.target.value })
    }

    render() {
        const { client: { cache: { data: { data } }}, UpdateUser, DeleteUser } = this.props
        const self = data["$ROOT_QUERY.self"]
        return (
            <div>
                <h1>Update User</h1>

                    <ul>
                        <li>User name: {self.name}</li>
                        <li>Email: {self.email}</li>
                        <li>Password: {self.password}</li>
                        <li>Contact Number: {self.contactNumber}</li>
                        <li>Age: {self.age}</li>
                    </ul>

                    <Form 
                    handleChange={this.handleChange}
                    mutate={UpdateUser}
                    />

                    <button onClick={() => {
                        DeleteUser()
                        .then((res) => {
                            console.log(res)
                            this.props.logout()
                        })
                    }}>
                    Close Account?
                    </button>
            </div>
        )
    }
}

const mapMutationToProps = compose(graphql(UpdateUserMutation, {name: 'UpdateUser'}), graphql(DeleteUserMutation, {name: 'DeleteUser'}))
const updateUserWithMutation = (mapMutationToProps(UpdateUser))

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    startUpdateUser: (userData) => dispatch(startUpdateUser(userData)),
    logout: () => dispatch(logout())
})

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(updateUserWithMutation))
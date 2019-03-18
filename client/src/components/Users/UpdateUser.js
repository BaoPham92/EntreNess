import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { UpdatedUserMutation } from '../../mutations/Users'

export class UpdateUser extends Component {

    render() {
        const { client: { cache: { data: { data } }}} = this.props
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
            </div>
        )
    }
}

export default withApollo(connect()(UpdateUser))
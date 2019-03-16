import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const USER_PROFILE_DATA = gql`
    {
        self {
            id
            name
            email
            contactNumber
            age
            password
            createdAt
            updatedAt
        }
    }
`

export class UserProfile extends React.Component {

    render() {
        const { data: { loading, error, self } } = this.props

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>
                    <ul>
                        <li>User Id: {self.id}</li>
                        <li>Name: {self.name}</li>
                        <li>Email: {self.email}</li>
                        <li>Contact Number: {!self.contactNumber ? 'No infor provided.' : self.contactNumber}</li>
                        <li>Age: {!self.age ? 'No infor provided.' : self.age}</li>
                        <li>Password: {self.password}</li>
                        <li>Accounted Created: {self.createdAt}</li>
                        <li>Accounted Updated: {self.updatedAt}</li>
                    </ul>
                </div>
            )
        }
    }
}

const mapQueryToProps = graphql(USER_PROFILE_DATA)
const userProfileWithQuery = mapQueryToProps(UserProfile)

export default connect()(userProfileWithQuery)
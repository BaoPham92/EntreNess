import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { UserProfileQuery } from '../../queries/Users'

export class UserProfile extends Component {

    render() {
        const { data: { loading, error, self } } = this.props

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>
                    <Link to="/UpdateUser">
                        Edit Information?
                    </Link>

                    <ul>
                        <li>User Id: {self.id}</li>
                        <li>Name: {self.name}</li>
                        <li>Email: {self.email}</li>
                        <li>Contact Number: {!self.contactNumber ? 'No info provided.' : self.contactNumber}</li>
                        <li>Age: {!self.age ? 'No info provided.' : self.age}</li>
                        <li>Password: {self.password}</li>
                        <li>Accounted Created: {self.createdAt}</li>
                        <li>Accounted Updated: {self.updatedAt}</li>
                    </ul>

                    <h2>User Content</h2>

                    <ul>
                        <li>
                        Reviews: <Link to={`/Reviews/${self.id}`}>{self.reviews.length}</Link>
                        </li>
                    </ul>
                </div>
            )
        }
    }
}

const mapQueryToProps = graphql(UserProfileQuery)
const userProfileWithQuery = mapQueryToProps(UserProfile)

export default connect()(userProfileWithQuery)
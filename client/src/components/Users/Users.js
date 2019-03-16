import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { UsersQuery } from '../../queries/Users'

export class Users extends Component {

    render() {
        const { data: { loading, error, users } } = this.props

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>
                    <h2> One or more User info should show: </h2>

                    {users.map(({ id, name, reviews, comments }) => (
                        <ul key={id}>
                            <li>Username: {name}</li>
                            <li>Reviews: {reviews.length}</li>
                            <li>Comments: {comments.length}</li>
                        </ul>
                    ))}

                </div>
            )
        }
    }
}

const mapQueryToProps = graphql(UsersQuery)
const UserWithQuery = mapQueryToProps(Users)

export default UserWithQuery
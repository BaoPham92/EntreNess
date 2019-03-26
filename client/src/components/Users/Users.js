import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { UsersQuery } from '../../queries/Users'
import { checkAuth } from '../../actions/auth'

export class Users extends Component {

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        const { data: { loading, error, users } } = this.props

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>

                    <div className="container__intro-users">
                        <section className="section__intro">
                            <h2>Registered Users</h2>
                        </section>
                    </div>

                    <div className="container__users-main">
                        <div className="users__main">
                            <section className="section__users-main">
                                {users.map(({ id, name, reviews, comments }) => (
                                    <div key={id} className="grid__users">
                                        <span>User:</span>
                                        <p>{name}</p>
                                        <span>Reviews:</span>
                                        <p>{reviews.length} Reviews made.</p>
                                        <span>Comments:</span>
                                        <p>{comments.length} Comments made.</p>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>

                </div>
            )
        }
    }
}

const mapQueryToProps = graphql(UsersQuery)
const UserWithQuery = mapQueryToProps(Users)

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapDispatchToProps)(UserWithQuery)
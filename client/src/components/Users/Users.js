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
        if (loading) return <p>loading</p>
        if (error) return <p>error</p>
        return (
            <div className="container__main">
                <div className="template__main">

                    <div className="container__intro">
                        <section className="users--section-intro">
                            <h2 className="users--title">Registered Users</h2>
                        </section>
                    </div>

                    <div className="container__sub">
                        <section className="users--section-main">
                            {users.map(({ id, name, reviews, comments }) => (
                                    <div key={id} className="users--grid-main">
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

const mapQueryToProps = graphql(UsersQuery)
const UserWithQuery = mapQueryToProps(Users)

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapDispatchToProps)(UserWithQuery)
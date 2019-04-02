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

        if (loading) return <dt>loading</dt>
        if (error) return <dt>error</dt>

        return (
            <div className="container__main">
                <div className="template__main">

                    <div className="container__intro">
                        <section className="users--section-intro">
                            <h2 className="users--title">Registered Users</h2>
                        </section>
                    </div>

                    <div className="container__sub">
                        {users.map(({ id, name, reviews, comments }) => (
                            <section className="users--section-main">
                                <div key={id} className="users--grid-main">
                                    <dt>User:</dt>
                                    <dd>{name}</dd>
                                    <dt>Reviews:</dt>
                                    <dd>{reviews.length} Reviews made.</dd>
                                    <dt>Comments:</dt>
                                    <dd>{comments.length} Comments made.</dd>
                                </div>
                            </section>
                        ))}
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { UserProfileQuery } from '../../queries/Users'

export class UserProfile extends Component {

    render() {
        const { data: { loading, error, self } } = this.props

        if (loading) return <span>Loading</span>
        if (error) return <span>Error</span>

        return (
            <div className="container__main">
                <div className="template__main">

                    <div className="container__intro">
                        <section className="user-profile--section-intro">
                            <h2 className="user-profile--title">User Profile</h2>
                        </section>
                        <div className="penta-bar"></div>
                    </div>

                    <div className="container__sub">
                        <section className="user-profile--section-main">

                            <div className="user-profile--section-info">
                                <h3>User Information</h3>
                            </div>

                            <div className="user-profile--section-sub">
                                <div className="user-profile--grid-main">
                                    <dt>User Id:</dt>
                                    <dd>{self.id}</dd>
                                    <dt>Name:</dt>
                                    <dd>{self.name}</dd>
                                    <dt>Email:</dt>
                                    <dd>{self.email}</dd>
                                    <dt>Contact Number:</dt>
                                    <dd>{!self.contactNumber ? 'No info provided.' : self.contactNumber}</dd>
                                    <dt>Age:</dt>
                                    <dd>{!self.age ? 'No info provided.' : self.age}</dd>
                                    <dt>Accounted Created:</dt>
                                    <dd>{self.createdAt}</dd>
                                    <dt>Accounted Updated:</dt>
                                    <dd>{self.updatedAt}</dd>
                                </div>
                            </div>
                            
                            <Link className="user--profile-edit" to="/UpdateUser">Edit Information?</Link>
                        </section>
                    </div>

                    <div className="container__sub">
                        <section className="user-profile--section-main">

                            <div className="user-profile--section-info">
                                <h3>User Content</h3>
                            </div>

                            <div className="user-profile--grid-main">
                                <div className="user-profile--section-sub">
                                    <div className="user-profile--grid-main">
                                        <dt>Reviews:</dt>
                                        <dd><Link to={`/Reviews/${self.id}`}>{self.reviews.length} Reviews made.</Link></dd>
                                        <dt>Comments:</dt>
                                        <dd><Link to={`/Comments/${self.id}`}>{self.comments.length} Comments made.</Link></dd>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>

                </div>
            </div>
        )
    }
}

const mapQueryToProps = graphql(UserProfileQuery)
const userProfileWithQuery = mapQueryToProps(UserProfile)

export default connect()(userProfileWithQuery)
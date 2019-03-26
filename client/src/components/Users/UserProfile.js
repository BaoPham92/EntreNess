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

                    <div className="container__intro-user-profile">
                        <section className="section__intro">
                            <div className="container__user-profile-intro-section">
                                <h2>User Profile</h2>
                                <Link to="/UpdateUser">Edit Information?</Link>
                            </div>
                        </section>
                    </div>

                    <div className="container__user-profile-main">
                        <div className="user-profile__main">
                            <section className="section__user-profile-main">

                                <div className="section__user-profile-header">
                                    <h3>User Information</h3>
                                </div>

                                <div className="section__user-profile-info">
                                    <div className="grid__user-profile-info">
                                        <span>User Id:</span>
                                        <p>{self.id}</p>
                                        <span>Name:</span>
                                        <p>{self.name}</p>
                                        <span>Email:</span>
                                        <p>{self.email}</p>
                                        <span>Contact Number:</span>
                                        <p>{!self.contactNumber ? 'No info provided.' : self.contactNumber}</p>
                                        <span>Age:</span>
                                        <p>{!self.age ? 'No info provided.' : self.age}</p>
                                        <span>Password:</span>
                                        <p>{self.password}</p>
                                        <span>Accounted Created:</span>
                                        <p>{self.createdAt}</p>
                                        <span>Accounted Updated:</span>
                                        <p>{self.updatedAt}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="container__user-profile-main">
                        <div className="user-profile__main">
                            <section className="section__user-profile-main">

                                <div className="section__user-profile-header">
                                    <h3>User Content</h3>
                                </div>

                                <div className="section__user-profile-info">
                                    <div className="grid__user-profile-info">
                                        <span>Reviews:</span>
                                        <p><Link to={`/Reviews/${self.id}`}>{self.reviews.length} Reviews made.</Link></p>
                                        <span>Comments:</span>
                                        <p><Link to={`/Comments/${self.id}`}>{self.comments.length} Comments made.</Link></p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapQueryToProps = graphql(UserProfileQuery)
const userProfileWithQuery = mapQueryToProps(UserProfile)

export default connect()(userProfileWithQuery)
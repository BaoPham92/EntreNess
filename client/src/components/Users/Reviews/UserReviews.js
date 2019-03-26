import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { UserProfileQuery } from '../../../queries/Users'

export class UserReviews extends Component {

    state = {
        reviews: []
    }

    async componentDidMount() {
        try {
            const self = await this.props.client.query({ query: UserProfileQuery })
                .then((result) => this.setState(() => ({ reviews: result.data.self.reviews})))

        } catch (e) {
            console.log(e)
        }
    }
    
    render() { 

        return (
            <div>

                <div className="container__reviews-intro-section-outer">
                    <section className="section__intro reviews--user-main">
                        <h2>User Reviews</h2>
                    </section>
                </div>

                <div className="container__reviews-main">
                    <div className="reviews__main">
                        {this.state.reviews.map((review, index) => (
                            <section
                                className="section__reviews-main"
                                key={index}
                            >

                                <div className="section__reviews-header user--reviews-header">
                                    <div className="container__reviews-header-top">
                                        <h3>{review.title}</h3>
                                        <Link to={{
                                            pathname: `/EditReview/${review.id}`,
                                            state: {
                                                review: review
                                            }
                                        }}
                                            className="userReview__edit"
                                        >Edit Review
                                </Link>
                                    </div>
                                </div>

                                <div className="reviews__info-box">
                                    <p>{review.body}</p>
                                    <p><span>Experience:</span> {review.experience}</p>
                                    <p><span>Published?:</span> {review.published === true ? 'Published.' : 'Not Published.'}</p>
                                </div>

                            </section>
                        ))}                    
                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(connect()(UserReviews))
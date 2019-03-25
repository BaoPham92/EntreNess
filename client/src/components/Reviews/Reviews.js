import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { QueryReviews } from '../../queries/Reviews'
import { checkAuth } from '../../actions/auth'

export class Reviews extends Component {

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        const { data: { loading, error, reviews, history } } = this.props
        console.log(this.props)

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>

                    <div className="container__reviews-intro-section-outer">
                        <section className="section__intro">
                            <div className="container__reviews-intro-section">
                                <h2>Reviews</h2>
                                <Link to="/CreateReview"> CreateReview </Link>
                            </div>
                        </section>
                    </div>

                    <div className="container__reviews-main">
                        <div className="reviews__main">
                            {reviews.map((review, index) => (
                                review.published &&
                                <section
                                    className="section__reviews-main"
                                    key={index}
                                >

                                    <Link to={`/ReviewItem/${review.id}`}>
                                        <div className="section__reviews-header">
                                            <div className="container__reviews-header-top">
                                                <h3>{review.title}</h3>
                                                <span>Created by: {review.author.name}</span>
                                            </div>

                                            <div className="container__reviews-header-bottom">
                                                <p><span>Created</span>: {review.createdAt}</p>
                                                <p><span>Updated</span>: {review.updatedAt}</p>
                                                <p><span>Comments</span>: {review.comments.length}</p>
                                            </div>
                                        </div>
                                    </Link>

                                        <div className="reviews__info-box">
                                            <p>{review.body}</p>
                                        </div>
                                </section>
                            ))}
                        </div>
                    </div>

                </div>
            )
        }
    }
}

const mapQueriesToProps = graphql(QueryReviews)
const ReviewsWithQuery = mapQueriesToProps(Reviews)

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapDispatchToProps)(ReviewsWithQuery)
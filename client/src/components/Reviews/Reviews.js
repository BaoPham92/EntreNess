import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { QueryReviews } from '../../queries/Reviews'

export class Reviews extends Component {
    render() {
        const { data: { loading, error, reviews, history }} = this.props

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>
                <Link to="/CreateReview"> CreateReview </Link>
                <Link to="/Dashboard"> Dashboard </Link>
                    <h1>Reviews</h1>
                    {reviews.map((review, index) => (
                        review.published && 
                        <ul key={index}>
                        <Link to={`/ReviewItem/${review.id}`}>
                            <li>Title: {review.title}</li>
                            <li>Description: {review.body}</li>
                            <li>Experience: {review.experience}</li>
                            <li>Comments: {review.comments.length}</li>
                            <li>CreatedAt: {review.createdAt}</li>
                            <li>UpdatedAt: {review.updatedAt}</li>
                        </Link>
                        </ul>
                    ))}
                </div>
            )
        }
    }
}

const mapQueriesToProps = graphql(QueryReviews)
const ReviewsWithQuery = mapQueriesToProps(Reviews)

export default connect()(ReviewsWithQuery)
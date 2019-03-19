import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { QueryReviews } from '../../queries/Reviews'

export class Reviews extends Component {
    render() {
        const { data: { loading, error, reviews }} = this.props

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
                    {reviews.map((review) => (
                        review.published && 
                        <ul key={review.id}>
                            <li>Title: {review.title}</li>
                            <li>Description: {review.body}</li>
                            <li>Experience: {review.experience}</li>
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
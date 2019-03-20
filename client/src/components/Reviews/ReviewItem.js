import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import CreateComment from '../Comments/CreateComment'
import { QueryReviews } from '../../queries/Reviews'

export class ReviewItem extends Component {

    render() {
        const { data: { loading, error, reviews }, location } = this.props

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>
                    <Link to="/Reviews"> Reviews </Link>
                    <h1>EntreNess</h1>
                    { reviews.map((review, index) => (
                        review.id === this.props.match.params.id && 
                        <div key={index}>
                            <section>
                                <h2>Title: {review.title}</h2>

                                <p>Description: {review.body}</p>
                                <p>Experience: {review.experience}</p>
                            </section>

                            <section>
                                <h3>Comments: </h3>
                                
                                {review.comments.length > 0 && review.comments.map((comment, index) => (
                                    <ul key={index}>
                                        <li>Username: {comment.author.name}</li>
                                        <li>Comment: {comment.text}</li>
                                    </ul>
                                ))}

                                <CreateComment
                                    reviewId={review.id}
                                    history={this.props.history}
                                />
                            </section>
                        </div>
                    ))}

                </div>
            )
        }
    }
}

const mapQueriesToProps = graphql(QueryReviews)
const ReviewItemWithQuery = mapQueriesToProps(ReviewItem)

export default connect()(ReviewItemWithQuery)
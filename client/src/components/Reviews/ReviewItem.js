import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import CreateComment from '../Comments/CreateComment'
import UpdateComment from '../Comments/UpdateComment'
import { QueryReviews } from '../../queries/Reviews'
import { startCreateComment } from '../../actions/comments'
import { startUpdateComment } from '../../actions/comments'

export class ReviewItem extends Component {

    state = {
        updateSelected: undefined,
        selectedComment: undefined
    }

    updateClicker = (comment) => {
        this.setState((prevState) => ({
            updateSelected: prevState.updateSelected ? false : true,
            selectedComment: comment
        }))
    }

    updateClear = () => {
        this.setState({ updateSelected: undefined })
    }

    handleCreateComment = (e) => {
        e.persist()
        this.props.startCreateComment({ [e.target.name]: e.target.value })
    }

    handleUpdateComment = (e) => {
        e.persist()
        this.props.startUpdateComment({ [e.target.name]: e.target.value })
    }

    render() {
        const { data: { loading, error, reviews }, location } = this.props

        if (loading) {
            return <span>Loading</span>
        } else if (error) {
            return <span>Error</span>
        } else {
            return (
                <div>

                    {reviews.map((review, index) => (
                        review.id === this.props.match.params.id &&
                        <div
                            className="container__reviews-main"
                            key={index}
                        >

                            <div className="container__reviews-intro-section-outer">
                                <section className="section__intro">
                                    <div className="container__reviews-intro-section">
                                        <h2>{review.title}</h2>
                                        <Link to="/CreateReview"> CreateReview </Link>
                                    </div>
                                </section>
                            </div>

                            <div className="reviews__main reviews__main--reviewItems">

                                <div className="section__reviews-header">
                                    <div className="container__reviews-header-top reviewItem--head">
                                        <h3>Description</h3>
                                        <span>Created by: {review.author.name}</span>
                                    </div>
                                </div>

                                <div className="reviews__info-box">
                                    <p>{review.body}</p>

                                    <div className="section__reviews-header reviewItem--head">
                                        <h4>Experience</h4>
                                    </div>
                                    
                                    <p>{review.experience}</p>
                                </div>
                            </div>

                            <div>
                                <section>

                                    {review.comments.length > 0 && review.comments.map((comment, index) => (
                                        <div>
                                            <div
                                                className="reviewItems__comments-main"
                                                key={index}>
                                                <div className="user__comment">
                                                    <p className="comment__user"><span>User</span>: {comment.author.name}</p>
                                                    <p>{comment.text}</p>
                                                </div>
                                            </div>
                                            <div className="user__comment-bottom">
                                                <div className="container__user--comment-bottom">
                                                    
                                                    <div>
                                                        <p><span>Created</span>: {comment.createdAt}</p>
                                                        <p><span>Updated</span>: {comment.updatedAt}</p>
                                                    </div>

                                                    <button
                                                        className="button button--update-comment"
                                                        onClick={() => this.updateClicker(comment)}>
                                                        Update Comment?
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <CreateComment
                                        handleChange={this.handleCreateComment}
                                        reviewId={review.id}
                                        history={this.props.history}
                                    />
                                    <UpdateComment
                                        updateSelected={this.state.updateSelected}
                                        updateClear={this.updateClear}
                                        selectedComment={this.state.selectedComment}
                                        handleChange={this.handleUpdateComment}
                                        history={this.props.history}
                                    />
                                </section>
                            </div>
                        </div>
                    ))}

                </div>
            )
        }
    }
}

const mapQueriesToProps = graphql(QueryReviews)
const ReviewItemWithQuery = mapQueriesToProps(ReviewItem)

const mapDispatchToProps = (dispatch) => ({
    startCreateComment: (commentData) => dispatch(startCreateComment(commentData)),
    startUpdateComment: (commentData) => dispatch(startUpdateComment(commentData))
})

export default connect(undefined, mapDispatchToProps)(ReviewItemWithQuery)
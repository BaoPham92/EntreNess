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
                    <Link to="/Reviews"> Reviews </Link>
                    <h1>EntreNess</h1>
                    {reviews.map((review, index) => (
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
                                        <button
                                            onClick={() => this.updateClicker(comment)}>
                                            Update Comment?
                                        </button>

                                        <li>Username: {comment.author.name}</li>
                                        <li>Comment: {comment.text}</li>
                                    </ul>
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { ReviewContent } from './Utils/ReviewContent'
import { CommentContent } from './Utils/CommentContent'
import CreateComment from '../Comments/CreateComment'
import { QueryReviews } from '../../queries/Reviews'
import { checkAuth } from '../../actions/auth'
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

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        const { data: { loading, error, reviews }, location, auth } = this.props

        if (loading) return <span>Loading</span>
        if (error) return <span>Error</span>

        return (
            <div className="container__main">
                <div className="reviewItem--main">

                    {reviews.map((review, index) => (
                        review.id === this.props.match.params.id &&
                        <div className="container__sub" key={index}>
                            <section className="reviewItem--section-main">

                                <div className="reviewItem--section-intro">
                                    <h2 className="reviewItem--title">{review.title}</h2>
                                </div>

                                <ReviewContent 
                                review={review}
                                auth={auth}
                                />

                                <div>
                                    {review.comments.length > 0 && review.comments.map((comment, index) => (
                                        <CommentContent
                                        key={index}
                                        comment={comment}
                                        auth={auth}
                                        updateSelected={this.state.updateSelected}
                                        updateClear={this.updateClear}
                                        updateClicker={this.updateClicker}
                                        selectedComment={this.state.selectedComment}
                                        handleChange={this.handleUpdateComment}
                                        history={this.props.history}
                                        />
                                    ))}
                                </div>

                                <CreateComment
                                    handleChange={this.handleCreateComment}
                                    reviewId={review.id}
                                    history={this.props.history}
                                />
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapQueriesToProps = graphql(QueryReviews)
const ReviewItemWithQuery = mapQueriesToProps(ReviewItem)

const mapDispatchToProps = (dispatch) => ({
    startCreateComment: (commentData) => dispatch(startCreateComment(commentData)),
    startUpdateComment: (commentData) => dispatch(startUpdateComment(commentData)),
    checkAuth: () => dispatch(checkAuth())
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItemWithQuery)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { QuickEdit } from '../../Comments/utils/QuickEdit'
import { QueryReview, QueryReviewProps } from '../../../queries/Reviews'
import { startUpdateComment } from '../../../actions/comments'
import { UpdateCommentMutation } from '../../../mutations/Comments'
import moment from 'moment'

export class CommentContent extends Component {

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

    handleUpdateComment = (e) => {
        e.persist()
        this.props.startUpdateComment({ [e.target.name]: e.target.value })
    }

    handleScroll = () => {
        const { connection: { pageInfo } } = this.props

        if (
            pageInfo.hasNextPage === true &&
            this.scroller.scrollHeight - this.scroller.scrollTop < 1250
        ) {
            return this.props.loadMore()
        }
    }

    componentWillReceiveProps({ connection: { edges } }) {
        if (
            this.scroller &&
            this.props.connection.edges &&
            edges &&
            this.props.connection.edges.length !== edges.length
        ) {
            const prevHeight = this.scroller.scrollHeight

            setTimeout(() => {
                this.scroller.scrollTop = this.scroller.scrollHeight - prevHeight
            }, 125)
        }
    }

    render() {

        const { 
            data: { loading },
            connection: { aggregate, edges, pageInfo },
        } = this.props

        return loading ? null : (
            <div
                onScroll={this.handleScroll}
                ref={(scroller) => { this.scroller = scroller }}
                style={{
                    maxHeight: '100rem',
                    overflowY: 'auto'
                }}
            >
                {edges.length > 0 && edges.map(({ node, cursor }, index) => {
                    const comment = node
                    return (
                        <div
                            className="reviewItem__content"
                            key={index}
                        >
                            <aside className="reviewItem__aside">
                                <div className="reviewItem__user">
                                    <span className="penta-title">{comment.author.name}</span>
                                    <div className="penta-bar"></div>
                                </div>

                                <div className="reviewItem__user-details">
                                    <dt>Reviews:</dt>
                                    <dd>{comment.author.reviews.length}</dd>
                                    <dt>Comments:</dt>
                                    <dd>{comment.author.comments.length}</dd>
                                    <dt>Companies:</dt>
                                    <dd>{comment.author.companies.length}</dd>
                                    <dt>Employed:</dt>
                                    <dd>{comment.author.employment.length}</dd>
                                    <dt>Joined:</dt>
                                    <dd>{moment(comment.author.createdAt).format("YYYY-MM-DD")}</dd>
                                </div>
                            </aside>

                            <article className="reviewItem__article">
                                <div className="reviewItem--article-head">{moment(comment.updatedAt).format("YYYY-MM-DD, h:mm:ss a")}</div>
                                {
                                    this.state.updateSelected === true &&
                                        this.state.selectedComment.id === comment.id
                                        ?
                                        <QuickEdit
                                            updateSelected={this.state.updateSelected}
                                            updateClear={this.updateClear}
                                            selectedComment={this.state.selectedComment}
                                            handleChange={this.handleUpdateComment}
                                            newComment={this.props.newComment}
                                            history={this.props.history}
                                            mutate={this.props.mutate}
                                        />
                                        :
                                        <p>{comment.text}</p>
                                }
                            </article>

                            <div className="reviewItem__footer">
                                {
                                    comment.author.id === this.props.auth &&
                                    <button
                                        className="btn--review-item"
                                        onClick={() => {
                                            this.updateClear()
                                            this.updateClicker(comment)
                                        }}>Update</button>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapQueriesToProps = compose(
    graphql(QueryReview, QueryReviewProps),
    graphql(UpdateCommentMutation)
)
const CommentContentWithQuery = mapQueriesToProps(CommentContent)

const mapDispatchToProps = (dispatch) => ({
    startUpdateComment: (commentData) => dispatch(startUpdateComment(commentData))
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth.userId,
        newComment: state.comment
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContentWithQuery))
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { CreateCommentMutation } from '../../mutations/Comments'
import { startCreateComment } from '../../actions/comments'
import { Form } from './utils/Form'

export class CreateComment extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startCreateComment({ [e.target.name]: e.target.value })
    }

    render() {
        const { mutate, reviewId, comment } = this.props

        return (
            <div>
                <span>Create Comment</span>
                <Form 
                handleChange={this.handleChange}
                mutate={mutate}
                reviewId={reviewId}
                history={this.props.history}
                comment={comment}
                />
            </div>
        )
    }
}

const mapMutationToProps = graphql(CreateCommentMutation)
const CreateCommentWithMutation = mapMutationToProps(CreateComment)

const mapDispatchToProps = (dispatch) => ({
    startCreateComment: (commentData) => dispatch(startCreateComment(commentData))
})

const mapStateToProps = (state) => {
    return {
        comment: state.comment
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentWithMutation)
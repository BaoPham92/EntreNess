import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { CreateCommentMutation } from '../../mutations/Comments'
import { Form } from './utils/Form'

export class CreateComment extends Component {

    render() {
        const { mutate, reviewId, comment } = this.props

        return (
            <div>
                <span>Create Comment</span>
                <Form
                    handleChange={this.props.handleChange}
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

const mapStateToProps = (state) => {
    return {
        comment: state.comment
    }
}

export default connect(mapStateToProps)(CreateCommentWithMutation)
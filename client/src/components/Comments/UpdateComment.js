import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { UpdateCommentMutation } from '../../mutations/Comments'
import { startUpdateComment } from '../../actions/comments'

export class UpdateComment extends Component {

    render() {
        const {
            updateClear,
            updateSelected,
            handleChange,
            selectedComment,
            comment,
            mutate,
        } = this.props

        return (
            <div>
                <Modal
                    isOpen={!!updateSelected}
                    onRequestClose={updateClear}
                    contentLabel="Update Comment"
                    className="modal"
                >
                {/* TODO: Full page edit implementation later. */}

                </Modal>
            </div>
        )
    }
}

const mapMutationToProps = graphql(UpdateCommentMutation)
const updateCommentWithMutation = mapMutationToProps(UpdateComment)

const mapStateTopProps = (state) => {
    return {
        comment: state.comment
    }
}

export default connect(mapStateTopProps)(updateCommentWithMutation)
Modal.setAppElement('#app')
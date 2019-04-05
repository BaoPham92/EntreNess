import React from 'react'

export const Form = (props) => {
    const {
        history,
        selectedComment,
        handleChange,
        mutate,
        comment
    } = props

    return (

        <div className="create-comment--main">
            <form
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        const hasCommentId = selectedComment
                        const validCommentId =
                            hasCommentId ? { variables: { data: comment, id: hasCommentId.id } }
                                : { variables: { data: { ...comment, review: props.reviewId } } }

                        mutate(validCommentId)
                            .then(result => {
                                console.log(result)
                                history.go(0)
                            })
                    }}>


                <div className="create-comment--grid">
                    <section className="create-comment--head">
                        <h3>Reply</h3>
                    </section>

                    <div className="create-comment--info">

                        <div className="create-comment--side">
                            <strong>Add Reply:</strong>

                            <button className="btn__main">
                                {selectedComment ? 'Update Comment' : 'Add Comment'}
                            </button>
                        </div>
                        
                        <textarea
                            className="create-comment-textarea"
                            type="text"
                            cols="45"
                            rows="10"
                            name="comment"
                            placeholder="comment"
                            placeholder={selectedComment ? 'Update Comment' : 'Add Comment'}
                            onChange={handleChange}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}
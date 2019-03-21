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

        <div>
            <form
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        const hasCommentId = selectedComment.id
                        const validCommentId =
                            hasCommentId ? { variables: { data: comment, id: hasCommentId } }
                                : { variables: { data: { ...comment, review: props.reviewId } } }

                        console.log(validCommentId)
                        mutate(validCommentId)
                            .then(result => {
                                console.log(result)
                                history.go(0)
                            })
                    }}>
                <input
                    type="text"
                    name="text"
                    onChange={handleChange}
                />
                <button>{selectedComment ? 'Update Comment' : 'Add Comment'}</button>
            </form>
        </div>
    )
}
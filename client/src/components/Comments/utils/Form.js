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
                className="reviewItem--create-comment"
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        const hasCommentId = selectedComment
                        const validCommentId =
                            hasCommentId ? { variables: { data: comment, id: hasCommentId.id } }
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
                    placeholder={ selectedComment? 'Update Comment' : 'Add Comment'}
                    onChange={handleChange}
                />
                <button className="button button--userInfo">
                {selectedComment ? 'Update Comment' : 'Add Comment'}
                </button>
            </form>
        </div>
    )
}
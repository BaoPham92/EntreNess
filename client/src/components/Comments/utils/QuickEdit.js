import React from 'react'

export const QuickEdit = (props) => {
    const {
        history,
        selectedComment,
        handleChange,
        updateClear,
        mutate,
        newComment
    } = props

    return (

        <div>
            <form
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        const hasCommentId = selectedComment
                        const validComment =
                            hasCommentId && { variables: { data: newComment, id: hasCommentId.id } }

                        mutate(validComment)
                            .then(result => {
                                console.log(result)
                                history.go(0)
                            })
                    }}>

                <textarea
                    className="quick-edit-textarea"
                    type="text"
                    rows="5"
                    name="text"
                    placeholder="Update comment"
                    defaultValue={selectedComment.text}
                    onChange={handleChange}
                />

                <button className="btn--review-item" type="submit">Save</button>
                <button className="btn--review-item" onClick={
                    () => {
                        updateClear()
                    }}>Cancel</button>
            </form>
        </div>
    )
}
import React from 'react'

export const CreateForm = (props) => {
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
                        const variable = { variables: { data: { ...comment, review: props.reviewId } } }

                        mutate(variable)
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

                            <button className="btn__main" type="submit">
                                Add Comment
                            </button>
                        </div>

                        <textarea
                            className="create-comment-textarea"
                            type="text"
                            cols="45"
                            rows="10"
                            name="text"
                            placeholder="Add Comment"
                            onChange={handleChange}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}
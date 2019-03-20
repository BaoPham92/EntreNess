import React from 'react'
import { QueryReviews } from '../../../queries/Reviews'
import { Query } from 'react-apollo';

export const Form = (props) => {
    const {history} = props

    return (

        <div>
            <form
            onSubmit={
                (e) => {
                    e.preventDefault()
                    props.mutate({ variables: { data: { ...props.comment, review: props.reviewId} } })
                    .then(result => {
                        console.log(result)
                        history.go(0)
                    })
                }}>
                <input
                    type="text"
                    name="text"
                    onChange={props.handleChange}
                />
                <button>Add Comment</button>
            </form>
        </div>
    )
}
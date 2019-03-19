import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { startUpdateReview } from '../../actions/reviews'
import { UpdateReviewMutation } from '../../mutations/Reviews'
import { DeleteReviewMutation } from '../../mutations/Reviews'
import Form from './Utils/Form'

export class UpdateReview extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startUpdateReview({ [e.target.name]: e.target.value })
    }
    
    render() {
        const { location: { state: { review } }, history, UpdateReview, DeleteReview } = this.props
        console.log(this.props, review)

        return (
            <div>
                <h1>Update Review</h1>

                    <ul>
                        <li>Title: {review.title}</li>
                        <li>Body: {review.body}</li>
                        <li>Experience: {review.experience}</li>
                        <li>Published?: {review.published === true ? 'Published.' : 'Not Published.'}</li>
                    </ul>

                <Form 
                handleChange={this.handleChange}
                mutate={UpdateReview}
                id={review.id}
                />

                <button onClick={
                    () => {
                        confirm('Are you sure you want to delete?')
                        DeleteReview({variables: { id: review.id }})
                        .then(() => history.replace('/UserProfile'))
                    }
                }>
                Delete Review?
                </button>
            </div>
        )
    }
}

const mapMutationToProps = compose(
graphql(UpdateReviewMutation, {
    name: 'UpdateReview'
}), 
graphql(DeleteReviewMutation, {
    name: 'DeleteReview'
}))
const updateReviewWithMutation = mapMutationToProps(UpdateReview)

const mapDispatchToProps = (dispatch) => ({
    startUpdateReview: (reviewData) => dispatch(startUpdateReview(reviewData))
})

export default withApollo(connect(undefined, mapDispatchToProps)(updateReviewWithMutation))
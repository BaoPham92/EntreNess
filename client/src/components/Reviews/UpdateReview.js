import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { startUpdateReview } from '../../actions/reviews'
import { UpdateReviewMutation } from '../../mutations/Reviews'
import Form from './Utils/Form'

export class UpdateReview extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startUpdateReview({ [e.target.name]: e.target.value })
    }
    
    render() {
        const { location: { state: { review } }, mutate } = this.props
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
                mutate={mutate}
                id={review.id}
                />
            </div>
        )
    }
}

const mapMutationToProps = graphql(UpdateReviewMutation)
const updateReviewWithMutation = mapMutationToProps(UpdateReview)

const mapDispatchToProps = (dispatch) => ({
    startUpdateReview: (reviewData) => dispatch(startUpdateReview(reviewData))
})

export default withApollo(connect(undefined, mapDispatchToProps)(updateReviewWithMutation))
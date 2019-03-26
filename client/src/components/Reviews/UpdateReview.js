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

                <div className="container__reviews-intro-section-outer">
                    <section className="section__intro reviews--user-main">
                        <h2>Update Review</h2>
                    </section>
                </div>

                <div className="container__reviews-main">
                    <div className="reviews__main">
                        <section className="section__reviews-main">

                            <div className="section__reviews-header user--reviews-header">
                                <div className="container__reviews-header-top">
                                    <h3>{review.title}</h3>

                                    <button onClick={
                                        () => {
                                            confirm('Are you sure you want to delete?')
                                            DeleteReview({ variables: { id: review.id } })
                                                .then(() => history.replace('/UserProfile'))
                                        }
                                    }
                                    className="button button--review-update"
                                    >
                                        Delete Review?
                                    </button>
                                </div>
                            </div>

                            <div className="reviews__info-box">
                                <p>{review.body}</p>
                                <p><span>Experience:</span> {review.experience}</p>
                                <p><span>Published?:</span> {review.published === true ? 'Published.' : 'Not Published.'}</p>
                            </div>

                        </section>
                    </div>
                </div>

                <div className="container__review-details">
                    <section className="main__review-details">
                        <div>
                            <Form
                                handleChange={this.handleChange}
                                mutate={UpdateReview}
                                id={review.id}
                            />
                        </div>
                    </section>
                </div>
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
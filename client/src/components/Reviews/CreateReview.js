import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { startCreateReview } from '../../actions/reviews'
import { CreateReviewMutation } from '../../mutations/Reviews'
import Form from './Utils/Form'

export class CreateReview extends Component {
    handleChange = (e) => {
        e.persist()
        this.props.startCreateReview({ [e.target.name]: e.target.value })
    }

    render() {
        const { mutate } = this.props
        console.log(this.props)
        return (
            <div>

                <div className="container__review-details">

                    <div className="head__review-details">
                        <h2>Create Review</h2>
                    </div>

                    <section className="main__review-details">
                        <div>
                            <Form
                                handleChange={this.handleChange}
                                mutate={mutate}
                            />
                        </div>
                    </section>
                </div>

            </div>
        )
    }
}

const mapMutationToProps = graphql(CreateReviewMutation)
const createReviewWithMutation = mapMutationToProps(CreateReview)

const mapDispatchToProps = (dispatch) => ({
    startCreateReview: (reviewData) => dispatch(startCreateReview(reviewData))
})

export default connect(undefined, mapDispatchToProps)(createReviewWithMutation)
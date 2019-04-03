import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { startUpdateReview } from '../../actions/reviews'
import { UpdateReviewMutation } from '../../mutations/Reviews'
import { DeleteReviewMutation } from '../../mutations/Reviews'
import { QueryReviews } from '../../queries/Reviews'
import Form from './Utils/Form'

export class UpdateReview extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startUpdateReview({ [e.target.name]: e.target.value })
    }

    render() {
        
        const { 
            data,
            data: { loading, error, reviews },
            UpdateReview,
            DeleteReview,
        } = this.props

        console.log(this.props)

        if (loading) return <span>Loading</span>
        if (error) return <span>Error</span>

        return (
            <div className="container__main">
                <div className="template__main">
                    <Form
                        handleChange={this.handleChange}
                        mutate={UpdateReview}
                        review={reviews[0]}
                        remove={DeleteReview}
                        id={reviews[0].id}
                    />

                </div>
            </div>
        )
    }
}

const mapOperationsToProps = compose(
    graphql(QueryReviews, {
        options: (props) => ({
            variables: { query: props.match.params.id }
        }),
        name: 'data'
    }),
    graphql(UpdateReviewMutation, {
        name: 'UpdateReview'
    }),
    graphql(DeleteReviewMutation, {
        name: 'DeleteReview'
    }))

const updateReviewWithOperations = mapOperationsToProps(UpdateReview)

const mapDispatchToProps = (dispatch) => ({
    startUpdateReview: (reviewData) => dispatch(startUpdateReview(reviewData))
})

export default withApollo(connect(undefined, mapDispatchToProps)(updateReviewWithOperations))
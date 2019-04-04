import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import Form from './Utils/Form'
import { startUpdateReview, startCreateReview } from '../../actions/reviews'
import { UserProfileQuery } from '../../queries/Users'
import { QueryReviews } from '../../queries/Reviews'
import {
    UpdateReviewMutation,
    DeleteReviewMutation,
    CreateReviewMutation
} from '../../mutations/Reviews'

export class UpdateReview extends Component {

    handleChange = (e) => {
        e.persist()
        const match = this.props.match

        match.path === '/CreateReview'
        ? this.props.startCreateReview({ [e.target.name]: e.target.value })
        : this.props.startUpdateReview({ [e.target.name]: e.target.value })
    }

    render() {
        
        const {
            match: { path },
            UpdateReview,
            DeleteReview,
            CreateReview,
            reviews,
            self,
        } = this.props
        console.log(this.props, self, reviews)

        const result = path === '/CreateReview' 
        ? CreateReview
        : UpdateReview

        if (self.error || reviews.error) return <span>Error</span>
        if (self.loading || reviews.loading) return <span>Loading</span>

        return (
            <div className="container__main">
                <div className="template__main">
                    <Form
                        handleChange={this.handleChange}
                        mutate={result}
                        review={reviews.reviews[0]}
                        remove={DeleteReview}
                        id={reviews.reviews[0].id}
                        user={self.self}
                    />

                </div>
            </div>
        )
    }
}

const mapOperationsToProps = compose(
    graphql(QueryReviews, {
        options: (props) => ({
            variables: { 
                query: props.match.params.id 
            }
        }),
        name: 'reviews'
    }),
    graphql(UserProfileQuery, {
        name: 'self'
    }),
    graphql(CreateReviewMutation, {
        name: 'CreateReview'
    }),
    graphql(UpdateReviewMutation, {
        name: 'UpdateReview'
    }),
    graphql(DeleteReviewMutation, {
        name: 'DeleteReview'
    }))

const updateReviewWithOperations = mapOperationsToProps(UpdateReview)

const mapDispatchToProps = (dispatch) => ({
    startUpdateReview: (reviewData) => dispatch(startUpdateReview(reviewData)),
    startCreateReview: (reviewData) => dispatch(startCreateReview(reviewData))
})

export default withApollo(connect(undefined, mapDispatchToProps)(updateReviewWithOperations))
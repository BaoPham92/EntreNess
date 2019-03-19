import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { UserProfileQuery } from '../../../queries/Users'

export class UserReviews extends Component {

    state = {
        reviews: []
    }

    async componentDidMount() {
        try {
            const self = await this.props.client.query({ query: UserProfileQuery })
                .then((result) => this.setState(() => ({ reviews: result.data.self.reviews})))

        } catch (e) {
            console.log(e)
        }
    }
    
    render() { 

        return (
            <div>
                <h1>User Reviews</h1>

                {this.state.reviews.map((review) => (
                    <ul key={review.id}>
                    <Link to={{
                        pathname:`/EditReview/${review.id}`,
                        state: {
                            review: review
                        }
                    }}>Edit Review
                    </Link>
                        <li>Title: {review.title}</li>
                        <li>Body: {review.body}</li>
                        <li>Experience: {review.experience}</li>
                        <li>Published?: {review.published === true ? 'Published.' : 'Not Published.'}</li>
                    </ul>
                ))}
            </div>
        )
    }
}

export default withApollo(connect()(UserReviews))
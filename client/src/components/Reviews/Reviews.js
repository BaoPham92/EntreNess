import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { QueryReviews, QueryReviewOptions } from '../../queries/Reviews'
import { checkAuth } from '../../actions/auth'

export class Reviews extends Component {

    async componentDidMount() {

        this.props.checkAuth()

        try {
            // Get user id and search for related reviews.
            const params = await this.props.match.params

            if (params) {
                this.props.data.variables.query = params.id
            }

        } catch(e) {
            console.log(e)
        }
    }

    render() {
        const { data: { loading, error, reviews, history } } = this.props

        if (loading) return <span>Loading</span>
        if (error) return <span>Error</span>

        return (
            <div className="container__main">
                <div className="template__main">

                    <div className="container__intro">
                        <section className="reviews--section-intro">
                            <h2 className="reviews--title">Reviews</h2>
                        </section>
                        <div className="reviews__create-review">
                            <Link to="/CreateReview">
                            CreateReview
                            </Link>
                        </div>
                    </div>

                    <div className="container__sub">
                        {reviews.map((review, index) => (
                            review.published &&
                            <section className="reviews--section-main" key={index}>

                                <div className="reviews__content">
                                    <div className="reviews__head">
                                        <span className="head-item-1"> Titile / Author </span>
                                        <span className="head-item-2"> Comments </span>
                                    </div>

                                    <article className="reviews__article">
                                        <Link to={`/ReviewItem/${review.id}`}>
                                            <h3>{review.title}</h3>
                                        </Link>

                                        <span>{review.author.name}</span>
                                    </article>

                                    <aside className="reviews__aside">
                                        <span>{review.comments.length}</span>
                                    </aside>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapQueriesToProps = graphql(QueryReviews)
const ReviewsWithQuery = mapQueriesToProps(Reviews)

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapDispatchToProps)(ReviewsWithQuery)
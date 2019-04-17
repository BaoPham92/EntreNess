import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { ReviewContent } from './Utils/ReviewContent'
import CommentContent from './Utils/CommentContent'
import { QueryReview, QueryReviewProps } from '../../queries/Reviews'
import { checkAuth } from '../../actions/auth'

export class ReviewItem extends Component {

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {

        const {
            data: { loading }, review, auth
        } = this.props

        return loading ? null : (
            <div className="container__main">
                <div className="reviewItem--main">
                    <section className="reviewItem--section-main">

                        <div className="reviewItem--section-intro">
                            <h2 className="reviewItem--title">{review.title}</h2>
                        </div>

                        <ReviewContent 
                            review={review}
                            auth={auth}
                        />

                        <CommentContent />
                    </section>
                </div>
            </div>
        )
    }
}

const mapQueriesToProps = graphql(QueryReview, QueryReviewProps)
const ReviewItemWithQuery = mapQueriesToProps(ReviewItem)

const mapDispatchToProps = (dispatch) => ({
    startCreateComment: (commentData) => dispatch(startCreateComment(commentData)),
    checkAuth: () => dispatch(checkAuth())
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItemWithQuery)
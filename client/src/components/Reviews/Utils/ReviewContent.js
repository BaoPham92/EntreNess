import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const ReviewContent = (props)  => {

    const { review, auth } = props

    return (
        <div className="reviewItem__content">
            <aside className="reviewItem__aside">
                <div className="reviewItem__user">
                    <span className="penta-title">{review.author.name}</span>
                    <div className="penta-bar"></div>
                </div>

                <div className="reviewItem__user-details">
                    <dt>Reviews:</dt>
                    <dd>{review.author.reviews.length}</dd>
                    <dt>Comments:</dt>
                    <dd>{review.author.comments.length}</dd>
                    <dt>Companies:</dt>
                    <dd>{review.author.companies.length}</dd>
                    <dt>Employed:</dt>
                    <dd>{review.author.employment.length}</dd>
                    <dt>Joined:</dt>
                    <dd>{moment(review.author.createdAt).format("YYYY-MM-DD")}</dd>
                </div>
            </aside>

            <article className="reviewItem__article">
                <div className="reviewItem--article-head">{moment(review.updatedAt).format("YYYY-MM-DD, h:mm:ss a")}</div>
                <p>{review.author.id === auth && review.body}</p>
            </article>

            <div className="reviewItem__footer">
                {
                    review.author.id === auth &&
                    <Link
                        to={{
                            pathname: `/EditReview/${review.id}`,
                            state: {
                                review: review
                            }
                        }}
                        className="userReview__edit">Edit Review</Link>
                }
            </div>
        </div>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const PostContent = (props)  => {

    const { post, auth } = props

    return (
        <div className="reviewItem__content">
            <aside className="reviewItem__aside">
                <div className="reviewItem__user">
                    <span className="penta-title">{post.author.name}</span>
                    <div className="penta-bar"></div>
                </div>

                <div className="reviewItem__user-details">
                    <dt>Posts:</dt>
                    <dd>{post.author.reviews.length}</dd>
                    <dt>Comments:</dt>
                    <dd>{post.author.comments.length}</dd>
                    <dt>Companies:</dt>
                    <dd>{post.author.companies.length}</dd>
                    <dt>Employed:</dt>
                    <dd>{post.author.employment.length}</dd>
                    <dt>Joined:</dt>
                    <dd>{moment(review.author.createdAt).format("YYYY-MM-DD")}</dd>
                </div>
            </aside>

            <article className="reviewItem__article">
                <div className="reviewItem--article-head">{moment(post.updatedAt).format("YYYY-MM-DD, h:mm:ss a")}</div>
                <p>{post.body}</p>
            </article>

            <div className="reviewItem__footer">
                {
                    post.author.id === auth &&
                    <Link
                        to={{
                            pathname: `/EditPost/${post.id}`,
                            state: {
                                post: post
                            }
                        }}
                        className="btn--review-item">Edit</Link>
                }
            </div>
        </div>
    )
}
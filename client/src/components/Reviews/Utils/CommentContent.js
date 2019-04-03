import React from 'react'
import { Link } from 'react-router-dom'
import UpdateComment from '../../Comments/UpdateComment'
import moment from 'moment'

export const CommentContent = (props) => {

    const { comment, auth } = props

    return (
        <div className="reviewItem__content">
            <aside className="reviewItem__aside">
                <div className="reviewItem__user">
                    <span className="penta-title">{comment.author.name}</span>
                    <div className="penta-bar"></div>
                </div>

                <div className="reviewItem__user-details">
                    <dt>Reviews:</dt>
                    <dd>{comment.author.reviews.length}</dd>
                    <dt>Comments:</dt>
                    <dd>{comment.author.comments.length}</dd>
                    <dt>Companies:</dt>
                    <dd>{comment.author.companies.length}</dd>
                    <dt>Employed:</dt>
                    <dd>{comment.author.employment.length}</dd>
                    <dt>Joined:</dt>
                    <dd>{moment(comment.author.createdAt).format("YYYY-MM-DD")}</dd>
                </div>
            </aside>

            <article className="reviewItem__article">
                <div className="reviewItem--article-head">{moment(comment.updatedAt).format("YYYY-MM-DD, h:mm:ss a")}</div>
                <p>{comment.text}</p>
            </article>

            <div className="reviewItem__footer">
                {
                    comment.author.id === auth &&
                    <button
                        className="button button--update-comment"
                        onClick={() => props.updateClicker(comment)}>
                        Update Comment?
                    </button>
                }
            </div>

            <UpdateComment
                updateSelected={props.updateSelected}
                updateClear={props.updateClear}
                selectedComment={props.selectedComment}
                handleChange={props.handleUpdateComment}
                history={props.history}
            />
        </div>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { QuickEdit } from '../../Comments/utils/QuickEdit'
import moment from 'moment'

export const CommentContent = (props) => {

    const { updateSelected, selectedComment, comment, auth } = props

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
                {
                    updateSelected === true && selectedComment.id === comment.id
                        ?
                        <QuickEdit
                            updateSelected={updateSelected}
                            updateClear={props.updateClear}
                            selectedComment={selectedComment}
                            handleChange={props.handleChange}
                            newComment={props.newComment}
                            history={props.history}
                            mutate={props.mutate}
                        />
                        :
                        <p>{comment.text}</p>
                }
            </article>

            <div className="reviewItem__footer">
                {
                    comment.author.id === auth &&
                    <button
                        className="btn--review-item"
                        onClick={() => {
                            props.updateClear()
                            props.updateClicker(comment)
                        }}>
                        Update
                    </button>
                }
            </div>
        </div>
    )
}
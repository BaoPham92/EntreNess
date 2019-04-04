import React from 'react'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'

export const Form = (props) => {

    const { mutate, remove, review, user } = props
    const match = props.match
    const urlMatched = props.match.path === '/CreateReview'

    return (
        <form
            onSubmit={
                (e) => {
                    e.preventDefault()
                    review.published = JSON.parse(review.published)

                    const hasId = props.id
                    const validId =
                        hasId ? { variables: { id: hasId, data: review } }
                            : { variables: { data: review } }

                    mutate(validId)
                        .then((res) => {
                            console.log(res)
                            return props.history.replace('/Reviews')
                        })
                        .catch(e => console.log(e))
                }
            }
        >
            <div className="update--grid">

                <section className="update--head">
                    <h3> {urlMatched ? 'Create' : 'Edit'} Review</h3>
                </section>

                <div className="update--username">
                    <strong>User:</strong>
                    <span>{urlMatched ? user.name : review.author.name}</span>
                </div>

                <div className="update--subject">
                    <strong>Subject:</strong>
                    <input
                        className="update-title-input"
                        type="text"
                        name="title"
                        placeholder="title"
                        defaultValue={urlMatched ? '' : review.title}
                        required={urlMatched && true}
                        onChange={props.handleChange}
                    />
                </div>

                <div className="update--body">
                    <strong>Body:</strong>
                    <textarea
                        className="update-textarea"
                        type="text"
                        cols="50"
                        rows="15"
                        name="body"
                        placeholder="body"
                        defaultValue={urlMatched ? '' : review.body}
                        required={urlMatched && true}
                        onChange={props.handleChange}
                    />
                </div>

                <div className="update--options">
                    <select
                        name="published"
                        className="btn--update-review"
                        onChange={props.handleChange}
                        required={urlMatched && true}
                        value="none"
                    >
                        <option value="none" disabled>Published?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>

                    <button className="btn--update-review">
                        {urlMatched ? 'Create Review' : 'Update'}
                    </button>

                    <button
                        className="btn__main"
                        hidden={urlMatched && true}
                        onClick={
                            () => {
                                confirm('Are you sure you want to delete?')
                                remove({ variables: { id: review.id } })
                                    .then(() => history.replace('/UserProfile'))
                            }
                        }
                    >Delete Review?</button>
                </div>
            </div>
        </form>
    )
}

export default withRouter(withApollo(Form))
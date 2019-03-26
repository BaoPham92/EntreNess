import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withApollo, Query } from 'react-apollo'

export const Form = (props) => {
    const pathname = props.location.pathname

    return (
        <div>
            <form
            className="review__form"
            onSubmit={
                (e) => {
                    e.preventDefault()
                    const review = props.review
                    review.published = JSON.parse(review.published)

                    const hasId = props.id
                    const validId = 
                    hasId ? { variables: { id: hasId, data: review }} 
                    : { variables: { data: review } }

                    props.mutate(validId)
                    .then((res) => {
                        console.log(res)
                        return props.history.replace('/Reviews')
                    })
                    .catch(e => console.log(e))
                }
            }
            >
                <input 
                type="text"
                name="title"
                className="review__title-input"
                placeholder="title"
                required={pathname === '/CreateReview' && true}
                onChange={props.handleChange}
                />
                <textarea
                className="review__text-area" 
                type="text"
                cols="50"
                rows="15"
                name="body"
                placeholder="body"
                required={pathname === '/CreateReview' && true}
                onChange={props.handleChange}
                />
                <textarea
                className="review__text-area" 
                type="text"
                cols="50"
                rows="15"
                name="experience"
                placeholder="experience"
                required={pathname === '/CreateReview' && true}
                onChange={props.handleChange}
                />

            <div>
                <select
                    name="published"
                    className="button button--review-details"
                    onChange={props.handleChange}
                    required={pathname === '/CreateReview' && true}
                    value="none"
                >
                    <option value="none" disabled>Published?</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

                <button className="button button--review-details">
                    {pathname === '/CreateReview' ? 'Create Review' : 'Update'}
                </button>
            </div>

            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        review: state.review
    }
}

export default withRouter(withApollo(connect(mapStateToProps)(Form)))
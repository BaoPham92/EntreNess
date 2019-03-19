import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withApollo, Query } from 'react-apollo'

export const Form = (props) => {
    const pathname = props.location.pathname

    return (
        <div>
            <form
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
                placeholder="title"
                required={pathname === '/CreateReview' && true}
                onChange={props.handleChange}
                />
                <input 
                type="text"
                name="body"
                placeholder="body"
                required={pathname === '/CreateReview' && true}
                onChange={props.handleChange}
                />
                <input 
                type="text"
                name="experience"
                placeholder="experience"
                required={pathname === '/CreateReview' && true}
                onChange={props.handleChange}
                />

                <select 
                name="published"
                onChange={props.handleChange}
                required={pathname === '/CreateReview' && true}
                >
                    <option value="undefined">None</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <button>Publish?</button>
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
import React from 'react'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'

export const Form = (props) => {

    const { mutate, remove, post, user } = props
    const match = props.match
    const urlMatched = props.match.path === '/CreatePost'

    return (
        <form
            onSubmit={
                (e) => {
                    e.preventDefault()
                    post.published = JSON.parse(post.published)

                    const hasId = props.id
                    const validId =
                        hasId ? { variables: { id: hasId, data: post } }
                            : { variables: { data: post } }

                    mutate(validId)
                        .then((res) => {
                            console.log(res)
                            return props.history.replace('/Posts')
                        })
                        .catch(e => console.log(e))
                }
            }
        >
            <div className="update--grid">

                <section className="update--head">
                    <h3> {urlMatched ? 'Create' : 'Edit'} post</h3>
                </section>

                <div className="update--username">
                    <strong>User:</strong>
                    <span>{urlMatched ? user.name : post.author.name}</span>
                </div>

                <div className="update--subject">
                    <strong>Subject:</strong>
                    <input
                        className="update-title-input"
                        type="text"
                        name="title"
                        placeholder="title"
                        defaultValue={urlMatched ? '' : post.title}
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
                        defaultValue={urlMatched ? '' : post.body}
                        required={urlMatched && true}
                        onChange={props.handleChange}
                    />
                </div>

                <div className="update--options">
                    <select
                        name="published"
                        className="btn__main"
                        onChange={props.handleChange}
                        required={urlMatched && true}
                        value="none"
                    >
                        <option value="none" disabled>Published?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>

                    <button className="btn__main">
                        {urlMatched ? 'Create Post' : 'Update'}
                    </button>

                    <button
                        className="btn__main"
                        hidden={urlMatched && true}
                        onClick={
                            () => {
                                confirm('Are you sure you want to delete?')
                                remove({ variables: { id: post.id } })
                                    .then(() => history.replace('/UserProfile'))
                            }
                        }
                    >Delete post?</button>
                </div>
            </div>
        </form>
    )
}

export default withRouter(withApollo(Form))
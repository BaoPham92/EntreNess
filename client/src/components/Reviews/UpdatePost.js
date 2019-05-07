import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import Form from './Utils/Form'
import { startUpdatePost, startCreatePost } from '../../actions/posts'
import { UserProfileQuery } from '../../queries/Users'
import { QueryPosts } from '../../queries/Posts'
import {
    UpdatePostMutation,
    DeletePostMutation,
    CreatePostMutation
} from '../../mutations/Posts'

export class UpdatePost extends Component {

    handleChange = (e) => {
        e.persist()
        const match = this.props.match

        match.path === '/CreatePost'
        ? this.props.startCreatePost({ [e.target.name]: e.target.value })
        : this.props.startUpdatePost({ [e.target.name]: e.target.value })
    }

    render() {
        
        const {
            match: { path },
            UpdatePost,
            DeletePost,
            CreatePost,
            posts,
            self,
        } = this.props
        console.log(this.props, self, posts)

        const result = path === '/CreatePost' 
        ? CreatePost
        : UpdatePost

        return self.loading ? null : (
            <div className="container__main">
                <div className="template__main">
                    <Form
                        handleChange={this.handleChange}
                        mutate={result}
                        post={posts.posts[0]}
                        remove={DeletePost}
                        id={posts.posts.length > 0 && posts.posts[0].id}
                        user={self.self}
                    />

                </div>
            </div>
        )
    }
}

const mapOperationsToProps = compose(
    graphql(QueryPosts, {
        options: (props) => ({
            variables: { 
                query: props.match.params.id 
            }
        }),
        name: 'posts'
    }),
    graphql(UserProfileQuery, {
        name: 'self'
    }),
    graphql(CreatePostMutation, {
        name: 'CreatePost'
    }),
    graphql(UpdatePostMutation, {
        name: 'UpdatePost'
    }),
    graphql(DeletePostMutation, {
        name: 'DeletePost'
    }))

const updatePostWithOperations = mapOperationsToProps(UpdatePost)

const mapDispatchToProps = (dispatch) => ({
    startUpdatePost: (postData) => dispatch(startUpdatePost(postData)),
    startCreatePost: (postData) => dispatch(startCreatePost(postData))
})

export default withApollo(connect(undefined, mapDispatchToProps)(updatePostWithOperations))
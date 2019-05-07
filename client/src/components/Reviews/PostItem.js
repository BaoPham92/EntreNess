import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { ReviewContent } from './Utils/PostContent'
import CommentContent from './Utils/CommentContent'
import { QueryPost, QueryPostProps } from '../../queries/Posts'
import { checkAuth } from '../../actions/auth'

export class PostItem extends Component {

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {

        const {
            data: { loading }, post, auth
        } = this.props

        return loading ? null : (
            <div className="container__main">
                <div className="reviewItem--main">
                    <section className="reviewItem--section-main">

                        <div className="reviewItem--section-intro">
                            <h2 className="reviewItem--title">{post.title}</h2>
                        </div>

                        <PostContent 
                            post={post}
                            auth={auth}
                        />

                        <CommentContent />
                    </section>
                </div>
            </div>
        )
    }
}

const mapQueriesToProps = graphql(QueryPost, QueryPostProps)
const PostItemWithQuery = mapQueriesToProps(PostItem)

const mapDispatchToProps = (dispatch) => ({
    startCreateComment: (commentData) => dispatch(startCreateComment(commentData)),
    checkAuth: () => dispatch(checkAuth())
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItemWithQuery)
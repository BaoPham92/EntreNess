import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { QueryPosts } from '../../queries/Posts'
import { checkAuth } from '../../actions/auth'

export class Posts extends Component {

    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        const { data: { loading, posts, history } } = this.props
        console.log(this.props)

        return loading ? null : (
            <div className="container__main">
                <div className="template__main">

                    <div className="container__intro">
                        <section className="reviews--section-intro">
                            <h2 className="reviews--title">Posts</h2>
                        </section>
                        <div className="reviews__create-review">
                            <Link to="/CreatePost">
                            Create Post
                            </Link>
                        </div>
                    </div>

                    <div className="container__sub">
                        {posts.map((post, index) => (
                            post.published &&
                            <section className="reviews--section-main" key={index}>

                                <div className="reviews__content">
                                    <div className="reviews__head">
                                        <span className="head-item-1"> Titile / Author </span>
                                        <span className="head-item-2"> Comments </span>
                                    </div>

                                    <article className="reviews__article">
                                        <Link to={`/ReviewItem/${post.id}`}>
                                            <h3>{post.title}</h3>
                                        </Link>

                                        <span>{post.author.name}</span>
                                    </article>

                                    <aside className="reviews__aside">
                                        <span>{post.comments.length}</span>
                                    </aside>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapQueriesToProps = graphql(QueryPosts, {
    options: (props) => ({
        variables: { query: props.match.params.id }
    })
})
const PostsWithQuery = mapQueriesToProps(Posts)

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(undefined, mapDispatchToProps)(PostsWithQuery)
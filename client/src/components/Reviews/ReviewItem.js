import React from 'react'
import { Link } from 'react-router-dom'

export const ReviewItem = (props) => {
    const {location: { state: { review }, location }} = props

    return (
        <div>
        <Link to="/Reviews"> Reviews </Link>
            <h1>EntreNess</h1>
            
            <section>
                <h2>Title: {review.title}</h2>

                <p>Description: {review.body}</p>
                <p>Experience: {review.experience}</p>
            </section>

            <section>
                <h3>Comments: </h3>

                {review.comments.length > 0 && review.comments.map((comment, index) => (
                    <ul key={index}>
                        <li>Username: {comment.author.name}</li>
                        <li>Comment: {comment.text}</li>
                    </ul>
                ))}
            </section>

        </div>
    )
}
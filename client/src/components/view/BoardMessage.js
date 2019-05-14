import React from 'react'
import { NavLink } from 'react-router-dom'
import CreateUser from '../Users/CreateUser'

export const BoardMessage = (props) => {

    return (

        <div className="mb-menu">

        {/* Component soon to be replace static content in DashBoard. */}

            <div className="mb-info">
                <h1>Join the community for a discussion</h1>
                <dd>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</dd>
            </div>

            <CreateUser />
        </div>
    )
}
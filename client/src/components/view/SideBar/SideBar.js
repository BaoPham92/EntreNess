import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { UserProfileQuery } from '../../../queries/Users'
import moment from 'moment'

export class SideBar extends Component {
    
    render() {
        const {
            data: { loading, self }
        } = this.props
        console.log(this.props)

        return loading ? null : (
            <div className="container__side">
                <div className="side-bar__main">
                    <h4 className="side-bar__user">{self.name}</h4>

                    <div className="side-bar__content">
                        <dt>Reviews:</dt>
                        <dd>{self.reviews.length}</dd>
                        <dt>Comments:</dt>
                        <dd>{self.comments.length}</dd>
                        <dt>Joined:</dt>
                        <dd>{moment(self.createdAt).format("YYYY-MM-DD")}</dd>
                    </div>
                </div>
            </div>
        )
    }
}

const mapQueryToProps = graphql(UserProfileQuery)
const sideBarWithQuery = mapQueryToProps(SideBar)

export default (sideBarWithQuery)
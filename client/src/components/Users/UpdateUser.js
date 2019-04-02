import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo, compose } from 'react-apollo'
import { UpdateUserMutation } from '../../mutations/Users'
import { startUpdateUser } from '../../actions/users'
import { logout } from '../../actions/auth'
import { DeleteUserMutation } from '../../mutations/Users'
import Form from './Utils/Form'

export class UpdateUser extends Component {

    handleChange = (e) => {
        e.persist()
        this.props.startUpdateUser({ [e.target.name]: e.target.value })
    }

    render() {
        const { client: { cache: { data: { data } } }, UpdateUser, DeleteUser } = this.props
        const self = data["$ROOT_QUERY.self"]
        return (
            <div className="container__main">
                <div className="template__main">

                    <div className="container__sub">
                        <section className="user-profile--section-main">

                            <div className="user-profile--section-info">
                                <h3>User Information</h3>
                            </div>

                            <div className="user-profile--section-sub">
                                <div className="user-profile--grid-main">
                                    <dt>Name:</dt>
                                    <dd>{self.name}</dd>
                                    <dt>Email:</dt>
                                    <dd>{self.email}</dd>
                                    <dt>Password:</dt>
                                    <dd>{self.password}</dd>
                                    <dt>Contact Number:</dt>
                                    <dd>{!self.contactNumber ? 'No info provided.' : self.contactNumber}</dd>
                                    <dt>Age:</dt>
                                    <dd>{!self.age ? 'No info provided.' : self.age}</dd>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="container__sub">
                        <section className="user-profile--section-main">

                            <div className="user-profile--section-info">
                                <h3>Adjust Information Here</h3>
                            </div>

                            <div className="user-profile--grid-main">
                                <div className="user-profile--section-sub">
                                    <Form
                                        handleChange={this.handleChange}
                                        mutate={UpdateUser}
                                    />

                                    <button onClick={() => {
                                        DeleteUser()
                                            .then((res) => {
                                                console.log(res)
                                                this.props.logout()
                                            })
                                    }}>Close Account?</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

const mapMutationToProps = compose(
    graphql(UpdateUserMutation, {
        name: 'UpdateUser'
    }),
    graphql(DeleteUserMutation, {
        name: 'DeleteUser'
    }))
const updateUserWithMutation = (mapMutationToProps(UpdateUser))

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    startUpdateUser: (userData) => dispatch(startUpdateUser(userData)),
    logout: () => dispatch(logout())
})

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(updateUserWithMutation))
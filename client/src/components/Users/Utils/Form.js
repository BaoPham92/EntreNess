import React from 'react'
import { connect } from 'react-redux'

const Form = (props) => (
    <form
        onSubmit={
            (e) => {
                e.preventDefault()
                const user = props.user
                const valideAge = user.age >= 16 && user.age <= 99

                if (user.age && !valideAge) {
                    alert('Require age: 16')
                }

                props.mutate({ variables: { data: user } })
                    .then(res => console.log(res))
                    .catch(e => console.log(e))
            }
        }>
        {console.log(props)}
        <input
            type="text"
            placeholder="name"
            name="name"
            required
            onChange={props.handleChange}
        />
        <input
            type="text"
            placeholder="email"
            name="email"
            required
            onChange={props.handleChange}
        />
        <input
            type="text"
            placeholder="password"
            name="password"
            required
            onChange={props.handleChange}
        />
        <input
            type="text"
            placeholder="contact number"
            name="contactNumber"
            onChange={props.handleChange}
        />
        <input
            type="number"
            placeholder="age"
            name="age"
            onChange={props.handleChange}
        />
        <button type="submit">Register</button>
    </form>
)

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Form)
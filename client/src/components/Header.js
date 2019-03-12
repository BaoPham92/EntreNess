import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <header>
        <NavLink exact to="/">HomePage</NavLink>
        <NavLink to="/Users">Users</NavLink>
        <NavLink to="/Login">Login</NavLink>
    </header>
)

export default Header
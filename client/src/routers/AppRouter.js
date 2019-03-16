import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import NotFoundPage from '../components/NotFoundPage'
import HomePage from '../components/view/HomePage'
import Login from '../components/Users/Login'
import Users from '../components/Users/Users'
import UserProfile from '../components/Users/UserProfile'
import PrivateRoute from '../routers/PrivateRoute'
import DashBoard from '../components/view/DashBoard'

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute path="/Dashboard" component={DashBoard} />
                <PrivateRoute path="/users" component={Users} />
                <PrivateRoute path="/UserProfile" component={UserProfile} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter

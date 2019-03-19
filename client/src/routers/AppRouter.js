import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import NotFoundPage from '../components/NotFoundPage'
import HomePage from '../components/view/HomePage'
import Login from '../components/Users/Login'
import Users from '../components/Users/Users'
import UserProfile from '../components/Users/UserProfile'
import UpdateUser from '../components/Users/UpdateUser'
import PrivateRoute from '../routers/PrivateRoute'
import PublicRoute from '../routers/PublicRoute'
import DashBoard from '../components/view/DashBoard'
import Reviews from '../components/Reviews/Reviews'

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/Dashboard" component={DashBoard} />
                <PrivateRoute path="/users" component={Users} />
                <PrivateRoute path="/UserProfile" component={UserProfile} />
                <PrivateRoute path="/UpdateUser" component={UpdateUser}/>
                <Route path="/Reviews" component={Reviews}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter

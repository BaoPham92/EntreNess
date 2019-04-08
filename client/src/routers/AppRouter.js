import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/view/LoginPage'
import Login from '../components/Users/Login'
import Users from '../components/Users/Users'
import UserProfile from '../components/Users/UserProfile'
import UpdateUser from '../components/Users/UpdateUser'
import PrivateRoute from '../routers/PrivateRoute'
import PublicRoute from '../routers/PublicRoute'
import DashBoard from '../components/view/DashBoard'
import Reviews from '../components/Reviews/Reviews'
import ReviewItem from '../components/Reviews/ReviewItem'
import UpdateReview from '../components/Reviews/UpdateReview'

export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute exact path="/" component={LoginPage} />
                <PrivateRoute path="/Dashboard" component={DashBoard} />
                <PublicRoute path="/users" component={Users} />
                <PrivateRoute path="/UserProfile" component={UserProfile} />
                <PrivateRoute path="/UpdateUser" component={UpdateUser}/>
                <PublicRoute exact={true} path="/Reviews" component={Reviews}/>
                <PublicRoute exact={true} path="/ReviewItem/:id" component={ReviewItem}/>
                <PrivateRoute path="/CreateReview" component={UpdateReview}/>
                <PrivateRoute exact={true} path="/Reviews/:id" component={Reviews}/>
                <PrivateRoute exact={true} path="/EditReview/:id" component={UpdateReview}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter

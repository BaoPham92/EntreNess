import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NotFoundPage from '../components/NotFoundPage'
import Users from '../components/Users/Users'
import UserProfile from '../components/Users/UserProfile'
import UpdateUser from '../components/Users/UpdateUser'
import PrivateRoute from '../routers/PrivateRoute'
import PublicRoute from '../routers/PublicRoute'
import DashBoard from '../components/view/DashBoard'
import Posts from '../components/Reviews/Posts'
import PostItem from '../components/Reviews/PostItem'
import UpdatePost from '../components/Reviews/UpdatePost'

export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute exact path="/" component={DashBoard} />
                <PublicRoute path="/users" component={Users} />
                <PrivateRoute path="/UserProfile" component={UserProfile} />
                <PrivateRoute path="/UpdateUser" component={UpdateUser}/>
                <PublicRoute exact={true} path="/Posts" component={Posts}/>
                <PublicRoute exact={true} path="/PostItem/:id" component={PostItem}/>
                <PrivateRoute path="/CreatePost" component={UpdatePost}/>
                <PrivateRoute exact={true} path="/Posts/:id" component={Posts}/>
                <PrivateRoute exact={true} path="/EditPost/:id" component={UpdatePost}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter

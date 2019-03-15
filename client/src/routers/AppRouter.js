import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'
import HomePage from '../components/view/HomePage'
import Login from '../components/Users/Login'
import Users from '../components/Users/Users'

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter

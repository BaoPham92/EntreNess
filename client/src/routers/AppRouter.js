import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'
import HomePage from '../components/view/HomePage'
import Login from '../components/Users/Login'
import Users from '../components/Users/Users'

const AppRouter = () => (
    <div>
        <Header />
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={Login}/>
            <Route path="/users" component={Users}/>
            <Route component={NotFoundPage} />
        </Switch>
    </div>
);

export default AppRouter;

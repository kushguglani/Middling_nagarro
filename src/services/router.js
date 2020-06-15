import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../container/home';
import Login from '../container/formContainer';
// import Signup from '../component/signup';
// import FeedEventsProp from '../component/feeds';
import NewArticle from '../container/createArticle'
import UserSettings from '../container/userSettings'
import UserPage from '../container/userPage'
import FeedPage from '../container/feedPage'
import Base from '../component/base';
// import PrivateRoute from './privateRoute'


const routes = (
    <Switch>
        <Route exact path="/" >
            <Base ><Home /></Base>
        </Route>
        <Route path="/home" >
            <Base ><Home /></Base>
        </Route>
        <Route path="/login" ><Base> <Login /> </Base></Route>
        <Route path="/newArticle" ><Base> <NewArticle /> </Base></Route>
        <Route path="/settings" ><Base> <UserSettings /> </Base></Route>
        <Route path="/articles/:id" ><Base> <FeedPage /> </Base></Route>
        <Route path="/user/:id" ><Base> <UserPage /> </Base></Route>
    </Switch>
)

export default routes;
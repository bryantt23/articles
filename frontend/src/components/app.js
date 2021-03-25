import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

import Articles from './article/Articles';
import Article from './article/Article';
import AddArticle from './article/AddArticle';
import EditArticle from './article/EditArticle';

import Notification from './notification/Notification';

import { Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBarContainer />
      <Notification />

      <Switch>
        <AuthRoute exact path='/' component={MainPage} />
        <AuthRoute exact path='/login' component={LoginFormContainer} />
        <AuthRoute exact path='/signup' component={SignupFormContainer} />

        <ProtectedRoute exact path='/articles/:id' component={Article} />
        <ProtectedRoute exact path='/articles' component={Articles} />
        <ProtectedRoute exact path='/add-article' component={AddArticle} />
        <ProtectedRoute
          exact
          path='/edit-article/:id'
          component={EditArticle}
        />
      </Switch>
    </div>
  );
}

export default App;
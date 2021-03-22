import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

// import TweetsContainer from './tweets/tweets_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
// import ProfileContainer from './profile/profile_container';
// import TweetComposeContainer from './tweets/tweet_compose_container';

import Articles from './article/Articles';
import Article from './article/Article';
import AddArticle from './article/AddArticle';
import EditArticle from './article/EditArticle';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBarContainer />
      {/* <Router> */}
      <Switch>
        <AuthRoute exact path='/' component={MainPage} />
        <AuthRoute exact path='/login' component={LoginFormContainer} />
        <AuthRoute exact path='/signup' component={SignupFormContainer} />

        {/* <Route path='/articles/:id' component={Article} />
          <Route path='/articles' component={Articles} />
          <Route path='/add-article' component={AddArticle} />
          <Route path='/edit-article/:id' component={EditArticle} /> */}
        {/* <Route exact path='/articles' component={Articles} /> */}

        <ProtectedRoute exact path='/articles/:id' component={Article} />
        <ProtectedRoute exact path='/articles' component={Articles} />
        <ProtectedRoute exact path='/add-article' component={AddArticle} />
        <ProtectedRoute
          exact
          path='/edit-article/:id'
          component={EditArticle}
        />
      </Switch>
      {/* </Router> */}
    </div>
  );
}

export default App;

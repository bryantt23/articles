import React from 'react';
import Articles from './components/Article/Articles';
import Article from './components/Article/Article';
import AddArticle from './components/Article/AddArticle';
import EditArticle from './components/Article/EditArticle';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/articles/:id' component={Article} />
          <Route path='/articles' component={Articles} />
          <Route path='/add-article' component={AddArticle} />
          <Route path='/edit-article/:id' component={EditArticle} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import Articles from './components/Articles';
import Article from './components/Article';
import AddArticle from './components/AddArticle';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/articles/:id' component={Article} />
          <Route path='/articles' component={Articles} />
          <Route path='/add-article' component={AddArticle} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

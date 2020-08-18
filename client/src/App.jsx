import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import HomeView from './views/HomeView';
import SinglePostView from './views/SinglePostView';
import PostEditView from './views/PostEditView';
import PostCreationView from './views/PostCreationView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">CRUDer</Link>
          <Link to="/post/create">Create a post</Link>
        </nav>
        <Switch>
          <Route path="/" component={HomeView} exact />
          <Route path="/post/create" component={PostCreationView} />
          <Route path="/post/:id/edit" component={PostEditView} />
          <Route path="/post/:id" component={SinglePostView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

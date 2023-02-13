import React from 'react';
import ReactDOM from 'react-dom/client';
import Timeline from '@views/Timeline';
import Settings from '@views/Settings';
import FeedById from '@views/FeedById';
import NewFeed from '@views/NewFeed';
import Topic from '@views/Topic';
import './style.css';

import { Redirect, Route, Switch } from 'wouter';

const App = () => (
  <Switch>
    <Route path='/' component={Timeline} />
    <Route path='/new-feed' component={NewFeed} />
    <Route
      path='/feeds/:id'
      component={({ params }) =>
        params.id ? <FeedById id={params.id} /> : <Redirect to='/404' />
      }
    />
    <Route path='/topic' component={Topic} />
    <Route path='/settings' component={Settings} />
    <Route>404, Not Found!</Route>
  </Switch>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

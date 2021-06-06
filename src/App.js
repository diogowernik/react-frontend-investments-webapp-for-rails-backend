import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Posts from './posts/Posts'
import PostForm from './posts/PostForm'
import PostDelete from './posts/PostDelete'

import Years from './years/Years'
import YearForm from './years/YearForm'
import YearDelete from './years/YearDelete'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Posts} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/posts/new' component={PostForm} />

          <Route exact path='/years' component={Years} />
          <Route exact path='/years/new' component={YearForm} />

          <Route
            exact path="/posts/:id/edit"
            render={(routeProps) => (
              <PostForm {...routeProps} />
            )}
          />
          <Route
            exact path="/posts/:id/delete"
            render={(routeProps) => (
              <PostDelete {...routeProps} />
            )}
          />

          <Route
            exact path="/years/:id/edit"
            render={(routeProps) => (
              <YearForm {...routeProps} />
            )}
          />

          <Route
            exact path="/years/:id/delete"
            render={(routeProps) => (
              <YearDelete {...routeProps} />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App

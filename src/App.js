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

import Cryptos from './cryptos/Cryptos'
import CryptoForm from './cryptos/CryptoForm'
import CryptoDelete from './cryptos/CryptoDelete'
import CryptoShow from './cryptos/CryptoShow'

import Wallets from './wallets/Wallets'
import WalletForm from './wallets/WalletForm'
import WalletDelete from './wallets/WalletDelete'
import WalletShow from './wallets/WalletShow'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Posts} />
          
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/posts/new' component={PostForm} />
          <Route exact path="/posts/:id/edit" render={(routeProps) => (<PostForm {...routeProps} /> )}/>
          <Route exact path="/posts/:id/delete" render={(routeProps) => ( <PostDelete {...routeProps} /> )} />

          <Route exact path='/years' component={Years} />
          <Route exact path='/years/new' component={YearForm} />
          <Route exact path="/years/:id/edit" render={(routeProps) => ( <YearForm {...routeProps} /> )} />
          <Route exact path="/years/:id/delete" render={(routeProps) => ( <YearDelete {...routeProps} /> )} />

          <Route exact path='/cryptos' component={Cryptos} />
          <Route exact path='/cryptos/new' component={CryptoForm} />
          <Route exact path="/crypto/:id/edit" render={(routeProps) => ( <CryptoForm {...routeProps} /> )} />
          <Route exact path="/crypto/:id/delete" render={(routeProps) => ( <CryptoDelete {...routeProps} /> )} />
          <Route exact path="/crypto/:id" render={(routeProps) => ( <CryptoShow {...routeProps} /> )} />

          <Route exact path='/wallets' component={Wallets} />
          <Route exact path='/wallets/new' component={WalletForm} />
          <Route exact path="/wallet/:id/edit" render={(routeProps) => ( <WalletForm {...routeProps} /> )} />
          <Route exact path="/wallet/:id/delete" render={(routeProps) => ( <WalletDelete {...routeProps} /> )} />
          <Route exact path="/wallet/:id" render={(routeProps) => ( <WalletShow {...routeProps} /> )} />



        </div>
      </Router>
    )
  }
}

export default App

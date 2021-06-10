import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Years from './years/Years'
import YearForm from './years/YearForm'
import YearDelete from './years/YearDelete'

import Wallets from './wallets/Wallets'
import WalletForm from './wallets/WalletForm'
import WalletDelete from './wallets/WalletDelete'
import WalletShow from './wallets/WalletShow'

import Categories from './categories/Categories'
import CategoryForm from './categories/CategoryForm'
import CategoryDelete from './categories/CategoryDelete'
import CategoryShow from './categories/CategoryShow'

import Portfolios from './portfolios/Portfolios'
import PortfolioForm from './portfolios/PortfolioForm'
import PortfolioDelete from './portfolios/PortfolioDelete'
import PortfolioShow from './portfolios/PortfolioShow'

import Investments from './investments/Investments'
import InvestmentForm from './investments/InvestmentForm'
import InvestmentDelete from './investments/InvestmentDelete'
import InvestmentShow from './investments/InvestmentShow'

import NavBar from './layouts/navbar'

class App extends Component {
  render() {
    return (
      <>
      <NavBar />
      <Router>
        <div>
          <Route exact path='/' component={Portfolios} />

          <Route exact path='/years' component={Years} />
          <Route exact path='/years/new' component={YearForm} />
          <Route exact path="/years/:id/edit" render={(routeProps) => ( <YearForm {...routeProps} /> )} />
          <Route exact path="/years/:id/delete" render={(routeProps) => ( <YearDelete {...routeProps} /> )} />

          <Route exact path='/wallets' component={Wallets} />
          <Route exact path='/wallets/new' component={WalletForm} />
          <Route exact path="/wallet/:id/edit" render={(routeProps) => ( <WalletForm {...routeProps} /> )} />
          <Route exact path="/wallet/:id/delete" render={(routeProps) => ( <WalletDelete {...routeProps} /> )} />
          <Route exact path="/wallet/:id" render={(routeProps) => ( <WalletShow {...routeProps} /> )} />

          <Route exact path='/categories' component={Categories} />
          <Route exact path='/categories/new' component={CategoryForm} />
          <Route exact path="/category/:id/edit" render={(routeProps) => ( <CategoryForm {...routeProps} /> )} />
          <Route exact path="/category/:id/delete" render={(routeProps) => ( <CategoryDelete {...routeProps} /> )} />
          <Route exact path="/category/:id" render={(routeProps) => ( <CategoryShow {...routeProps} /> )} />

          <Route exact path='/portfolios' component={Portfolios} />
          <Route exact path='/portfolios/new' component={PortfolioForm} />
          <Route exact path="/portfolio/:id/edit" render={(routeProps) => ( <PortfolioForm {...routeProps} /> )} />
          <Route exact path="/portfolio/:id/delete" render={(routeProps) => ( <PortfolioDelete {...routeProps} /> )} />
          <Route exact path="/portfolio/:id" render={(routeProps) => ( <PortfolioShow {...routeProps} /> )} />

          <Route exact path='/investments' component={Investments} />
          <Route exact path='/investments/new' component={InvestmentForm} />
          <Route exact path="/investment/:id/edit" render={(routeProps) => ( <InvestmentForm {...routeProps} /> )} />
          <Route exact path="/investment/:id/delete" render={(routeProps) => ( <InvestmentDelete {...routeProps} /> )} />
          <Route exact path="/investment/:id" render={(routeProps) => ( <InvestmentShow {...routeProps} /> )} />



        </div>
      </Router>
      </>
    )
  }
}

export default App

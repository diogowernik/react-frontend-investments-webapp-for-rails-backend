import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Years from './years/Years'
import YearForm from './years/YearForm'
import YearDelete from './years/YearDelete'

import Radarfiis from './radarfiis/Radarfiis'
import RadarfiiForm from './radarfiis/RadarfiiForm'
import RadarfiiDelete from './radarfiis/RadarfiiDelete'
import RadarfiiShow from './radarfiis/RadarfiiShow'

import Categories from './categories/Categories'
import CategoryForm from './categories/CategoryForm'
import CategoryDelete from './categories/CategoryDelete'
import CategoryShow from './categories/CategoryShow'

import Portfolios from './portfolios/Portfolios'
import PortfolioForm from './portfolios/PortfolioForm'
import PortfolioDelete from './portfolios/PortfolioDelete'
import PortfolioShow from './portfolios/PortfolioShow'

import Cryptos from './cryptos/Cryptos'
import CryptoForm from './cryptos/CryptoForm'
import CryptoDelete from './cryptos/CryptoDelete'
import CryptoShow from './cryptos/CryptoShow'

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

          <Route exact path='/radarfiis' component={Radarfiis} />
          <Route exact path='/radarfiis/new' component={RadarfiiForm} />
          <Route exact path="/radarfii/:id/edit" render={(routeProps) => ( <RadarfiiForm {...routeProps} /> )} />
          <Route exact path="/radarfii/:id/delete" render={(routeProps) => ( <RadarfiiDelete {...routeProps} /> )} />
          <Route exact path="/radarfii/:id" render={(routeProps) => ( <RadarfiiShow {...routeProps} /> )} />

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

          <Route exact path='/cryptos' component={Cryptos} />
          <Route exact path='/cryptos/new' component={CryptoForm} />
          <Route exact path="/crypto/:id/edit" render={(routeProps) => ( <CryptoForm {...routeProps} /> )} />
          <Route exact path="/crypto/:id/delete" render={(routeProps) => ( <CryptoDelete {...routeProps} /> )} />
          <Route exact path="/crypto/:id" render={(routeProps) => ( <CryptoShow {...routeProps} /> )} />



        </div>
      </Router>
      </>
    )
  }
}

export default App

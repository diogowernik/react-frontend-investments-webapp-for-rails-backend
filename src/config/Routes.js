import React from 'react'
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom'

import Years from '../admin/years/Years'
import YearForm from '../admin/years/YearForm'
import YearDelete from '../admin/years/YearDelete'

import Radarfiis from '../admin/radarfiis/Radarfiis'
import RadarfiiForm from '../admin/radarfiis/RadarfiiForm'
import RadarfiiDelete from '../admin/radarfiis/RadarfiiDelete'
import RadarfiiShow from '../admin/radarfiis/RadarfiiShow'

import Categories from '../admin/categories/Categories'
import CategoryForm from '../admin/categories/CategoryForm'
import CategoryDelete from '../admin/categories/CategoryDelete'
import CategoryShow from '../admin/categories/CategoryShow'

import AdminPortfolios from '../admin/portfolios/Portfolios'
import AdminPortfolioForm from '../admin/portfolios/PortfolioForm'
import AdminPortfolioDelete from '../admin/portfolios/PortfolioDelete'
import AdminPortfolioShow from '../admin/portfolios/PortfolioShow'

import Cryptos from '../admin/cryptos/Cryptos'
import CryptoForm from '../admin/cryptos/CryptoForm'
import CryptoDelete from '../admin/cryptos/CryptoDelete'
import CryptoShow from '../admin/cryptos/CryptoShow'

import Fiis from '../admin/fiis/Fiis'
import FiiForm from '../admin/fiis/FiiForm'
import FiiDelete from '../admin/fiis/FiiDelete'
import FiiShow from '../admin/fiis/FiiShow'

import Radarcryptos from '../admin/radarcryptos/Radarcryptos'
import RadarcryptoForm from '../admin/radarcryptos/RadarcryptoForm'
import RadarcryptoDelete from '../admin/radarcryptos/RadarcryptoDelete'
import RadarcryptoShow from '../admin/radarcryptos/RadarcryptoShow'

import AppIndex from '../app/AppIndex'
import PortfolioForm from '../app/portfolios/PortfolioForm'
import PortfolioDelete from '../app/portfolios/PortfolioDelete'
import PortfolioShow from '../app/portfolios/PortfolioShow'

const Routes = (props) => {
  

  return (
    <>
            <Router>
              <div>      
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
      
                <Route exact path='/admin/portfolios' component={AdminPortfolios} />
                <Route exact path='/admin/portfolios/new' component={AdminPortfolioForm} />
                <Route exact path="/admin/portfolio/:id/edit" render={(routeProps) => ( <AdminPortfolioForm {...routeProps} /> )} />
                <Route exact path="/admin/portfolio/:id/delete" render={(routeProps) => ( <AdminPortfolioDelete {...routeProps} /> )} />
                <Route exact path="/admin/portfolio/:id" render={(routeProps) => ( <AdminPortfolioShow {...routeProps} /> )} />
      
                <Route exact path='/cryptos' component={Cryptos} />
                <Route exact path='/cryptos/new' component={CryptoForm} />
                <Route exact path="/crypto/:id/edit" render={(routeProps) => ( <CryptoForm {...routeProps} /> )} />
                <Route exact path="/crypto/:id/delete" render={(routeProps) => ( <CryptoDelete {...routeProps} /> )} />
                <Route exact path="/crypto/:id" render={(routeProps) => ( <CryptoShow {...routeProps} /> )} />
      
                <Route exact path='/fiis' component={Fiis} />
                <Route exact path='/fiis/new' component={FiiForm} />
                <Route exact path="/fii/:id/edit" render={(routeProps) => ( <FiiForm {...routeProps} /> )} />
                <Route exact path="/fii/:id/delete" render={(routeProps) => ( <FiiDelete {...routeProps} /> )} />
                <Route exact path="/fii/:id" render={(routeProps) => ( <FiiShow {...routeProps} /> )} />
      
                <Route exact path='/radarcryptos' component={Radarcryptos} />
                <Route exact path='/radarcryptos/new' component={RadarcryptoForm} />
                <Route exact path="/radarcrypto/:id/edit" render={(routeProps) => ( <RadarcryptoForm {...routeProps} /> )} />
                <Route exact path="/radarcrypto/:id/delete" render={(routeProps) => ( <RadarcryptoDelete {...routeProps} /> )} />
                <Route exact path="/radarcrypto/:id" render={(routeProps) => ( <RadarcryptoShow {...routeProps} /> )} />
      
                <Route exact path='/' component={AppIndex} />
                <Route exact path='/portfolios/new' component={PortfolioForm} />
                <Route exact path="/portfolio/:id/edit" render={(routeProps) => ( <PortfolioForm {...routeProps} /> )} />
                <Route exact path="/portfolio/:id/delete" render={(routeProps) => ( <PortfolioDelete {...routeProps} /> )} />
                <Route exact path="/portfolio/:id" render={(routeProps) => ( <PortfolioShow {...routeProps} /> )} />

              </div>
            </Router>
    </>
  )
}

export default Routes







import React from 'react'
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom'

// Landing Page
import LandingPage from '../LandingPage'


// Admin 
import AdminIndex from '../admin/AdminIndex'

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

import AdminPortfolios from '../admin/portfolios/Portfolios'
import AdminPortfolioForm from '../admin/portfolios/PortfolioForm'
import AdminPortfolioDelete from '../admin/portfolios/PortfolioDelete'

import Cryptos from '../admin/cryptos/Cryptos'
import CryptoForm from '../admin/cryptos/CryptoForm'
import CryptoDelete from '../admin/cryptos/CryptoDelete'

import Fiis from '../admin/fiis/Fiis'
import FiiForm from '../admin/fiis/FiiForm'
import FiiDelete from '../admin/fiis/FiiDelete'

import Radarcryptos from '../admin/radarcryptos/Radarcryptos'
import RadarcryptoForm from '../admin/radarcryptos/RadarcryptoForm'
import RadarcryptoDelete from '../admin/radarcryptos/RadarcryptoDelete'
import RadarcryptoShow from '../admin/radarcryptos/RadarcryptoShow'

// App 
import AppIndex from '../app/AppIndex'
import PortfolioForm from '../app/portfolios/PortfolioForm'
import PortfolioDelete from '../app/portfolios/PortfolioDelete'
import PortfolioShow from '../app/portfolios/PortfolioShow'



const Routes = (props) => {
  

  return (
    <>
            <Router>
              <div>
                {/* LandingPage */}
                <Route exact path='/' component={LandingPage} />


                {/* Admin */}
                <Route exact path='/admin' component={AdminIndex} />      
                <Route exact path='/admin/years' component={Years} />
                <Route exact path='/admin/years/new' component={YearForm} />
                <Route exact path="/admin/years/:id/edit" render={(routeProps) => ( <YearForm {...routeProps} /> )} />
                <Route exact path="/admin/years/:id/delete" render={(routeProps) => ( <YearDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/radarfiis' component={Radarfiis} />
                <Route exact path='/admin/radarfiis/new' component={RadarfiiForm} />
                <Route exact path="/admin/radarfii/:id/edit" render={(routeProps) => ( <RadarfiiForm {...routeProps} /> )} />
                <Route exact path="/admin/radarfii/:id/delete" render={(routeProps) => ( <RadarfiiDelete {...routeProps} /> )} />
                <Route exact path="/admin/radarfii/:id" render={(routeProps) => ( <RadarfiiShow {...routeProps} /> )} />
      
                <Route exact path='/admin/categories' component={Categories} />
                <Route exact path='/admin/categories/new' component={CategoryForm} />
                <Route exact path="/admin/category/:id/edit" render={(routeProps) => ( <CategoryForm {...routeProps} /> )} />
                <Route exact path="/admin/category/:id/delete" render={(routeProps) => ( <CategoryDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/portfolios' component={AdminPortfolios} />
                <Route exact path='/admin/portfolios/new' component={AdminPortfolioForm} />
                <Route exact path="/admin/portfolio/:id/edit" render={(routeProps) => ( <AdminPortfolioForm {...routeProps} /> )} />
                <Route exact path="/admin/portfolio/:id/delete" render={(routeProps) => ( <AdminPortfolioDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/cryptos' component={Cryptos} />
                <Route exact path='/admin/cryptos/new' component={CryptoForm} />
                <Route exact path="/admin/crypto/:id/edit" render={(routeProps) => ( <CryptoForm {...routeProps} /> )} />
                <Route exact path="/admin/crypto/:id/delete" render={(routeProps) => ( <CryptoDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/fiis' component={Fiis} />
                <Route exact path='/admin/fiis/new' component={FiiForm} />
                <Route exact path="/admin/fii/:id/edit" render={(routeProps) => ( <FiiForm {...routeProps} /> )} />
                <Route exact path="/admin/fii/:id/delete" render={(routeProps) => ( <FiiDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/radarcryptos' component={Radarcryptos} />
                <Route exact path='/admin/radarcryptos/new' component={RadarcryptoForm} />
                <Route exact path="/admin/radarcrypto/:id/edit" render={(routeProps) => ( <RadarcryptoForm {...routeProps} /> )} />
                <Route exact path="/admin/radarcrypto/:id/delete" render={(routeProps) => ( <RadarcryptoDelete {...routeProps} /> )} />
                

                {/* App       */}
                <Route exact path='/app' component={AppIndex} />
                <Route exact path='/portfolios/new' component={PortfolioForm} />
                <Route exact path="/portfolio/:id/edit" render={(routeProps) => ( <PortfolioForm {...routeProps} /> )} />
                <Route exact path="/portfolio/:id/delete" render={(routeProps) => ( <PortfolioDelete {...routeProps} /> )} />
                <Route exact path="/portfolio/:id" render={(routeProps) => ( <PortfolioShow {...routeProps} /> )} />

                <Route exact path="/crypto/:ticker/:id" render={(routeProps) => ( <RadarcryptoShow {...routeProps} /> )} />

              </div>
            </Router>
    </>
  )
}

export default Routes







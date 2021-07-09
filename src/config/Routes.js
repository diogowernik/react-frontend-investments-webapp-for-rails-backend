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

import Fiis from '../admin/fiis/Fiis'
import FiiForm from '../admin/fiis/FiiForm'
import FiiDelete from '../admin/fiis/FiiDelete'

import Categories from '../admin/categories/Categories'
import CategoryForm from '../admin/categories/CategoryForm'
import CategoryDelete from '../admin/categories/CategoryDelete'

import AdminPortfolios from '../admin/portfolios/Portfolios'
import AdminPortfolioForm from '../admin/portfolios/PortfolioForm'
import AdminPortfolioDelete from '../admin/portfolios/PortfolioDelete'

import Portfoliofiis from '../admin/portfoliofiis/Portfoliofiis'
import PortfoliofiiForm from '../admin/portfoliofiis/PortfoliofiiForm'
import PortfoliofiiDelete from '../admin/portfoliofiis/PortfoliofiiDelete'

import Portfoliocriptos from '../admin/portfoliocriptos/Portfoliocriptos'
import PortfoliocriptoForm from '../admin/portfoliocriptos/PortfoliocriptoForm'
import PortfoliocriptoDelete from '../admin/portfoliocriptos/PortfoliocriptoDelete'

import Criptos from '../admin/criptos/Criptos'
import CriptoForm from '../admin/criptos/CriptoForm'
import CriptoDelete from '../admin/criptos/CriptoDelete'


// App 
import Index from '../app/components/index/Index'
import Smartfolio from '../app/components/smartfolio/Smartfolio'
// import MainLayout from '../app/layouts/MainLayout'



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
      
                <Route exact path='/admin/fiis' component={Fiis} />
                <Route exact path='/admin/fiis/new' component={FiiForm} />
                <Route exact path="/admin/fii/:id/edit" render={(routeProps) => ( <FiiForm {...routeProps} /> )} />
                <Route exact path="/admin/fii/:id/delete" render={(routeProps) => ( <FiiDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/categories' component={Categories} />
                <Route exact path='/admin/categories/new' component={CategoryForm} />
                <Route exact path="/admin/category/:id/edit" render={(routeProps) => ( <CategoryForm {...routeProps} /> )} />
                <Route exact path="/admin/category/:id/delete" render={(routeProps) => ( <CategoryDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/portfolios' component={AdminPortfolios} />
                <Route exact path='/admin/portfolios/new' component={AdminPortfolioForm} />
                <Route exact path="/admin/portfolio/:id/edit" render={(routeProps) => ( <AdminPortfolioForm {...routeProps} /> )} />
                <Route exact path="/admin/portfolio/:id/delete" render={(routeProps) => ( <AdminPortfolioDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/portfoliofiis' component={Portfoliofiis} />
                <Route exact path='/admin/portfoliofiis/new' component={PortfoliofiiForm} />
                <Route exact path="/admin/portfoliofii/:id/edit" render={(routeProps) => ( <PortfoliofiiForm {...routeProps} /> )} />
                <Route exact path="/admin/portfoliofii/:id/delete" render={(routeProps) => ( <PortfoliofiiDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/portfoliocriptos' component={Portfoliocriptos} />
                <Route exact path='/admin/portfoliocriptos/new' component={PortfoliocriptoForm} />
                <Route exact path="/admin/portfoliocripto/:id/edit" render={(routeProps) => ( <PortfoliocriptoForm {...routeProps} /> )} />
                <Route exact path="/admin/portfoliocripto/:id/delete" render={(routeProps) => ( <PortfoliocriptoDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/criptos' component={Criptos} />
                <Route exact path='/admin/criptos/new' component={CriptoForm} />
                <Route exact path="/admin/cripto/:id/edit" render={(routeProps) => ( <CriptoForm {...routeProps} /> )} />
                <Route exact path="/admin/cripto/:id/delete" render={(routeProps) => ( <CriptoDelete {...routeProps} /> )} />
                

                {/* App       */}
                <Route exact path='/app' component={Index} />
                <Route exact path="/smartfolio/:slug/:id" render={(routeProps) => ( <Smartfolio {...routeProps} /> )} />
                
              </div>
            </Router>
    </>
  )
}

export default Routes







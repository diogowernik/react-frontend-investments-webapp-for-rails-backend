import React from 'react'
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom'

// Landing Page
import LandingPage from '../LandingPage'


// Admin 
import AdminIndex from '../admin/AdminIndex'

import YearForm from '../admin/components/years/YearForm'
import YearDelete from '../admin/components/years/YearDelete'

import FiiForm from '../admin/components/fiis/FiiForm'
import FiiDelete from '../admin/components/fiis/FiiDelete'

import CategoryForm from '../admin/components/categories/CategoryForm'

import AdminPortfolioForm from '../admin/components/portfolios/PortfolioForm'
import AdminPortfolioDelete from '../admin/components/portfolios/PortfolioDelete'

import PortfoliofiiForm from '../admin/components/portfoliofiis/PortfoliofiiForm'
import PortfoliofiiDelete from '../admin/components/portfoliofiis/PortfoliofiiDelete'

import PortfoliocriptoForm from '../admin/components/portfoliocriptos/PortfoliocriptoForm'
import PortfoliocriptoDelete from '../admin/components/portfoliocriptos/PortfoliocriptoDelete'

import CriptoForm from '../admin/components/criptos/CriptoForm'
import CriptoDelete from '../admin/components/criptos/CriptoDelete'


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

                <Route exact path='/admin/years/new' component={YearForm} />
                <Route exact path="/admin/years/:id/edit" render={(routeProps) => ( <YearForm {...routeProps} /> )} />
                <Route exact path="/admin/years/:id/delete" render={(routeProps) => ( <YearDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/fiis/new' component={FiiForm} />
                <Route exact path="/admin/fii/:id/edit" render={(routeProps) => ( <FiiForm {...routeProps} /> )} />
                <Route exact path="/admin/fii/:id/delete" render={(routeProps) => ( <FiiDelete {...routeProps} /> )} />
      
                <Route exact path="/admin/category/:id/edit" render={(routeProps) => ( <CategoryForm {...routeProps} /> )} />
      
                <Route exact path='/admin/portfolios/new' component={AdminPortfolioForm} />
                <Route exact path="/admin/portfolio/:id/edit" render={(routeProps) => ( <AdminPortfolioForm {...routeProps} /> )} />
                <Route exact path="/admin/portfolio/:id/delete" render={(routeProps) => ( <AdminPortfolioDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/portfoliofiis/new' component={PortfoliofiiForm} />
                <Route exact path="/admin/portfoliofii/:id/edit" render={(routeProps) => ( <PortfoliofiiForm {...routeProps} /> )} />
                <Route exact path="/admin/portfoliofii/:id/delete" render={(routeProps) => ( <PortfoliofiiDelete {...routeProps} /> )} />
      
                <Route exact path='/admin/portfoliocriptos/new' component={PortfoliocriptoForm} />
                <Route exact path="/admin/portfoliocripto/:id/edit" render={(routeProps) => ( <PortfoliocriptoForm {...routeProps} /> )} />
                <Route exact path="/admin/portfoliocripto/:id/delete" render={(routeProps) => ( <PortfoliocriptoDelete {...routeProps} /> )} />
      
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







import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
// Landing Page
import LandingPage from '../LandingPage'
// Admin 
import AdminIndex from '../admin/AdminIndex'
// App 
import Index from '../app/AppIndex'
import Smartfolio from '../app/layouts/Smartfolio'
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
                {/* App       */}
                <Route exact path='/app' component={Index} />
                <Route exact path="/smartfolio/:slug/:id" render={(routeProps) => ( <Smartfolio {...routeProps} /> )} />                
              </div>
            </Router>
    </>
  )
}
export default Routes







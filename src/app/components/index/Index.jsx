import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert} from 'reactstrap'
import {AppIndexLayout} from './IndexLayout';
import PortfoliosCard from './PortfoliosCards'


const Api = require('../../api/PortfolioApi')

class AppIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
          portfolios: [],
          isLoaded: false,
          error: null
        }
      }
      componentDidMount() {
        Api.getPortfolios()
          .then(response => {
            const [error, data] = response
            if (error) {
              this.setState({
                isLoaded: true,
                portfolios: [],
                error: data
              })
            } else {
              this.setState({
                isLoaded: true,
                portfolios: data
              })
            }
          })
      }
    
      render() {
        const { error, isLoaded, portfolios } = this.state
    
        if (error) {
    
          return (
            <Alert color="danger">
              Error: {error}
            </Alert>
          )
    
        } else if (!isLoaded) {
    
          return (
            <Alert color="primary">
              Loading...
            </Alert>
          )
    
        } else {
    
          return (
            <>

                <AppIndexLayout>
                  <Link className="btn btn-primary float-right" to="/admin/portfolios/new">Adicionar</Link>
                  <h4 className="mt-4 mb-4">Portfolios</h4>
                  <PortfoliosCard portfolios={portfolios}></PortfoliosCard>
                </AppIndexLayout>

            
            </>
          )
    
        }
    
      }
    }
    
    export default AppIndex
    
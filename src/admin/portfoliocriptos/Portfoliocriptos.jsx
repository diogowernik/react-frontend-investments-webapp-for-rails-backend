import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import PortfoliocriptosTable from './PortfoliocriptosTable'
import {DashboardLayout} from '../layouts/Layout';

const Api = require('./Api.js')

class Portfoliocriptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliocriptos: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getPortfoliocriptos()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portfoliocriptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portfoliocriptos: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, portfoliocriptos } = this.state
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
        <DashboardLayout>
            <Link className="btn btn-primary float-right" to="/admin/portfoliocriptos/new">Adicionar</Link>
            <h4 className="mt-4 mb-4">Criptomoedas nos Portfolios</h4>
            <PortfoliocriptosTable portfoliocriptos={portfoliocriptos}></PortfoliocriptosTable>
        </DashboardLayout>
        </>
      )

    }

  }
}

export default Portfoliocriptos

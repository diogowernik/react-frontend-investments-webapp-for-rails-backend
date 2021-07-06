import React, { Component } from 'react'
import { Alert } from 'reactstrap'

const Api = require('../admin/portfolios/Api')

class Portfolios extends Component {
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
    const { error, isLoaded, 
      // portfolios 
    } = this.state

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
        Pagina Inicial do App
        </>
      )

    }

  }
}

export default Portfolios

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import CryptosTable from './CryptosTable'

const Api = require('./Api.js')

class Cryptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptos: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getCryptos()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            cryptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            cryptos: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, cryptos } = this.state

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
        <Container>
          <h4 className="mt-4 mb-4">Criptomoedas nos Portfolios</h4>
          <Row>
            <Col>
              <CryptosTable cryptos={cryptos}></CryptosTable>
              <Link className="btn btn-primary" to="/cryptos/new">Add Crypto</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Cryptos

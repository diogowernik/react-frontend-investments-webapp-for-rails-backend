import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import CryptosTable from './CryptosTable'
import '../../Custom.css'; 

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
          <Link className="btn btn-primary float-right" to="/cryptos/new">Add Crypto</Link>
          <h4 className="mt-4 mb-4">Criptomoedas nos Portfolios</h4>
          <Row>
            <Col>
              <CryptosTable cryptos={cryptos}></CryptosTable>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Cryptos

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import WalletsTable from './WalletsTable'

const Api = require('./Api.js')

class Wallets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getWallets()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            wallets: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            wallets: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, wallets } = this.state

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
          <Row>
            <Col>
              <WalletsTable wallets={wallets}></WalletsTable>
              <Link className="btn btn-primary" to="/wallets/new">Add Wallet</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Wallets

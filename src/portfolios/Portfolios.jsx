import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import PortfoliosTable from './PortfoliosTable'

const Api = require('./Api.js')

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
        <Container>
          <Row>
            <Col>
              <PortfoliosTable portfolios={portfolios}></PortfoliosTable>
              <Link className="btn btn-primary" to="/portfolios/new">Add Portfolio</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Portfolios

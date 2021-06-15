import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import FiisTable from './FiisTable'

const Api = require('./Api.js')

class Fiis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiis: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getFiis()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            fiis: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            fiis: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, fiis } = this.state

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
              <FiisTable fiis={fiis}></FiisTable>
              <Link className="btn btn-primary" to="/fiis/new">Add Fii</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Fiis
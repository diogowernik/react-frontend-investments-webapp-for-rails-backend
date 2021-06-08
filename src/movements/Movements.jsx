import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import MovementsTable from './MovementsTable'

const Api = require('./Api.js')

class Movements extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movements: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getMovements()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            movements: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            movements: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, movements } = this.state

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
              <MovementsTable movements={movements}></MovementsTable>
              <Link className="btn btn-primary" to="/movements/new">Add Movement</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Movements

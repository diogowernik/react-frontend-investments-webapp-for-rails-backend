import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import PortifoliosTable from './PortifoliosTable'

const Api = require('./Api.js')

class Portifolios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portifolios: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getPortifolios()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portifolios: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portifolios: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, portifolios } = this.state

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
              <PortifoliosTable portifolios={portifolios}></PortifoliosTable>
              <Link className="btn btn-primary" to="/portifolios/new">Add Portifolio</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Portifolios

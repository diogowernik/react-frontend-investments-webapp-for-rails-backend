import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import RadarcryptosTable from './RadarcryptosTable'
import '../../Custom.css'; 

const Api = require('./Api.js')

class Radarcryptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radarcryptos: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getRadarcryptos()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            radarcryptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            radarcryptos: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, radarcryptos } = this.state

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
              <Link className="btn btn-primary float-right" to="/radarcryptos/new">Add Radarcrypto</Link>

          <h4 className="mt-4 mb-4">Radar Crypto</h4>
          <Row>
            <Col>
              <RadarcryptosTable radarcryptos={radarcryptos}></RadarcryptosTable>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Radarcryptos

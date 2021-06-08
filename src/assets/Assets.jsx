import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import AssetsTable from './AssetsTable'

const Api = require('./Api.js')

class Assets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assets: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getAssets()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            assets: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            assets: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, assets } = this.state

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
              <AssetsTable assets={assets}></AssetsTable>
              <Link className="btn btn-primary" to="/assets/new">Add Asset</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Assets

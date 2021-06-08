import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import InvestmentsTable from './InvestmentsTable'

const Api = require('./Api.js')

class Investments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investments: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getInvestments()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            investments: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            investments: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, investments } = this.state

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
              <InvestmentsTable investments={investments}></InvestmentsTable>
              <Link className="btn btn-primary" to="/investments/new">Add Investment</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Investments

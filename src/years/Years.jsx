import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import YearsTable from './YearsTable'

const Api = require('./Api.js')

class Years extends Component {
  constructor(props) {
    super(props)
    this.state = {
      years: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getYears()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            years: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            years: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, years } = this.state

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
          <h4 className="mt-4 mb-4">Anos</h4>
          <Row>
            <Col>
              <YearsTable years={years}></YearsTable>
              <Link className="btn btn-primary" to="/years/new">Add Year</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Years

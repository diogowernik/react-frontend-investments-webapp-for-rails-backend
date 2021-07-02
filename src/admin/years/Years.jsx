import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import YearsTable from './YearsTable'
import AdminNavBar from "../layouts/admin_navbar"


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
        <>
        <AdminNavBar/>
        <Container>
        <Link className="btn btn-primary float-right" to="/admin/years/new">Add Year</Link>

          <h4 className="mt-4 mb-4">Anos</h4>
          <Row>
            <Col>
              <YearsTable years={years}></YearsTable>
            </Col>
          </Row>
        </Container>
        </>
      )

    }

  }
}

export default Years

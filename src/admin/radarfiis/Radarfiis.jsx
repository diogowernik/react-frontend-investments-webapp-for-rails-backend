import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import RadarfiisTable from './RadarfiisTable'
import AdminNavBar from "../layouts/admin_navbar"


const Api = require('./Api.js')

class Radarfiis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radarfiis: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getRadarfiis()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            radarfiis: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            radarfiis: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, radarfiis } = this.state

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
              <Link className="btn btn-primary float-right" to="/admin/radarfiis/new">Add Radarfii</Link>

          <h4 className="mt-4 mb-4">Radar Fiis</h4>
          <Row>
            <Col>
              <RadarfiisTable radarfiis={radarfiis}></RadarfiisTable>
            </Col>
          </Row>
        </Container>
        </>
      )

    }

  }
}

export default Radarfiis

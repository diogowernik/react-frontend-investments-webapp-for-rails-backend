import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import CriptosTable from './CriptosTable'
import AdminNavBar from "../layouts/admin_navbar"

const Api = require('./Api.js')

class Criptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      criptos: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getCriptos()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            criptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            criptos: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, criptos } = this.state

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
              <Link className="btn btn-primary float-right" to="/admin/criptos/new">Add Cripto</Link>

          <h4 className="mt-4 mb-4">Radar Crypto</h4>
          <Row>
            <Col>
              <CriptosTable criptos={criptos}></CriptosTable>
            </Col>
          </Row>
        </Container>
        </>
      )

    }

  }
}

export default Criptos

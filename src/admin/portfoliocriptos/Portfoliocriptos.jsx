import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import PortfoliocriptosTable from './PortfoliocriptosTable'
import AdminNavBar from "../layouts/admin_navbar"


const Api = require('./Api.js')

class Portfoliocriptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliocriptos: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getPortfoliocriptos()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portfoliocriptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portfoliocriptos: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, portfoliocriptos } = this.state

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
          <Link className="btn btn-primary float-right" to="/admin/portfoliocriptos/new">Add Portfoliocripto</Link>

          <h4 className="mt-4 mb-4">Criptomoedas nos Portfolios</h4>
          <Row>
            <Col>
              <PortfoliocriptosTable portfoliocriptos={portfoliocriptos}></PortfoliocriptosTable>
            </Col>
          </Row>
        </Container>
        </>
      )

    }

  }
}

export default Portfoliocriptos

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import PortfoliofiisTable from './PortfoliofiisTable'
import AdminNavBar from "../layouts/admin_navbar"

const Api = require('./Api.js')

class Portfoliofiis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliofiis: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getPortfoliofiis()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portfoliofiis: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portfoliofiis: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, portfoliofiis } = this.state

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
          <Link className="btn btn-primary float-right" to="/admin/portfoliofiis/new">Add Portfoliofii</Link>
          <h4 className="mt-4 mb-4">Fiis nos Portfolios</h4>
          <Row>
            <Col>
              <PortfoliofiisTable portfoliofiis={portfoliofiis}></PortfoliofiisTable>
            </Col>
          </Row>
        </Container>
        </>
      )

    }

  }
}

export default Portfoliofiis

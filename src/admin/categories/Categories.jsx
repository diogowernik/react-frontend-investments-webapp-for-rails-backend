import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import CategoriesTable from './CategoriesTable'
import AdminNavBar from "../layouts/admin_navbar"

const Api = require('./Api.js')

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getCategories()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            categories: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            categories: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, categories } = this.state

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
        <Link className="btn btn-primary float-right" to="/admin/categories/new">Add Category</Link>

          <h4 className="mt-4 mb-4">Categorias de investimentos</h4>
          <Row>
            <Col>
              <CategoriesTable categories={categories}></CategoriesTable>
            </Col>
          </Row>
        </Container>
        </>
      )

    }

  }
}

export default Categories
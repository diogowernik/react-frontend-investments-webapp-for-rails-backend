import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import YearsTable from './YearsTable'
import {DashboardLayout} from '../layouts/Layout';


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
        <DashboardLayout>
          <Link className="btn btn-primary float-right" to="/admin/years/new">Adicionar</Link>
          <h4 className="mt-4 mb-4">Anos</h4>
          <YearsTable years={years}></YearsTable>
        </DashboardLayout>
        </>
      )

    }

  }
}

export default Years

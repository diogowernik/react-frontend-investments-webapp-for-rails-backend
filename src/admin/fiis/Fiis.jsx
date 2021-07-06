import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import FiisTable from './FiisTable'
import {DashboardLayout} from '../layouts/Layout';


const Api = require('./Api.js')

class Fiis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiis: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getFiis()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            fiis: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            fiis: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, fiis } = this.state

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
          <Link className="btn btn-primary float-right" to="/admin/fiis/new">Adicionar</Link>
          <h4 className="mt-4 mb-4">Fundos Imobiliários</h4>
          <FiisTable fiis={fiis}></FiisTable>
        </DashboardLayout>
        </>
      )

    }

  }
}

export default Fiis

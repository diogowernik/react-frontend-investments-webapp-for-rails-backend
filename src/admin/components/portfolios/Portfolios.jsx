import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import Datatable from '../../../config/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/PortfoliosApi')

class AdminPortfolios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolios: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getPortfolios()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portfolios: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portfolios: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, portfolios } = this.state

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
          <Link className="btn btn-primary float-right" to="/admin/portfolios/new">Adicionar</Link>
          <h4 className="mt-4 mb-4">Portfolios</h4>
          <Datatable>
          <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map(portfolio => (
              <tr key={portfolio.id}>
                <td>{portfolio.id}</td>
                <td>{portfolio.title}</td>
                <td>{portfolio.slug}</td>
                <td>
                    <a className="btn btn-danger float-right" href={`/admin/portfolio/${portfolio.id}/delete`}><FaTrashAlt /></a>
                    <a className="btn btn-success float-right mr-2" href={`/admin/portfolio/${portfolio.id}/edit`}><FaPencilAlt /></a>{' '}
                  </td>
              </tr>
            ))}
          </tbody>
          </table>
        </Datatable>          </>
      )

    }

  }
}

export default AdminPortfolios

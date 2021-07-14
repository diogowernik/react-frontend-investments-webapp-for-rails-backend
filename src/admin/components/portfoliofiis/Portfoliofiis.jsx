import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import Datatable from '../../../globalcomponents/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/PortfoliofiisApi')

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
          <Link className="btn btn-primary float-right" to="/admin/portfoliofiis/new">Adicionar</Link>
          <h4 className="mt-4 mb-4">Fiis nos Portfolios</h4>
          <Datatable>
          <table className="table table-striped my-4 w-100">
            <thead >
              <tr>
                <th>Id</th>
                <th>Ticker</th>
                <th>Category</th>
                <th>Portfolio</th>
                <th>Amount</th>
                <th>Cost</th>
                <th>Total Cost</th>
                <th>Total Today</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {portfoliofiis.map(portfoliofii => (
                <tr key={portfoliofii.id}>
                  <td>{portfoliofii.id}</td>
                  <td>{portfoliofii.fii_ticker}</td>
                  <td>{portfoliofii.category_title}</td>
                  <td>{portfoliofii.portfolio_title}</td>
                  <td>{portfoliofii.amount}</td>
                  <td>{portfoliofii.cost}</td>
                  <td>{portfoliofii.total_cost}</td>
                  <td>{portfoliofii.total_today}</td>
                  <td>
                    <a className="btn btn-danger float-right" href={`/admin/portfoliofii/${portfoliofii.id}/delete`}><FaTrashAlt /></a>
                    <a className="btn btn-success float-right mr-2" href={`/admin/portfoliofii/${portfoliofii.id}/edit`}><FaPencilAlt /></a>{' '}              
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

export default Portfoliofiis

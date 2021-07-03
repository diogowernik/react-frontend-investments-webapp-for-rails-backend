import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class PortfoliofiisTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliofiis: props.portfoliofiis
    }
  }
  render() {
    const portfoliofiis = this.state.portfoliofiis
    if (portfoliofiis.length === 0) {
      return <div></div>
    } else {
      return (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfoliofiis.map(portfoliofii => (
                <tr key={portfoliofii.id}>
                  <td>{portfoliofii.id}</td>
                  <td>{portfoliofii.fii_id}</td>
                  <td>{portfoliofii.category_id}</td>
                  <td>{portfoliofii.portfolio_id}</td>
                  <td>{portfoliofii.amount}</td>
                  <td>{portfoliofii.cost}</td>
                  <td>{portfoliofii.total_cost}</td>
                  <td>{portfoliofii.total_today}</td>
                  <td>
                    <a className="btn btn-success" href={`/admin/portfoliofii/${portfoliofii.id}/edit`}><FaPencilAlt /></a>{' '}
                    <a className="btn btn-danger" href={`/admin/portfoliofii/${portfoliofii.id}/delete`}><FaTrashAlt /></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Datatable>  
      )
    }
  }
}

export default PortfoliofiisTable

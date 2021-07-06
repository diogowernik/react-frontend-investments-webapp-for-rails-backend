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
        </Datatable>  
      )
    }
  }
}

export default PortfoliofiisTable

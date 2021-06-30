import React, { Component } from 'react'
import Datatable from '../Datatable.js';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class CryptosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptos: props.cryptos
    }
  }
  render() {
    const cryptos = this.state.cryptos
    if (cryptos.length === 0) {
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
              {cryptos.map(crypto => (
                <tr key={crypto.id}>
                  <td>{crypto.id}</td>
                  <td><a href={`/radarcrypto/${crypto.radarcrypto.id}`}>{crypto.radarcrypto.ticker}</a></td>
                  <td><a href={`/category/${crypto.category.id}`}>{crypto.category.title}</a></td>
                  <td><a href={`/portfolio/${crypto.portfolio.id}`}>{crypto.portfolio.title}</a></td>
                  <td>{crypto.amount}</td>
                  <td>{crypto.cost}</td>
                  <td>{crypto.total_cost}</td>
                  <td>{crypto.total}</td>
                  <td>
                    <a className="btn btn-success" href={`/crypto/${crypto.id}/edit`}><FaPencilAlt /></a>{' '}
                    <a className="btn btn-danger" href={`/crypto/${crypto.id}/delete`}><FaTrashAlt /></a>
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

export default CryptosTable

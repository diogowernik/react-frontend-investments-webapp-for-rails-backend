import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

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
        
        <Table>
          <thead>
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
                <td>{crypto.radarcrypto.ticker}</td>
                <td>{crypto.category.title}</td>
                <td>{crypto.portfolio.title}</td>
                <td>{crypto.amount}</td>
                <td>{crypto.cost}</td>
                <td>{crypto.total_cost}</td>
                <td>{crypto.total}</td>
                <td>
                  <Link className="btn btn-primary" to={`/crypto/${crypto.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/crypto/${crypto.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/crypto/${crypto.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default CryptosTable

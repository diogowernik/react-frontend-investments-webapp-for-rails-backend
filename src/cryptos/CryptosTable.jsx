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
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map(crypto => (
              <tr key={crypto.id}>
                <td>{crypto.id}</td>
                <td>{crypto.title}</td>
                <td>{crypto.slug}</td>
                <td>{crypto.ticker}</td>
                <td>{crypto.price}</td>
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

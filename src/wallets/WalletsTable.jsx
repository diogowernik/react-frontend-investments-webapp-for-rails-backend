import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class WalletsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: props.wallets
    }
  }

  render() {
    const wallets = this.state.wallets
    if (wallets.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map(wallet => (
              <tr key={wallet.id}>
                <td>{wallet.id}</td>
                <td>{wallet.title}</td>
                <td>{wallet.slug}</td>
                <td>
                  <Link className="btn btn-primary" to={`/wallet/${wallet.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/wallet/${wallet.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/wallet/${wallet.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default WalletsTable

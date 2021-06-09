import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class AssetsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assets: props.assets
    }
  }

  render() {
    const assets = this.state.assets
    if (assets.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticker</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.ticker}</td>
                <th>{asset.category.title}</th>
                <td>
                  <Link className="btn btn-primary" to={`/asset/${asset.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/asset/${asset.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/asset/${asset.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default AssetsTable

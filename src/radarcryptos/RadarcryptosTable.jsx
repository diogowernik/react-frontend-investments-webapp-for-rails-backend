import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class RadarcryptosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radarcryptos: props.radarcryptos
    }
  }

  render() {
    const radarcryptos = this.state.radarcryptos
    if (radarcryptos.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticker</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {radarcryptos.map(radarcrypto => (
              <tr key={radarcrypto.id}>
                <td>{radarcrypto.id}</td>
                <td>{radarcrypto.ticker}</td>
                <td>{radarcrypto.title}</td>
                <td>{radarcrypto.slug}</td>
                <td>{radarcrypto.price}</td>
                <td>
                  <Link className="btn btn-primary" to={`/radarcrypto/${radarcrypto.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/radarcrypto/${radarcrypto.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/radarcrypto/${radarcrypto.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default RadarcryptosTable

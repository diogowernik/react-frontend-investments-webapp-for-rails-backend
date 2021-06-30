import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class MovementsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movements: props.movements
    }
  }

  render() {
    const movements = this.state.movements
    if (movements.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category_id</th>
              <th>Slug</th>
              <th>Ticker</th>
              <th>Coingecko Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movements.map(movement => (
              <tr key={movement.id}>
                <td>{movement.id}</td>
                <td>{movement.category_id}</td>
                <td>{movement.slug}</td>
                <td>{movement.ticker}</td>
                <td>{movement.coingecko_id}</td>
                <td>
                  <Link className="btn btn-primary" to={`/movement/${movement.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/movement/${movement.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/movement/${movement.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default MovementsTable

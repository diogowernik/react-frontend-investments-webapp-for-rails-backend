import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class FiisTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiis: props.fiis
    }
  }

  render() {
    const fiis = this.state.fiis
    if (fiis.length === 0) {
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
            {fiis.map(fii => (
              <tr key={fii.id}>
                <td>{fii.id}</td>
                <td>{fii.radarfii.ticker}</td>
                <td>{fii.category.title}</td>
                <td>{fii.portfolio.title}</td>
                <td>{fii.amount}</td>
                <td>{fii.cost}</td>
                <td>{fii.total_cost}</td>
                <td>{fii.total}</td>
                <td>
                  <Link className="btn btn-primary" to={`/fii/${fii.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/fii/${fii.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/fii/${fii.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default FiisTable

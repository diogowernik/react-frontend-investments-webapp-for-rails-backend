import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class InvestmentsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investments: props.investments
    }
  }

  render() {
    const investments = this.state.investments
    if (investments.length === 0) {
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
              <th>Coingecko Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map(investment => (
              <tr key={investment.id}>
                <td>{investment.id}</td>
                <td>{investment.title}</td>
                <td>{investment.slug}</td>
                <td>{investment.ticker}</td>
                <td>{investment.coingecko_id}</td>
                <td>
                  <Link className="btn btn-primary" to={`/investment/${investment.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/investment/${investment.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/investment/${investment.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default InvestmentsTable

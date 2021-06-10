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
              <th>Id</th>
              <th>Category</th>
              <th>Portfolio</th>
              <th>Amount</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map(investment => (
              <tr key={investment.id}>
                <td>{investment.id}</td>
                <td>{investment.category.title}</td>
                <td>{investment.portfolio.title}</td>
                <td>{investment.amount}</td>
                <td>{investment.cost}</td>
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

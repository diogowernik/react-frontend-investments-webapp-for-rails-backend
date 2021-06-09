import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class PortfoliosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolios: props.portfolios
    }
  }

  render() {
    const portfolios = this.state.portfolios
    if (portfolios.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map(portfolio => (
              <tr key={portfolio.id}>
                <td>{portfolio.id}</td>
                <td>{portfolio.title}</td>
                <td>{portfolio.slug}</td>
                <td>
                  <Link className="btn btn-primary" to={`/portfolio/${portfolio.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/portfolio/${portfolio.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/portfolio/${portfolio.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default PortfoliosTable

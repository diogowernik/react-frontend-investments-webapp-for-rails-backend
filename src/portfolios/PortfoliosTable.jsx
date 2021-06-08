import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class PortifoliosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portifolios: props.portifolios
    }
  }

  render() {
    const portifolios = this.state.portifolios
    if (portifolios.length === 0) {
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
            {portifolios.map(portifolio => (
              <tr key={portifolio.id}>
                <td>{portifolio.id}</td>
                <td>{portifolio.title}</td>
                <td>{portifolio.slug}</td>
                <td>{portifolio.ticker}</td>
                <td>{portifolio.coingecko_id}</td>
                <td>
                  <Link className="btn btn-primary" to={`/portifolio/${portifolio.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/portifolio/${portifolio.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/portifolio/${portifolio.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default PortifoliosTable

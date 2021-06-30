import React, { Component } from 'react'
import Datatable from '../Datatable.js';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

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
        <Datatable options={this.state.dtOptions2}>
          <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map(portfolio => (
              <tr key={portfolio.id}>
                <td>{portfolio.id}</td>
                <td><a href={`/portfolio/${portfolio.id}`}>{portfolio.title}</a></td>
                <td>{portfolio.slug}</td>
                <td>
                    <a className="btn btn-danger float-right" href={`/portfolio/${portfolio.id}/delete`}><FaTrashAlt /></a>
                    <a className="btn btn-success float-right mr-2" href={`/portfolio/${portfolio.id}/edit`}><FaPencilAlt /></a>{' '}
                  </td>
              </tr>
            ))}
          </tbody>
          </table>
        </Datatable>  
      )
    }
  }
}

export default PortfoliosTable

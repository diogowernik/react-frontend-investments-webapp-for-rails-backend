import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class AdminPortfoliosTable extends Component {
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
        <Datatable>
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
                <td>{portfolio.title}</td>
                <td>{portfolio.slug}</td>
                <td>
                    <a className="btn btn-danger float-right" href={`/admin/portfolio/${portfolio.id}/delete`}><FaTrashAlt /></a>
                    <a className="btn btn-success float-right mr-2" href={`/admin/portfolio/${portfolio.id}/edit`}><FaPencilAlt /></a>{' '}
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

export default AdminPortfoliosTable

import React, { Component } from 'react'
import Datatable from '../../globalcomponents/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

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
        <Datatable>
          <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticker</th>
              <th>Title</th>
              <th>Url (Slug)</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fiis.map(fii => (
              <tr key={fii.id}>
                <td>{fii.id}</td>
                <td>{fii.ticker}</td>
                <td>{fii.title}</td>
                <td>{fii.slug}</td>
                <td>{fii.price}</td>
                <td>
                    <a className="btn btn-danger float-right" href={`/admin/fii/${fii.id}/delete`}><FaTrashAlt /></a>
                    <a className="btn btn-success float-right mr-2" href={`/admin/fii/${fii.id}/edit`}><FaPencilAlt /></a>{' '}
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

export default FiisTable

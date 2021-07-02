import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class RadarfiisTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radarfiis: props.radarfiis
    }
  }

  render() {
    const radarfiis = this.state.radarfiis
    if (radarfiis.length === 0) {
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
              <th>Slug</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {radarfiis.map(radarfii => (
              <tr key={radarfii.id}>
                <td>{radarfii.id}</td>
                <td>{radarfii.ticker}</td>
                <td>{radarfii.title}</td>
                <td>{radarfii.slug}</td>
                <td>{radarfii.price}</td>
                <td>
                    <a className="btn btn-success" href={`/admin/radarfii/${radarfii.id}/edit`}><FaPencilAlt /></a>{' '}
                    <a className="btn btn-danger" href={`/admin/radarfii/${radarfii.id}/delete`}><FaTrashAlt /></a>
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

export default RadarfiisTable

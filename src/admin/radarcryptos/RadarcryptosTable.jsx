import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class RadarcryptosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radarcryptos: props.radarcryptos
    }
  }

  render() {
    const radarcryptos = this.state.radarcryptos
    if (radarcryptos.length === 0) {
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
              {radarcryptos.map(radarcrypto => (
                <tr key={radarcrypto.id}>
                  <td>{radarcrypto.id}</td>
                  <td><a href={`/radarcrypto/${radarcrypto.id}`}>{radarcrypto.ticker}</a></td>
                  <td>{radarcrypto.title}</td>
                  <td>{radarcrypto.slug}</td>
                  <td>{radarcrypto.price}</td>
                  <td>
                    <a className="btn btn-success" href={`/radarcrypto/${radarcrypto.id}/edit`}><FaPencilAlt /></a>{' '}
                    <a className="btn btn-danger" href={`/radarcrypto/${radarcrypto.id}/delete`}><FaTrashAlt /></a>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </Datatable>        )
    }
  }
}

export default RadarcryptosTable

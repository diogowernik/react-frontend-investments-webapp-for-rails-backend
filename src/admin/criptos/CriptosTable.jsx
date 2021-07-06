import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class CriptosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      criptos: props.criptos
    }
  }

  render() {
    const criptos = this.state.criptos
    if (criptos.length === 0) {
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
              {criptos.map(cripto => (
                <tr key={cripto.id}>
                  <td>{cripto.id}</td>
                  <td>{cripto.ticker}</td>
                  <td>{cripto.title}</td>
                  <td>{cripto.slug}</td>
                  <td>{cripto.price}</td>
                  <td>
                    <a className="btn btn-danger float-right" href={`/admin/cripto/${cripto.id}/delete`}><FaTrashAlt /></a>
                    <a className="btn btn-success float-right mr-2" href={`/admin/cripto/${cripto.id}/edit`}><FaPencilAlt /></a>{' '}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </Datatable>        )
    }
  }
}

export default CriptosTable

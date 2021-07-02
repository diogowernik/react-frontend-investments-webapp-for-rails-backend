import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class CryptosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptos: props.cryptos
    }
  }
  render() {
    const cryptos = this.state.cryptos
    if (cryptos.length === 0) {
      return <div></div>
    } else {
      return (
        <Datatable>
          <table className="table table-striped my-4 w-100">
            <thead >
              <tr>
                <th>Id</th>
                <th>Ticker</th>
                <th>Category</th>
                <th>Portfolio</th>
                <th>Amount</th>
                <th>Cost</th>
                <th>Total Cost</th>
                <th>Total Today</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map(crypto => (
                <tr key={crypto.id}>
                  <td>{crypto.id}</td>
                  <td>{crypto.radarcrypto.ticker}</td>
                  <td>{crypto.category.title}</td>
                  <td>{crypto.portfolio.title}</td>
                  <td>{crypto.amount}</td>
                  <td>{crypto.cost}</td>
                  <td>{crypto.total_cost}</td>
                  <td>{crypto.total}</td>
                  <td>
                    <a className="btn btn-success" href={`/admin/crypto/${crypto.id}/edit`}><FaPencilAlt /></a>{' '}
                    <a className="btn btn-danger" href={`/admin/crypto/${crypto.id}/delete`}><FaTrashAlt /></a>
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

export default CryptosTable
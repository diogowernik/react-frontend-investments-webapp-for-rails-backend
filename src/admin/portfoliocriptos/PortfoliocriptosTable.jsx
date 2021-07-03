import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';


class PortfoliocriptosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliocriptos: props.portfoliocriptos
    }
  }
  render() {
    const portfoliocriptos = this.state.portfoliocriptos
    if (portfoliocriptos.length === 0) {
      return <div></div>
    } else {
      return (

        <Datatable>       
            <table className="table table-striped my-4 w-100">
                <thead>
                    <tr>
                        <th data-priority="1">Id</th>
                        <th>Ticker</th>
                        <th>Category</th>
                        <th className="sort-numeric">Portfolio</th>
                        <th className="sort-alpha" data-priority="2">Amount</th>
                        <th>Cost</th>
                        <th>Total Cost</th>
                        <th>Total Today</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {portfoliocriptos.map(portfoliocripto => (
                    <tr key= {portfoliocripto.id}>
                        <td>{portfoliocripto.id}</td>
                        <td>{portfoliocripto.cripto_id}{' '}</td>
                        <td>{portfoliocripto.category_id}{' '}</td>
                        <td>{portfoliocripto.portfolio_id}{' '}</td>
                        <td>{portfoliocripto.amount}</td>
                        <td>{portfoliocripto.cost}</td>
                        <td>{portfoliocripto.total_cost}</td>
                        <td>{portfoliocripto.total_today}</td>
                        <td>
                          <a className="btn btn-success" href={`/admin/portfoliocripto/${portfoliocripto.id}/edit`}><FaPencilAlt /></a>{' '}
                          <a className="btn btn-danger" href={`/admin/portfoliocripto/${portfoliocripto.id}/delete`}><FaTrashAlt /></a>
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

export default PortfoliocriptosTable


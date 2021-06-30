import React, { Component } from 'react'
import Datatable from '../../components/datatable/Datatable';
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
                {fiis.map(fii => (
                    <tr key= {fii.id}>
                        <td>{fii.id}</td>
                        <td><a href={`/radarfii/${fii.radarfii.id}`}>{fii.radarfii.ticker}</a>{' '}</td>
                        <td><a href={`/category/${fii.category.id}`}>{fii.category.title}</a>{' '}</td>
                        <td><a href={`/portfolio/${fii.portfolio.id}`}>{fii.portfolio.title}</a>{' '}</td>
                        <td>{fii.amount}</td>
                        <td>{fii.cost}</td>
                        <td>{fii.total_cost}</td>
                        <td>{fii.total}</td>
                        <td>
                          <button className="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever={`${fii.id}`}>modal test {fii.radarfii.id} </button>
                          <a className="btn btn-success" href={`/fii/${fii.id}/edit`}><FaPencilAlt /></a>{' '}
                          <a className="btn btn-danger" href={`/fii/${fii.id}/delete`}><FaTrashAlt /></a>
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


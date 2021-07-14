import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import Datatable from '../../../globalcomponents/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/PortfoliocriptosApi')

class Portfoliocriptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliocriptos: [],
      isLoaded: false,
      error: null
    }
  } 
 
  componentDidMount() {
    Api.getPortfoliocriptos()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portfoliocriptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portfoliocriptos: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, portfoliocriptos } = this.state
    if (error) {
      return (
        <Alert color="danger">
          Error: {error}
        </Alert>
      )
    } else if (!isLoaded) {
      return (
        <Alert color="primary">
          Loading...
        </Alert>
    )
    } else {

      return (
        <>
            <Link className="btn btn-primary float-right" to="/admin/portfoliocriptos/new">Adicionar</Link>
            <h4 className="mt-4 mb-4">Criptomoedas nos Portfolios</h4>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {portfoliocriptos.map(portfoliocripto => (
                    <tr key= {portfoliocripto.id}>
                        <td>{portfoliocripto.id}</td>
                        <td>{portfoliocripto.cripto_ticker}{' '}</td>
                        <td>{portfoliocripto.category_title}{' '}</td>
                        <td>{portfoliocripto.portfolio_title}{' '}</td>
                        <td>{portfoliocripto.amount}</td>
                        <td>{portfoliocripto.cost}</td>
                        <td>{portfoliocripto.total_cost}</td>
                        <td>{portfoliocripto.total_today}</td>
                        <td>
                          <a className="btn btn-danger float-right" href={`/admin/portfoliocripto/${portfoliocripto.id}/delete`}><FaTrashAlt /></a>
                          <a className="btn btn-success float-right mr-2" href={`/admin/portfoliocripto/${portfoliocripto.id}/edit`}><FaPencilAlt /></a>{' '}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Datatable>    
        </>
      )

    }

  }
}

export default Portfoliocriptos

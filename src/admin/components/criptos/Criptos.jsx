import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import Datatable from '../../../config/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/CriptosApi')

class Criptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      criptos: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getCriptos()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            criptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            criptos: data
          })
        }
      })
  }

  render() {
    const { error,
            isLoaded, 
            criptos 
          } = this.state

    if (error) {

      return (
        <Alert color="danger">
          Error: {error}
        </Alert>
      )

    } 
    else if (!isLoaded) {

      return (
        <Alert color="primary">
          Loading...
        </Alert>
      )
    } 
    else {

      return (
        <>
            <Link className="btn btn-primary float-right" to="/admin/criptos/new">Adicionar</Link>
            <h4 className="mt-4 mb-4">Criptomoedas</h4>
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
        </Datatable>    
        </>
      )

    }

  }
}

export default Criptos

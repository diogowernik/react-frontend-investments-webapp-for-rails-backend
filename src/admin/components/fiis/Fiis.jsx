import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'reactstrap'
import Datatable from '../../../globalcomponents/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/FiisApi')

class Fiis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiis: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getFiis()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            fiis: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            fiis: data
          })
        }
      })
  }

  render() {
    const { 
      error, 
      isLoaded, 
      fiis 
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
          <Link className="btn btn-primary float-right" to="/admin/fiis/new">Adicionar</Link>
          <h4 className="mt-4 mb-4">Fundos Imobiliários</h4>
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
        </>
      )

    }

  }
}

export default Fiis

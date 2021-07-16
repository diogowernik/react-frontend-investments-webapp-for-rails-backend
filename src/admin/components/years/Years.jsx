import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import { Link } from "react-router-dom"
import Datatable from '../../../config/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/YearsApi')

class Years extends Component {
  constructor(props) {
    super(props)
    this.state = {
      years: [],
      isLoaded: false,
      error: null,
      dtOptions1: {
        'paging': true, // Table pagination
        'ordering': true, // Column ordering
        'info': true, // Bottom left status text
        responsive: true,
        "dom": '<"top float-left"f><"top float-right"l>rt<"bottom"ip><"clear">',
        "lengthMenu": [[ 25, 50, -1], [ 25, 50, "All"]],
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
            sSearch: '<em class="fa fa-search"></em>',
            sLengthMenu: '_MENU_ records per page',
            info: 'Showing page _PAGE_ of _PAGES_',
            zeroRecords: 'Nothing found - sorry',
            infoEmpty: 'No records available',
            infoFiltered: '(filtered from _MAX_ total records)',
            oPaginate: {
                sNext: '<em class="fa fa-caret-right"></em>',
                sPrevious: '<em class="fa fa-caret-left"></em>'
            }
        }
      },
    }
  }

  componentDidMount() {
    Api.getYears()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            years: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            years: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, years } = this.state

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
          <Link className="btn btn-primary float-right" to="/admin/years/new">Adicionar</Link>
          <h4 className="mt-4 mb-4">Anos</h4>
          <Datatable options={this.state.dtOptions1}>
          <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <td>Slug</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => (
              <tr key={year.id}>
                <td>{year.id}</td>
                <td>{year.title}</td>
                <td>{year.slug}</td>
                <td>
                  <Link className="btn btn-danger float-right" to={`/admin/years/${year.id}/delete`}><FaTrashAlt /></Link>
                  <Link className="btn btn-success float-right mr-2" to={`/admin/years/${year.id}/edit`}><FaPencilAlt /></Link>{' '}
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

export default Years

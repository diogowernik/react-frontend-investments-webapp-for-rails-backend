import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Datatable from '../../globalcomponents/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';


class YearsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      years: props.years
    }
  }

  render() {
    const years = this.state.years
    if (years.length === 0) {
      return <div></div>
    } else {
      return (
        <Datatable>
          <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <td>Slug</td>
              <th>Actions</th>
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
      )
    }
  }
}

export default YearsTable

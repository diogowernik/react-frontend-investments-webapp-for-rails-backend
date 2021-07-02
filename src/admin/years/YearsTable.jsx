import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

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
        <Table>
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
                  <Link className="btn btn-success" to={`/admin/years/${year.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/admin/years/${year.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default YearsTable

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class RadarfiisTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radarfiis: props.radarfiis
    }
  }

  render() {
    const radarfiis = this.state.radarfiis
    if (radarfiis.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {radarfiis.map(radarfii => (
              <tr key={radarfii.id}>
                <td>{radarfii.id}</td>
                <td>{radarfii.title}</td>
                <td>{radarfii.slug}</td>
                <td>
                  <Link className="btn btn-primary" to={`/radarfii/${radarfii.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/radarfii/${radarfii.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/radarfii/${radarfii.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default RadarfiisTable

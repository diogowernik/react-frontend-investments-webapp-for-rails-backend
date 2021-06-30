import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class CategoriesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: props.categories
    }
  }

  render() {
    const categories = this.state.categories
    if (categories.length === 0) {
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
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.title}</td>
                <td>{category.slug}</td>
                <td>
                  <Link className="btn btn-primary" to={`/category/${category.id}`}>View</Link>{' '}
                  <Link className="btn btn-success" to={`/category/${category.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/category/${category.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default CategoriesTable

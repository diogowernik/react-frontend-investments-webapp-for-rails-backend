import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Datatable from '../../components/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';


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
        <Datatable>
          <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Url (Slug)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.title}</td>
                <td>{category.slug}</td>
                <td>
                  <Link className="btn btn-danger float-right" to={`/admin/category/${category.id}/delete`}><FaTrashAlt /></Link>
                  <Link className="btn btn-success float-right mr-2" to={`/admin/category/${category.id}/edit`}><FaPencilAlt /></Link>{' '}
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

export default CategoriesTable

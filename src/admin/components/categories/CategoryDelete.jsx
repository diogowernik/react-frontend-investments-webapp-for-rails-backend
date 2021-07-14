import React, { Component } from 'react'
import { Redirect } from 'react-router'

const Api = require('../../api/CategoriesApi.js')
class CategoryDelete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.match.params.id,
      redirect: null
    }
  }

  componentDidMount() {
    Api.deleteCategory(this.state.id)
      .then(response => {
        const [error] = response
        if (error) {
          // TODO: set flash
        }
        this.setState({
          redirect: '/admin/categories'
        })
      })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={this.state.redirect} />
      )
    } else {
      return (
        <div></div>
      )
    }
  }

}

export default CategoryDelete

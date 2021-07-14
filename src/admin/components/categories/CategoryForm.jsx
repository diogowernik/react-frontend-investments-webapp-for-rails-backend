import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('../../api/CategoriesApi.js')

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: {
        id: this.getCategoryId(props),
        title: '',
        slug: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.setSlug = this.setSlug.bind(this)
    
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getCategoryId(props) {
    try {
      return props.id
    } catch (error) {
      return null
    }
  }

  setTitle(event) {
    let newVal = event.target.value || ''
    this.setFieldState('title', newVal)
  }

  setSlug(event) {
    let newVal = event.target.value || ''
    this.setFieldState('slug', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.category[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let category = {
      title: this.state.category.title,
      slug: this.state.category.slug,
    }

    Api.saveCategory(category, this.state.category.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            // reload categories
            redirect: '/admin'
          })
        }
      })
  }

  componentDidMount() {
      if (this.props.id ) {
        Api.getCategory(this.props.id).then((response) => {
            const [error, data] = response;
            if (error) {
                this.setState({
                    errors: data
                });
            } else {    
                this.setState({
                    category: data,
                    errors: []
                });
            }
        });
      }
    }

  render() {
    const { redirect, category, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <>
          <Row>
            <Col>
              {errors.length > 0 &&
                <div>
                  {errors.map((error, index) =>
                    <Alert color="danger" key={index}>
                      {error}
                    </Alert>
                  )}
                </div>
              }

              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={category.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={category.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
        </>
      )
    }
  }
}

export default CategoryForm

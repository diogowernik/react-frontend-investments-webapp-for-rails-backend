import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import {DashboardLayout} from '../layouts/Layout';


const Api = require('./Api.js')

class YearForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      year: {
        id: this.getYearId(props),
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

  getYearId(props) {
    try {
      return props.match.params.id
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
      newState.year[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let year = {
      title: this.state.year.title,
      slug: this.state.year.slug,
    }

    Api.saveYear(year, this.state.year.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/admin/years'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.year.id) {
      Api.getYear(this.state.year.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              year: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, year, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <>
        <DashboardLayout>
          <Row>
            <Col>
              <h3>Edit Year</h3>

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
                  <Input type="text" name="title" id="title" value={year.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={year.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
        </DashboardLayout>
        </>
      )
    }
  }
}

export default YearForm

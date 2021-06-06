import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class YearForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      year: {
        id: this.getYearId(props),
        title: '',
        body: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.setBody = this.setBody.bind(this)
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

  setBody(event) {
    let newVal = event.target.value || ''
    this.setFieldState('body', newVal)
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
      body: this.state.year.body
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
            redirect: '/years'
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
        <Container>
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
                  <Label for="body">Body</Label>
                  <Input type="text" name="body" id="body" value={year.body} placeholder="Enter body" onChange={this.setBody} />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default YearForm

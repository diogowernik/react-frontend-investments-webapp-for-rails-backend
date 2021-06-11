import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class RadarfiiForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      radarfii: {
        id: this.getRadarfiiId(props),
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

  getRadarfiiId(props) {
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
      newState.radarfii[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let radarfii = {
      title: this.state.radarfii.title,
      slug: this.state.radarfii.slug,
    }

    Api.saveRadarfii(radarfii, this.state.radarfii.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/radarfiis'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.radarfii.id) {
      Api.getRadarfii(this.state.radarfii.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              radarfii: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, radarfii, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Radarfii</h3>

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
                  <Input type="text" name="title" id="title" value={radarfii.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={radarfii.slug} placeholder="Enter slug" onChange={this.setSlug} />
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

export default RadarfiiForm
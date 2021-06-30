import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class MovementForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movement: {
        id: this.getMovementId(props),
        category_id: '',
        slug: '',
        coingecko_id: '',
        ticker: ''
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setSlug = this.setSlug.bind(this)
    this.setCoingecko_id = this.setCoingecko_id.bind(this)
    this.setTicker = this.setTicker.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getMovementId(props) {
    try {
      return props.match.params.id
    } catch (error) {
      return null
    }
  }

  setCategory_id(event) {
    let newVal = event.target.value || ''
    this.setFieldState('category_id', newVal)
  }

  setSlug(event) {
    let newVal = event.target.value || ''
    this.setFieldState('slug', newVal)
  }

  setCoingecko_id(event) {
    let newVal = event.target.value || ''
    this.setFieldState('coingecko_id', newVal)
  }

  setTicker(event) {
    let newVal = event.target.value || ''
    this.setFieldState('ticker', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.movement[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let movement = {
      category_id: this.state.movement.category_id,
      slug: this.state.movement.slug,
      coingecko_id: this.state.movement.coingecko_id,
      ticker: this.state.movement.ticker,
    }

    Api.saveMovement(movement, this.state.movement.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/movements'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.movement.id) {
      Api.getMovement(this.state.movement.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              movement: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, movement, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Movement</h3>

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
                  <Label for="category_id">Category_id</Label>
                  <Input type="text" name="category_id" id="category_id" value={movement.category_id} placeholder="Enter category_id" onChange={this.setCategory_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={movement.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <FormGroup>
                  <Label for="coingecko_id">Coingecko</Label>
                  <Input type="text" name="coingecko_id" id="coingecko_id" value={movement.coingecko_id} placeholder="Enter coingecko_id" onChange={this.setCoingecko_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="ticker">Ticker</Label>
                  <Input type="text" name="ticker" id="ticker" value={movement.ticker} placeholder="Enter ticker" onChange={this.setTicker} />
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

export default MovementForm

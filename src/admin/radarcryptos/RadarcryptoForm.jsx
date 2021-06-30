import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class RadarcryptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      radarcrypto: {
        id: this.getRadarcryptoId(props),
        ticker: '',
        title: '',
        slug: '',
        price: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.setSlug = this.setSlug.bind(this)
    this.setTicker = this.setTicker.bind(this)
    this.setPrice = this.setPrice.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getRadarcryptoId(props) {
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

  setTicker(event) {
    let newVal = event.target.value || ''
    this.setFieldState('ticker', newVal)
  }

  setPrice(event) {
    let newVal = event.target.value || ''
    this.setFieldState('price', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.radarcrypto[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let radarcrypto = {
      title: this.state.radarcrypto.title,
      slug: this.state.radarcrypto.slug,
      ticker: this.state.radarcrypto.ticker,
      price: this.state.radarcrypto.price,
    }

    Api.saveRadarcrypto(radarcrypto, this.state.radarcrypto.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/radarcryptos'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.radarcrypto.id) {
      Api.getRadarcrypto(this.state.radarcrypto.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              radarcrypto: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, radarcrypto, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Radarcrypto</h3>

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
                  <Label for="ticker">Ticker</Label>
                  <Input type="text" name="ticker" id="ticker" value={radarcrypto.ticker} placeholder="Enter ticker" onChange={this.setTicker} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={radarcrypto.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={radarcrypto.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="text" name="price" id="price" value={radarcrypto.price} placeholder="Enter price" onChange={this.setPrice} />
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

export default RadarcryptoForm

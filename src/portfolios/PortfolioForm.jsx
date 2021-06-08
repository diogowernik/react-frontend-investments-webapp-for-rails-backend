import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class PortifolioForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portifolio: {
        id: this.getPortifolioId(props),
        title: '',
        slug: '',
        coingecko_id: '',
        ticker: ''
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.setSlug = this.setSlug.bind(this)
    this.setCoingecko_id = this.setCoingecko_id.bind(this)
    this.setTicker = this.setTicker.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getPortifolioId(props) {
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
      newState.portifolio[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let portifolio = {
      title: this.state.portifolio.title,
      slug: this.state.portifolio.slug,
      coingecko_id: this.state.portifolio.coingecko_id,
      ticker: this.state.portifolio.ticker,
    }

    Api.savePortifolio(portifolio, this.state.portifolio.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/portifolios'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.portifolio.id) {
      Api.getPortifolio(this.state.portifolio.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              portifolio: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, portifolio, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Portifolio</h3>

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
                  <Input type="text" name="title" id="title" value={portifolio.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={portifolio.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <FormGroup>
                  <Label for="coingecko_id">Coingecko</Label>
                  <Input type="text" name="coingecko_id" id="coingecko_id" value={portifolio.coingecko_id} placeholder="Enter coingecko_id" onChange={this.setCoingecko_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="ticker">Ticker</Label>
                  <Input type="text" name="ticker" id="ticker" value={portifolio.ticker} placeholder="Enter ticker" onChange={this.setTicker} />
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

export default PortifolioForm

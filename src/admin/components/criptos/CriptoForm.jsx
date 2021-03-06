import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'


const Api = require('../../api/CriptosApi')

class CriptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cripto: {
        id: this.getCriptoId(props),
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

  getCriptoId(props) {
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
      newState.cripto[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let cripto = {
      title: this.state.cripto.title,
      slug: this.state.cripto.slug,
      ticker: this.state.cripto.ticker,
      price: this.state.cripto.price,
    }

    Api.saveCripto(cripto, this.state.cripto.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
          })
        }
      })
      const form = event.target;
      const id = "∞"
      const title = form.elements["title"].value;
      const slug = form.elements["slug"].value;
      const ticker = form.elements["ticker"].value;
      const price = form.elements["price"].value;
      this.props.addCripto( id, slug, title, ticker, price);
      form.reset();
  }

  componentDidMount() {
    // Check if props.id is available 
        if ( this.state.cripto.id || this.props.id ) {
              const id = this.state.cripto.id || this.props.id;
                Api.getCripto(id).then((response) => {
                    const [error, data] = response;
                    if (error) {
                        this.setState({
                            errors: data
                        });
                    } else {    
                        this.setState({
                            cripto: data,
                            errors: []
                        });
                    }
                });
        }
    }

  render() {
    const { redirect, cripto, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <>
          <Row>
            <Col>
              <h3>Adicionar / Editar</h3>

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
                  <Input type="text" name="ticker" id="ticker" value={cripto.ticker} placeholder="Enter ticker" onChange={this.setTicker} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={cripto.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={cripto.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="text" name="price" id="price" value={cripto.price} placeholder="Enter price" onChange={this.setPrice} />
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

export default CriptoForm

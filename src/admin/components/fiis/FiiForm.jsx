import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'


const Api = require('../../api/FiisApi')

class FiiForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fii: {
        id: this.getFiiId(props),
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

  getFiiId(props) {
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
      newState.fii[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let fii = {
      title: this.state.fii.title,
      slug: this.state.fii.slug,
      ticker: this.state.fii.ticker,
      price: this.state.fii.price,
    }

    Api.saveFii(fii, this.state.fii.id)
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
      this.props.addFii( id, slug, title, ticker, price);
      form.reset();
  }

  componentDidMount() {
    // Check if props.id is available 
        if ( this.state.fii.id || this.props.id ) {
              const id = this.state.fii.id || this.props.id;
                Api.getFii(id).then((response) => {
                    const [error, data] = response;
                    if (error) {
                        this.setState({
                            errors: data
                        });
                    } else {    
                        this.setState({
                            fii: data,
                            errors: []
                        });
                    }
                });
        }
    }

  render() {
    const { redirect, fii, errors } = this.state

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
                  <Input type="text" name="ticker" id="ticker" value={fii.ticker} placeholder="Enter ticker" onChange={this.setTicker} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={fii.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={fii.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="text" name="price" id="price" value={fii.price} placeholder="Enter price" onChange={this.setPrice} />
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

export default FiiForm

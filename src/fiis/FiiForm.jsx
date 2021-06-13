import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class FiiForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fii: {
        id: this.getFiiId(props),
        category_id: '',
        portfolio_id: '',
        amount: '',
        cost: '',
        radarfii_id: '',
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setPortfolio_id = this.setPortfolio_id.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setCost = this.setCost.bind(this)
    this.setRadarfii_id = this.setRadarfii_id.bind(this)


    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFiiId(props) {
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

  setPortfolio_id(event) {
    let newVal = event.target.value || ''
    this.setFieldState('portfolio_id', newVal)
  }

    setRadarfii_id(event) {
    let newVal = event.target.value || ''
    this.setFieldState('radarfii_id', newVal)
  }

  setAmount(event) {
    let newVal = event.target.value || ''
    this.setFieldState('amount', newVal)
  }

  setCost(event) {
    let newVal = event.target.value || ''
    this.setFieldState('cost', newVal)
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
      category_id: this.state.fii.category_id,
      portfolio_id: this.state.fii.portfolio_id,
      amount: this.state.fii.amount,
      cost: this.state.fii.cost,
      radarfii_id: this.state.fii.radarfii_id,
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
            redirect: '/fiis'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.fii.id) {
      Api.getFii(this.state.fii.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              fii: data,
              errors: []
            })
          }
        })
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
        <Container>
          <Row>
            <Col>
              <h3>Edit Fii</h3>

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
                  <Label for="category_id">Category</Label>
                  <Input type="text" name="category_id" id="category_id" value={fii.category_id} placeholder="Enter category_id" onChange={this.setCategory_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="portfolio_id">Portfolio</Label>
                  <Input type="text" name="portfolio_id" id="portfolio_id" value={fii.portfolio_id} placeholder="Enter portfolio_id" onChange={this.setPortfolio_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="radarfii_id">Radarfii</Label>
                  <Input type="text" name="radarfii_id" id="radarfii_id" value={fii.radarfii_id} placeholder="Enter radarfii_id" onChange={this.setRadarfii_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="amount">Amount</Label>
                  <Input type="text" name="amount" id="amount" value={fii.amount} placeholder="Enter amount" onChange={this.setAmount} />
                </FormGroup>
                <FormGroup>
                  <Label for="cost">Cost</Label>
                  <Input type="text" name="cost" id="cost" value={fii.cost} placeholder="Enter cost" onChange={this.setCost} />
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

export default FiiForm

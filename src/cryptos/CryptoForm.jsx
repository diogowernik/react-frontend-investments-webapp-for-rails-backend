import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class CryptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crypto: {
        id: this.getCryptoId(props),
        category_id: '',
        portfolio_id: '',
        amount: '',
        cost: '',
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setPortfolio_id = this.setPortfolio_id.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setCost = this.setCost.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getCryptoId(props) {
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
      newState.crypto[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let crypto = {
      category_id: this.state.crypto.category_id,
      portfolio_id: this.state.crypto.portfolio_id,
      amount: this.state.crypto.amount,
      cost: this.state.crypto.cost,
    }

    Api.saveCrypto(crypto, this.state.crypto.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/cryptos'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.crypto.id) {
      Api.getCrypto(this.state.crypto.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              crypto: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, crypto, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Crypto</h3>

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
                  <Input type="text" name="category_id" id="category_id" value={crypto.category_id} placeholder="Enter category_id" onChange={this.setCategory_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="portfolio_id">Portfolio</Label>
                  <Input type="text" name="portfolio_id" id="portfolio_id" value={crypto.portfolio_id} placeholder="Enter portfolio_id" onChange={this.setPortfolio_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="amount">Amount</Label>
                  <Input type="text" name="amount" id="amount" value={crypto.amount} placeholder="Enter amount" onChange={this.setAmount} />
                </FormGroup>
                <FormGroup>
                  <Label for="cost">Cost</Label>
                  <Input type="text" name="cost" id="cost" value={crypto.cost} placeholder="Enter cost" onChange={this.setCost} />
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

export default CryptoForm

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, Label, Input } from 'reactstrap'
import Select from 'react-select'
import { apiHost } from '../apiHost.js';

const Api = require('./Api.js')


const category_options = [
  // fetch(`${apiHost}/api/categories/`) 
  //{value = id, label = title}
  { value: "1", label: 'Fiis' },
  { value: "2", label: 'Criptomoedas' },
  { value: "3", label: 'Ações Br' }
]

const portfolio_options = [
  { value: "1", label: 'Diogo Wernik' },
  { value: "2", label: 'Marcello Mattos' },
  // fetch(`${apiHost}/api/portfolios/`) 
  //{value = id, label = title}
]
const radarfii_options = [
  // fetch(`${apiHost}/api/radarfiis/`) 
  // {valeu = id, label = ticker}
]

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
        total_cost: '',
        total: '',
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setPortfolio_id = this.setPortfolio_id.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setCost = this.setCost.bind(this)
    this.setRadarfii_id = this.setRadarfii_id.bind(this)
    this.setTotal = this.setTotal.bind(this)
    this.setTotal_cost = this.setTotal_cost.bind(this)


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

  setTotal(event) {
    let newVal = event.target.value || ''
    this.setFieldState('total', newVal)
  }

  setTotal_cost(event) {
    let newVal = event.target.value || ''
    this.setFieldState('total_cost', newVal)
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
      total_cost: this.state.fii.total_cost,
      total: this.state.fii.total,
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
              <h3 className="mt-4 mb-4">Editar / Adicionar Fundo Imobiliário a uma Carteira</h3>

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
                <Row>
                  <Col md={ 4 }>
                    {/* Trocar o campo category Input por Select (Selected "1", onChange setPortfolio) */}
                      <Label for="category_id">Category</Label>
                      <Select name="category_id" id="category_id" options={category_options} />
                      <Input type="text" name="category_id" id="category_id" value={fii.category_id} placeholder="Enter category_id" onChange={this.setCategory_id} />
                  </Col>
                  <Col md={ 4 }>
                      <Label for="portfolio_id">Portfolio</Label>
                      {/* Trocar o campo portfolio Input por Select (Selected fii.portfolio_id, onChange setPortfolio) */}
                      <Select name="portfolio_id" id="portfolio_id" options={portfolio_options} />
                      <Input type="text" name="portfolio_id" id="portfolio_id" value={fii.portfolio_id} placeholder="Enter portfolio_id" onChange={this.setPortfolio_id} />
                    </Col>
                  <Col md={ 4 }>
                      <Label for="radarfii_id">Radarfii</Label>
                      {/* Trocar o campo radarfii Input por Select (Selected fii.radarfii_id, onChange setPortfolio) */}
                      <Select name="radarfii_id" id="radarfii_id" options={radarfii_options} />
                      <Input type="text" name="radarfii_id" id="radarfii_id" value={fii.radarfii_id} placeholder="Enter radarfii_id" onChange={this.setRadarfii_id} />
                  </Col>
                </Row>
                <Row>
                  <Col md={ 3 } >
                    <Label for="amount">Amount</Label>
                    <Input type="text" name="amount" id="amount" value={fii.amount} placeholder="Enter amount" onChange={this.setAmount} />
                  </Col>
                  <Col md={ 3 }>
                    <Label for="cost">Cost</Label>
                    <Input type="text" name="cost" id="cost" value={fii.cost} placeholder="Enter cost" onChange={this.setCost} />
                    </Col>
                  <Col md={ 3 }>
                    <Label for="total_cost">Total cost</Label>
                    <Input type="text" name="total_cost" id="total_cost" value={fii.total_cost} placeholder="Enter total_cost" onChange={this.setTotal_cost} />
                    </Col>
                  <Col md={ 3 }>
                    <Label for="total">Total hoje</Label>
                    <Input type="text" name="total" id="total" value={fii.total} placeholder="Enter total" onChange={this.setTotal} />
                  </Col>
                </Row>
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

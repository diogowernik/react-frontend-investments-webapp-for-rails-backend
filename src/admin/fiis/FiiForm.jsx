import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Form, Label, Input } from 'reactstrap'
import SelectPortfolio from '../../components/selects/SelectPortfolio'
import SelectCategory from '../../components/selects/SelectCategory'
import SelectRadarfii from '../../components/selects/SelectRadarfii'

const Api = require('./Api.js')


class FiiForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio_options:[],
      radarfii_options:[],
      category_options:[],
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
    const { redirect, fii, errors, radarfii_options, portfolio_options, category_options } = this.state

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
                    <SelectCategory 
                      category_options={category_options} 
                      asset={fii}
                      onChange={this.setCategory_id}
                    />
                  </Col>
                  <Col md={ 4 }>
                    <SelectPortfolio 
                      portfolio_options={portfolio_options} 
                      asset={fii} 
                      onChange={this.setPortfolio_id}
                    />
                  </Col>
                  <Col md={ 4 }>
                  <SelectRadarfii 
                      portfolio_options={radarfii_options} 
                      asset={fii} 
                      onChange={this.setRadarfii_id}
                    />
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
                <button className="btn btn-success mt-4">Submit</button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default FiiForm

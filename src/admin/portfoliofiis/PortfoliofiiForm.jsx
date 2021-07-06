import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Alert, Form, Label, Input } from 'reactstrap'
import SelectPortfolio from '../../components/selects/SelectPortfolio'
import SelectCategory from '../../components/selects/SelectCategory'
import SelectFii from '../../components/selects/SelectFii'
import {DashboardLayout} from '../layouts/Layout';


const Api = require('./Api.js')

class PortfoliofiiForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio_options:[],
      fii_options:[],
      category_options:[],
      portfoliofii: {
        id: this.getPortfoliofiiId(props),
        category_id: '',
        portfolio_id: '',
        amount: '',
        cost: '',
        total_cost: '',
        total_today: '',
        fii_id: '',
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setPortfolio_id = this.setPortfolio_id.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setTotal_today = this.setTotal_today.bind(this)
    this.setTotal_cost = this.setTotal_cost.bind(this)
    this.setCost = this.setCost.bind(this)
    this.setFii_id = this.setFii_id.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  getPortfoliofiiId(props) {
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

  setFii_id(event) {
    let newVal = event.target.value || ''
    this.setFieldState('fii_id', newVal)
  }

  setAmount(event) {
    let newVal = event.target.value || ''
    this.setFieldState('amount', newVal)
  }

  setCost(event) {
    let newVal = event.target.value || ''
    this.setFieldState('cost', newVal)
  }

  setTotal_today(event) {
    let newVal = event.target.value || ''
    this.setFieldState('total_today', newVal)
  }

  setTotal_cost(event) {
    let newVal = event.target.value || ''
    this.setFieldState('total_cost', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.portfoliofii[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let portfoliofii = {
      category_id: this.state.portfoliofii.category_id,
      portfolio_id: this.state.portfoliofii.portfolio_id,
      amount: this.state.portfoliofii.amount,
      cost: this.state.portfoliofii.cost,
      fii_id: this.state.portfoliofii.fii_id,
      total_cost: this.state.portfoliofii.total_cost,
      total_today: this.state.portfoliofii.total_today,
    }

    Api.savePortfoliofii(portfoliofii, this.state.portfoliofii.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/admin/portfoliofiis'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.portfoliofii.id) {
      Api.getPortfoliofii(this.state.portfoliofii.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              portfoliofii: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, portfoliofii, errors, fii_options, portfolio_options, category_options } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <>
        <DashboardLayout>
            <h3 className="mt-4 mb-4">Editar / Adicionar Fundo Impobiliário a um Portfolio</h3>

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
                      asset={portfoliofii}
                      onChange={this.setCategory_id}
                    />
                  </Col>
                  <Col md={ 4 }>
                    <SelectPortfolio 
                      portfolio_options={portfolio_options} 
                      asset={portfoliofii} 
                      onChange={this.setPortfolio_id}
                    />
                  </Col>
                  <Col md={ 4 }>
                  <SelectFii 
                      portfolio_options={fii_options} 
                      asset={portfoliofii} 
                      onChange={this.setFii_id}
                    />
                  </Col>
                </Row>
                <Row>
                <Col md={ 3 }>
                  <Label for="amount">Amount</Label>
                  <Input type="text" name="amount" id="amount" value={portfoliofii.amount} placeholder="Enter amount" onChange={this.setAmount} />
                </Col>
                <Col md={ 3 }>
                  <Label for="cost">Cost</Label>
                  <Input type="text" name="cost" id="cost" value={portfoliofii.cost} placeholder="Enter cost" onChange={this.setCost} />
                </Col>
                <Col md={ 3 }>
                  <Label for="total_cost">Total cost</Label>
                  <Input type="text" name="total_cost" id="total_cost" value={portfoliofii.total_cost} placeholder="Enter total_cost" onChange={this.setTotal_cost} />
                </Col>
                <Col md={ 3 }>
                  <Label for="total_today">Total hoje</Label>
                  <Input type="text" name="total_today" id="total_today" value={portfoliofii.total_today} placeholder="Enter total_today" onChange={this.setTotal_today} />
                </Col>
                </Row>
                <button className="btn btn-success mt-4">Submit</button>
              </Form>
            </DashboardLayout>
        </>
      )
    }
  }
}

export default PortfoliofiiForm

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Alert, Form, Label, Input } from 'reactstrap'
import SelectPortfolio from '../../../../config/selects/SelectPortfolio'
import SelectCategory from '../../../../config/selects/SelectCategory'
import SelectCripto from '../../../../config/selects/SelectCripto'


const Api = require('../../../api/PortfolioApi')


class PortfoliocriptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio_options:[],
      cripto_options:[],
      category_options:[],
      portfoliocripto: {
        id: this.getPortfoliocriptoId(props),
        category_id: '',
        portfolio_id: '',
        amount: '',
        cost: '',
        cripto_id: '',
        total_cost: '',
        total_today: '',
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setPortfolio_id = this.setPortfolio_id.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setCost = this.setCost.bind(this)
    this.setCripto_id = this.setCripto_id.bind(this)
    this.setTotal_today = this.setTotal_today.bind(this)
    this.setTotal_cost = this.setTotal_cost.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  getPortfoliocriptoId(props) {
    try {
      return props.id
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

  setCripto_id(event) {
    let newVal = event.target.value || ''
    this.setFieldState('cripto_id', newVal)
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
      newState.portfoliocripto[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let portfoliocripto = {
      category_id: this.state.portfoliocripto.category_id,
      portfolio_id: this.state.portfoliocripto.portfolio_id,
      amount: this.state.portfoliocripto.amount,
      cost: this.state.portfoliocripto.cost,
      cripto_id: this.state.portfoliocripto.cripto_id,
      total_cost: this.state.portfoliocripto.total_cost,
      total_today: this.state.portfoliocripto.total_today,
    }

    Api.savePortfoliocripto(portfoliocripto, this.state.portfoliocripto.id)
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
      const amount = form.elements["amount"].value;
      const cost = form.elements["cost"].value;
      const total_today = form.elements["total_today"].value;
      const total_cost = form.elements["total_cost"].value;
      this.props.addPortfoliocripto( id, amount, cost, total_cost, total_today);
      form.reset();
  }

  componentDidMount() {
    if (this.state.portfoliocripto.id) {
      Api.getPortfoliocripto(this.state.portfoliocripto.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              portfoliocripto: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, portfoliocripto, errors, cripto_options, category_options, portfolio_options } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <>
              <h3 className="mt-4 mb-4">Editar / Adicionar Criptomoeda a uma Carteira</h3>
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
                      asset={portfoliocripto}
                      onChange={this.setCategory_id}
                    />
                  </Col>
                  <Col md={ 4 }>
                    <SelectPortfolio 
                      portfolio_options={portfolio_options} 
                      asset={portfoliocripto} 
                      onChange={this.setPortfolio_id}
                    />
                  </Col>
                  <Col md={ 4 }>
                  <SelectCripto 
                      portfolio_options={cripto_options} 
                      asset={portfoliocripto} 
                      onChange={this.setCripto_id}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={ 3 } >
                    <Label for="amount">Amount</Label>
                    <Input type="text" name="amount" id="amount" value={portfoliocripto.amount} placeholder="Enter amount" onChange={this.setAmount} />
                  </Col>
                  <Col md={ 3 }>
                    <Label for="cost">Cost</Label>
                    <Input type="text" name="cost" id="cost" value={portfoliocripto.cost} placeholder="Enter cost" onChange={this.setCost} />
                    </Col>
                  <Col md={ 3 }>
                    <Label for="total_cost">Total cost</Label>
                    <Input type="text" name="total_cost" id="total_cost" value={portfoliocripto.total_cost} placeholder="Enter total_cost" onChange={this.setTotal_cost} />
                    </Col>
                  <Col md={ 3 }>
                    <Label for="total_today">Total hoje</Label>
                    <Input type="text" name="total_today" id="total_today" value={portfoliocripto.total_today} placeholder="Enter total_today" onChange={this.setTotal_today} />
                  </Col>
                </Row>
                <button className="btn btn-success mt-4">Submit</button>
              </Form>
        </>
      )
    }
  }
}

export default PortfoliocriptoForm

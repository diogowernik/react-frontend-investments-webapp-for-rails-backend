import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Form, Label, Input } from 'reactstrap'
import { apiHost } from '../../config/apiHost';
import SelectPortfolio from '../../components/selects/SelectPortfolio'
import SelectCategory from '../../components/selects/SelectCategory'

const Api = require('./Api.js')

class CryptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio_options:[],
      radarcrypto_options:[],
      category_options:[],
      crypto: {
        id: this.getCryptoId(props),
        category_id: '',
        portfolio_id: '',
        amount: '',
        cost: '',
        total_cost: '',
        total: '',
        radarcrypto_id: '',
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setPortfolio_id = this.setPortfolio_id.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setTotal = this.setTotal.bind(this)
    this.setTotal_cost = this.setTotal_cost.bind(this)
    this.setCost = this.setCost.bind(this)
    this.setRadarcrypto_id = this.setRadarcrypto_id.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchData() {
    var portofolio = (apiHost + '/api/portfolio/options');
    var radarcrypto = (apiHost + '/api/radarcrypto/options');
    var category = (apiHost + '/api/category/options');

    Promise.all([fetch(portofolio), fetch(radarcrypto), fetch(category)])
      .then(([res1, res2, res3]) => {
        return Promise.all([res1.json(), res2.json(), res3.json()])
      })
      .then(([res1, res2, res3]) => {
        this.setState({
          portfolio_options: res1,
          radarcrypto_options: res2,
          category_options: res3
        });
      },
        // handle errors here
        (errors) => {
          this.setState({
            errors            
          });console.log(errors)
        }
      );
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

  setRadarcrypto_id(event) {
    let newVal = event.target.value || ''
    this.setFieldState('radarcrypto_id', newVal)
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
      radarcrypto_id: this.state.crypto.radarcrypto_id,
      total_cost: this.state.crypto.total_cost,
      total: this.state.crypto.total,
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
    this.fetchData();
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
    const { redirect, crypto, errors, radarcrypto_options, portfolio_options, category_options } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
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
                  <SelectCategory category_options={category_options} asset={crypto}/>
                </Col>
                <Col md={ 4 }>
                  <SelectPortfolio portfolio_options={portfolio_options} asset={crypto}/>
                </Col>
                <Col md={ 4 }>
                  <Label for="radarcrypto_id">Radarcrypto</Label>
                  <select value={crypto.radarcrypto_id} onChange={this.setRadarcrypto_id} className="form-control">
                  <option value="" disabled selected>Select your option</option>
                    {radarcrypto_options.map((option) => (
                      <option value={option.value} key={option.value}>{option.label}</option>
                    ))}
                  </select>                
                </Col>
                </Row>
                <Row>
                <Col md={ 3 }>
                  <Label for="amount">Amount</Label>
                  <Input type="text" name="amount" id="amount" value={crypto.amount} placeholder="Enter amount" onChange={this.setAmount} />
                </Col>
                <Col md={ 3 }>
                  <Label for="cost">Cost</Label>
                  <Input type="text" name="cost" id="cost" value={crypto.cost} placeholder="Enter cost" onChange={this.setCost} />
                </Col>
                <Col md={ 3 }>
                  <Label for="total_cost">Total cost</Label>
                  <Input type="text" name="total_cost" id="total_cost" value={crypto.total_cost} placeholder="Enter total_cost" onChange={this.setTotal_cost} />
                </Col>
                <Col md={ 3 }>
                  <Label for="total">Total hoje</Label>
                  <Input type="text" name="total" id="total" value={crypto.total} placeholder="Enter total" onChange={this.setTotal} />
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

export default CryptoForm

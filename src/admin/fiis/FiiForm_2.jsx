import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Form} from 'reactstrap'
import SelectPortfolio from '../../components/selects/SelectPortfolio'

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
    this.fetchData();
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
    const { redirect, fii, errors, portfolio_options } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3 className="mt-4 mb-4">Edit</h3>

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
                    <SelectPortfolio portfolio_options={portfolio_options} asset={fii}/>
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

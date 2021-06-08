import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'

const Api = require('./Api.js')

class InvestmentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      investment: {
        id: this.getInvestmentId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getInvestmentId(props) {
    try {
      return props.match.params.id
    } catch (error) {
      return null
    }
  }

  setTitle(event) {
    let newVal = event.target.value || ''
    this.setFieldState('title', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.investment[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let investment = {
      title: this.state.investment.title,
    }

    Api.saveInvestment(investment, this.state.investment.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/investments'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.investment.id) {
      Api.getInvestment(this.state.investment.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              investment: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, investment, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3 mb-3">{investment.title}</h3>
              <p>
                <b>Id Coingecko:</b> {investment.coingecko_id} <br />
                <b>Url:</b> https://meusite.com/{investment.slug} <br />
                <b>Ticker:</b> {investment.ticker}                 
              </p>

              {errors.length > 0 &&
                <div>
                  {errors.map((error, index) =>
                    <Alert color="danger" key={index}>
                      {error}
                    </Alert>
                  )}
                </div>
              }


            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default InvestmentForm

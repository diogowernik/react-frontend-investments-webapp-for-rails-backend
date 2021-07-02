import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Card,CardBody, CardText, Alert } from 'reactstrap'

const Api = require('./Api.js')

class AdminPortfolioForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio: {
        id: this.getPortfolioId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getPortfolioId(props) {
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
      newState.portfolio[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let portfolio = {
      title: this.state.portfolio.title,
    }

    Api.savePortfolio(portfolio, this.state.portfolio.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/portfolios'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.portfolio.id) {
      Api.getPortfolio(this.state.portfolio.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              portfolio: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, portfolio, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
                <Row>
                  {errors.length > 0 &&
                      <div>
                        {errors.map((error, index) =>
                          <Alert color="danger" key={index}>
                            {error}
                          </Alert>
                        )}
                      </div>
                    }
                    <Col xl={ 12 }>
                        <Card outline color="gray" className="mb-3 mt-3">
                            <CardBody>
                                <CardText>
                                    <b>{portfolio.title}</b>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

      )
    }
  }
}

export default AdminPortfolioForm

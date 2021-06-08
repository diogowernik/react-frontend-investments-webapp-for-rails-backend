import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'

const Api = require('./Api.js')

class PortifolioForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portifolio: {
        id: this.getPortifolioId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getPortifolioId(props) {
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
      newState.portifolio[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let portifolio = {
      title: this.state.portifolio.title,
    }

    Api.savePortifolio(portifolio, this.state.portifolio.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/portifolios'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.portifolio.id) {
      Api.getPortifolio(this.state.portifolio.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              portifolio: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, portifolio, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3 mb-3">{portifolio.title}</h3>
              <p>
                <b>Id Coingecko:</b> {portifolio.coingecko_id} <br />
                <b>Url:</b> https://meusite.com/{portifolio.slug} <br />
                <b>Ticker:</b> {portifolio.ticker}                 
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

export default PortifolioForm

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'

const Api = require('./Api.js')

class CryptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crypto: {
        id: this.getCryptoId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getCryptoId(props) {
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
      newState.crypto[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let crypto = {
      title: this.state.crypto.title,
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
              <h3 className="mt-3 mb-3">{crypto.title}</h3>
              <p>
                <b>Id Coingecko:</b> {crypto.coingecko_id} <br />
                <b>Url:</b> https://meusite.com/{crypto.slug} <br />
                <b>Ticker:</b> {crypto.ticker}                 
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

export default CryptoForm

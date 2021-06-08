import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'

const Api = require('./Api.js')

class CryptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      asset: {
        id: this.getCryptoId(props),
        ticker: '',
      },
      redirect: null,
      errors: []
    }

    this.setTicker = this.setTicker.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getCryptoId(props) {
    try {
      return props.match.params.id
    } catch (error) {
      return null
    }
  }

  setTicker(event) {
    let newVal = event.target.value || ''
    this.setFieldState('ticker', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.asset[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let asset = {
      ticker: this.state.asset.ticker,
    }

    Api.saveCrypto(asset, this.state.asset.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/assets'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.asset.id) {
      Api.getCrypto(this.state.asset.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              asset: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, asset, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3 mb-3">{asset.ticker}</h3>
              <p>
                <b>Id Category:</b> {asset.category_id} <br />
                <b>Url:</b> https://meusite.com/{asset.slug} <br />
                <b>Ticker:</b> {asset.ticker}                 
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

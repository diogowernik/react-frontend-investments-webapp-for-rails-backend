import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'

const Api = require('./Api.js')

class WalletForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wallet: {
        id: this.getWalletId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getWalletId(props) {
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
      newState.wallet[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let wallet = {
      title: this.state.wallet.title,
    }

    Api.saveWallet(wallet, this.state.wallet.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/wallets'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.wallet.id) {
      Api.getWallet(this.state.wallet.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              wallet: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, wallet, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3 mb-3">{wallet.title}</h3>
              <p>
                <b>Url:</b> https://meusite.com/{wallet.slug} <br />             
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

export default WalletForm

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

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
              <h3>Edit Crypto</h3>

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
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={crypto.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default CryptoForm

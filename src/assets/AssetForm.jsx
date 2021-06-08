import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class AssetForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      asset: {
        id: this.getAssetId(props),
        ticker: '',
        category_id: '',
      },
      redirect: null,
      errors: []
    }

    this.setCategory_id = this.setCategory_id.bind(this)
    this.setTicker = this.setTicker.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getAssetId(props) {
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
      category_id: this.state.asset.category_id,
      ticker: this.state.asset.ticker,
    }

    Api.saveAsset(asset, this.state.asset.id)
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
      Api.getAsset(this.state.asset.id)
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
              <h3>Edit Asset</h3>

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
                  <Label for="category_id">Category</Label>
                  <Input type="text" name="category_id" id="category_id" value={asset.category_id} placeholder="Enter category_id" onChange={this.setCategory_id} />
                </FormGroup>
                <FormGroup>
                  <Label for="ticker">Ticker</Label>
                  <Input type="text" name="ticker" id="ticker" value={asset.ticker} placeholder="Enter ticker" onChange={this.setTicker} />
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

export default AssetForm

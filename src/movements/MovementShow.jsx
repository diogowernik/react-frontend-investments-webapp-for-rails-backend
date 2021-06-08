import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'

const Api = require('./Api.js')

class MovementForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movement: {
        id: this.getMovementId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getMovementId(props) {
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
      newState.movement[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let movement = {
      title: this.state.movement.title,
    }

    Api.saveMovement(movement, this.state.movement.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/movements'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.movement.id) {
      Api.getMovement(this.state.movement.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              movement: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, movement, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3 mb-3">{movement.title}</h3>
              <p>
                <b>Id Coingecko:</b> {movement.coingecko_id} <br />
                <b>Url:</b> https://meusite.com/{movement.slug} <br />
                <b>Ticker:</b> {movement.ticker}                 
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

export default MovementForm

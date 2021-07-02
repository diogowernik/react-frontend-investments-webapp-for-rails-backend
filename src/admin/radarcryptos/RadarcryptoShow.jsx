import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'
import AdminNavBar from "../layouts/admin_navbar"


const Api = require('./Api.js')

class RadarcryptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      radarcrypto: {
        id: this.getRadarcryptoId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getRadarcryptoId(props) {
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
      newState.radarcrypto[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let radarcrypto = {
      title: this.state.radarcrypto.title,
    }

    Api.saveRadarcrypto(radarcrypto, this.state.radarcrypto.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/radarcryptos'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.radarcrypto.id) {
      Api.getRadarcrypto(this.state.radarcrypto.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              radarcrypto: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, radarcrypto, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <>
        <AdminNavBar/>
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3 mb-3">{radarcrypto.title}</h3>

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
        </>
      )
    }
  }
}

export default RadarcryptoForm

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'
import AdminNavBar from "../../admin/layouts/admin_navbar"


const Api = require('../../admin/criptos/Api.js')

class CriptoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cripto: {
        id: this.getCriptoId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getCriptoId(props) {
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
      newState.cripto[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let cripto = {
      title: this.state.cripto.title,
    }

    Api.saveCripto(cripto, this.state.cripto.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/criptos'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.cripto.id) {
      Api.getCripto(this.state.cripto.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              cripto: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, cripto, errors } = this.state

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
              <h3 className="mt-3 mb-3">{cripto.title}</h3>

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

export default CriptoForm

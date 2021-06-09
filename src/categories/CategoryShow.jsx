import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'

const Api = require('./Api.js')

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: {
        id: this.getCategoryId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getCategoryId(props) {
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
      newState.category[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let category = {
      title: this.state.category.title,
    }

    Api.saveCategory(category, this.state.category.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/categories'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.category.id) {
      Api.getCategory(this.state.category.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              category: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, category, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3 mb-3">{category.title}</h3>
              <p>
                <b>Url:</b> https://meusite.com/{category.slug} <br />             
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

export default CategoryForm

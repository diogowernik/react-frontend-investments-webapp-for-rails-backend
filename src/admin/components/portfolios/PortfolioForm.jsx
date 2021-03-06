import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('../../api/PortfoliosApi.js')

class PortfolioForm extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      portfolio: {
        id: this.getPortfolioId(props),
        title: '',
        slug: '',
      },
      redirect: null,
      errors: [],
    }

    this.setTitle = this.setTitle.bind(this)
    this.setSlug = this.setSlug.bind(this)
    
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  getPortfolioId(props) {
    try {
      return props.id
    } catch (error) {
      return null
    }
  }

  setTitle(event) {
    let newVal = event.target.value || ''
    this.setFieldState('title', newVal)
  }

  setSlug(event) {
    let newVal = event.target.value || ''
    this.setFieldState('slug', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.portfolio[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let portfolio = {
      title: this.state.portfolio.title,
      slug: this.state.portfolio.slug,
    }

    Api.savePortfolio(portfolio, this.state.portfolio.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {  
          this.setState(
          ) 
        }
      })
    const form = event.target;
    const id = "∞"
    const title = form.elements["title"].value;
    const slug = form.elements["slug"].value;
    this.props.addPortfolio( id, slug, title);
    form.reset();
      
  }

  componentDidMount() {
    // Check if props.id is available 
        if ( this.state.portfolio.id || this.props.id ) {
              const id = this.state.portfolio.id || this.props.id;
                Api.getPortfolio(id).then((response) => {
                    const [error, data] = response;
                    if (error) {
                        this.setState({
                            errors: data
                        });
                    } else {    
                        this.setState({
                            portfolio: data,
                            errors: []
                        });
                    }
                });
        }
    }

  

  render() {
    const { redirect, portfolio, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <>
          <Row>
            <Col>
              {errors.length > 0 &&
                <div>
                  {errors.map((error, index) =>
                    <Alert color="danger" key={index}>
                      {error}
                    </Alert>
                  )}
                </div>
              }

              <Form onSubmit={this.handleSubmit} >
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={portfolio.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={portfolio.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
        </>
      )
    }
  }
}

export default PortfolioForm

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: {
        id: this.getPostId(props),
        title: '',
        slug: '',
        description: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.setSlug = this.setSlug.bind(this)
    this.setDescription = this.setDescription.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getPostId(props) {
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

  setSlug(event) {
    let newVal = event.target.value || ''
    this.setFieldState('slug', newVal)
  }
  setDescription(event) {
    let newVal = event.target.value || ''
    this.setFieldState('description', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.post[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let post = {
      title: this.state.post.title,
      slug: this.state.post.slug,
      description: this.state.post.description,
    }

    Api.savePost(post, this.state.post.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/posts'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.post.id) {
      Api.getPost(this.state.post.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              post: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, post, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Post</h3>

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
                  <Input type="text" name="title" id="title" value={post.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input type="text" name="slug" id="slug" value={post.slug} placeholder="Enter slug" onChange={this.setSlug} />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="text" name="description" id="description" value={post.description} placeholder="Enter description" onChange={this.setDescription} />
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

export default PostForm

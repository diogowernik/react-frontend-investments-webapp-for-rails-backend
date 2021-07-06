import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Card, CardBody, CardText, Alert } from 'reactstrap'

const Api = require('../../api/PortfolioApi')

class AppShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio: {
        id: this.getPortfolioId(props),
        title: '',
      },
      redirect: null,
      errors: []
    }
  }

  getPortfolioId(props) {
    try {
      return props.match.params.id
    } catch (error) {
      return null
    }
  }


  componentDidMount() {
    if (this.state.portfolio.id) {
      Api.getPortfolio(this.state.portfolio.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              portfolio: data,
              errors: []
            })
          }
        })
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
        {errors.length > 0 &&
            <div>
            {errors.map((error, index) =>
                <Alert color="danger" key={index}>
                {error}
                </Alert>
            )}
            </div>
        }
         <Card outline color="gray" className="mb-3 mt-3">
            <CardBody>
                <CardText>
                    <b>{portfolio.title}</b>
                </CardText>
            </CardBody>
        </Card>
        </>
      )
    }
  }
}

export default AppShow

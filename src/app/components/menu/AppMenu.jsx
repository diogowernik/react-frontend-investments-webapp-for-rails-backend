import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Card, CardBody, CardText, Alert } from 'reactstrap'

const Api = require('../../api/PortfolioApi')

class AppMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio: {
        id: this.getPortfolioId(props),
        title: '',
        slug: ''
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
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Dashboard</a>
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Composição</a>
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Localização</a>
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Tokens</a>
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Proventos</a>
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Operações</a>
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Impostos</a>
                    <a className="h5 m-4" href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>Radar</a>
                </CardText>
            </CardBody>
        </Card>
        </>
      )
    }
  }
}

export default AppMenu

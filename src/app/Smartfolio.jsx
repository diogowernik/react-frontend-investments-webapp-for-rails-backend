import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Card, CardBody, CardText, Alert } from 'reactstrap'
import { MainLayout } from './layouts/MainLayout';
import Performance from './components/sidemodules/Performance'
import SideModule from './components/sidemodules/SideModuleExample'
import PortfolioTitle from './components/sidemodules/PortfolioTitle';
import HistoricalRentability from './components/dashboard/HistoricalRentability'
import PortfolioCompostition from './components/dashboard/PortfolioComposition';
import AppMenu from './components/menu/AppMenu';

const Api = require('./api/PortfolioApi')

class AppShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      portfolio: {
        id: this.getPortfolioId(props),
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
          <MainLayout>
            <Row>
              {errors.length > 0 &&
                <div>
                  {errors.map((error, index) =>
                    <Alert color="danger" key={index}>
                      {error}
                    </Alert>
                  )}
                </div>
              }
              <Col xl={3}>
                <PortfolioTitle id={this.props.match.params.id} />
                <Card outline color="gray" className="mb-3 mt-3">
                  <CardBody>
                    <CardText>
                      <b>{portfolio.title}</b>
                    </CardText>
                  </CardBody>
                </Card>
                <Performance />
                <SideModule />
              </Col>
              <Col xl={9}>
                <AppMenu portfolio={portfolio} />
                <HistoricalRentability />
                <PortfolioCompostition id={this.props.match.params.id} />
              </Col>

            </Row>
          </MainLayout>
        </>
      )
    }
  }
}

export default AppShow

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert } from 'reactstrap'
import PortfolioTitle from '../components/sidemodules/PortfolioTitle';
import Performance from '../components/sidemodules/Performance'
import SideModule from '../components/sidemodules/SideModuleExample'
import AppMenu from '../components/menu/AppMenu';
import BodyWrapper from "./BodyWrapper";
import AppTopNavBar from "./AppTopNav"
import "./CustomStyle.css"

const Api = require('../api/PortfolioApi')

class MainLayout extends Component {
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
    const { children } = this.props;


    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <BodyWrapper>
        <AppTopNavBar/>
        <Container>
            <section className="sm:flex-row flex flex-col flex-1">
            <div className="content-box" style={{ flexGrow: 2, flexBasis: "0%" }} >
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
                <PortfolioTitle portfolio={portfolio} />              
                <Performance />
                <SideModule />             
              </Col>
              <Col xl={9}>
                <AppMenu portfolio={portfolio} />
                {/* Here goes the wrapped content */}
                {children}

              </Col>
            </Row>
            </div>
            </section>
      </Container>
    </BodyWrapper>
      )
    }
  }
}

export default MainLayout

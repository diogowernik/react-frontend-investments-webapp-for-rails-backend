import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert,Spinner } from 'reactstrap'
import PortfolioTitle from '../components/sidemodules/PortfolioTitle';
import Performance from '../components/sidemodules/Performance'
// import SideModule from '../components/sidemodules/SideModuleExample'
import AppMenu from '../components/menu/AppMenu';
import BodyWrapper from "./BodyWrapper";
import AppTopNavBar from "./AppTopNav";
import "./CustomStyle.css"

const Api = require('../api/PortfolioApi')

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: {
        id: this.props.id,
      },
      redirect: null,
      errors: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    if (this.state.portfolio.id) {
      Api.getPortfolio(this.state.portfolio.id)
        .then(response => {
          const [error, data] = response;  
          if (error) {
            this.setState({
              errors: data,
              isLoaded: true
            })
          } else {
            this.setState({
              portfolio: data,
              errors: [],
              isLoaded: true
            })
          }
        })
    }
  }

  render() {
    const { redirect, portfolio, errors, isLoaded } = this.state
    const { children } = this.props;

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else if (!isLoaded) { return (<div className="text-center pt-5"><Spinner size="sm" color="secondary" /><br/>Carregando...</div>)
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
                {/* <SideModule />              */}
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

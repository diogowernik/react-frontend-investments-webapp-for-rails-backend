import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert,Spinner } from 'reactstrap'
import PortfolioTitle from '../components/sidemodules/PortfolioTitle';
import Performance from '../components/sidemodules/Performance'
import ComponentNav from "./_ComponentNav";
import AppTopNavBar from "./_AppTopNav";
import "./_CustomStyle.css"

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

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else if (!isLoaded) { return (<div className="text-center pt-5"><Spinner size="sm" color="secondary" /><br/>Carregando...</div>)
    } else {

      return (
        <>
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
              <Col md={3}>
                <PortfolioTitle portfolio={portfolio} />          
                <Performance />
              </Col>
              <Col md={9}>
                <ComponentNav portfolio={portfolio} />
              </Col>
            </Row>
            </div>
            </section>
      </Container>
    </>
      )
    }
  }
}

export default MainLayout

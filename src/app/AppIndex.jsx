import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert} from 'reactstrap'
import { Row, Col, Card, CardBody, CardFooter, Container } from 'reactstrap'
import AppTopNavBar from "./layouts/_AppTopNav"
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';


const Api = require('./api/PortfolioApi')

class AppIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
          portfolios: [],
          isLoaded: false,
          error: null
        }
      }
      componentDidMount() {
        Api.getPortfolios()
          .then(response => {
            const [error, data] = response
            if (error) {
              this.setState({
                isLoaded: true,
                portfolios: [],
                error: data
              })
            } else {
              this.setState({
                isLoaded: true,
                portfolios: data
              })
            }
          })
      }
    
      render() {
        const { error, isLoaded, portfolios } = this.state
    
        if (error) {
    
          return (
            <Alert color="danger">
              Error: {error}
            </Alert>
          )
    
        } else if (!isLoaded) {
    
          return (
            <Alert color="primary">
              Loading...
            </Alert>
          )
    
        } else {
    
          return (
            <>
              <AppTopNavBar />
              <Container>
                <Row>
                  <Col xl={ 3 } className="mt-4">
                  <Card color="gray" className="mb-3">
                    <CardBody> Administre ao lado seus portfolios </CardBody>
                  </Card>
                  </Col>
                  <Col xl={ 9 }>
                  <Link className="btn btn-primary float-right" to="/admin/portfolios/new">Adicionar</Link>
                  <h4 className="mt-4 mb-4">Portfolios</h4>
                  <Row>
                    <Col> {portfolios.map(portfolio => ( <div key={portfolio.id}>
                      <Card color="gray" className="mb-3 mr-3">
                        <CardBody>
                          <Link to={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>{portfolio.title}</Link>
                        </CardBody>
                        <CardFooter>
                          <Link className="btn btn-danger float-right" to={`/admin/portfolio/${portfolio.id}/delete`}>
                          <FaTrashAlt />
                          </Link>
                          <Link className="btn btn-success float-right mr-2" to={`/admin/portfolio/${portfolio.id}/edit`}>
                          <FaPencilAlt />
                          </Link>{' '}
                        </CardFooter>
                      </Card>
                    </div> ))} </Col>
                  </Row>
                  </Col>
                </Row>
              </Container>
            
            </>
          )
    
        }
    
      }
    }
    
    export default AppIndex
    
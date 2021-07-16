import React, { Component } from 'react'
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';
import {  Link } from 'react-router-dom';
import { Row,Card,CardFooter, CardBody, Col} from 'reactstrap';

class PortfolioCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolios: props.portfolios
    }
  }

  render() {
    const portfolios = this.state.portfolios
    if (portfolios.length === 0) {
      return <div></div>
    } else {
      return (
            <>
            <Row>
              <Col>
            {portfolios.map(portfolio => (
              <div key={portfolio.id}>                 
                  <Card  color="gray" className="mb-3 mr-3">
                      <CardBody>
                        <Link to={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>{portfolio.title}</Link>
                      </CardBody>
                      <CardFooter>
                        <Link className="btn btn-danger float-right" to={`/admin/portfolio/${portfolio.id}/delete`}><FaTrashAlt /></Link>
                        <Link className="btn btn-success float-right mr-2" to={`/admin/portfolio/${portfolio.id}/edit`}><FaPencilAlt /></Link>{' '}
                      </CardFooter>
                  </Card>           
              </div>
            ))}
            </Col>
            </Row>
          </>
      )
    }
  }
}

export default PortfolioCards

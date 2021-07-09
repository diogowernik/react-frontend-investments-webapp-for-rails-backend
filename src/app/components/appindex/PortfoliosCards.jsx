import React, { Component } from 'react'
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';
import { Row,Card,CardFooter, CardBody} from 'reactstrap'


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
            {portfolios.map(portfolio => (
              <div key={portfolio.id}>                 
                  <Card outline color="gray" className="mb-3 mr-3">
                      <CardBody>
                        <a href={`/smartfolio/${portfolio.slug}/${portfolio.id}`}>{portfolio.title}</a>
                      </CardBody>
                      <CardFooter>
                        <a className="btn btn-danger float-right" href={`/admin/portfolio/${portfolio.id}/delete`}><FaTrashAlt /></a>
                        <a className="btn btn-success float-right mr-2" href={`/admin/portfolio/${portfolio.id}/edit`}><FaPencilAlt /></a>{' '}
                      </CardFooter>
                  </Card>           
              </div>
            ))}
            </Row>
          </>
      )
    }
  }
}

export default PortfolioCards

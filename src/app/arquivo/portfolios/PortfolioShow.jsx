import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Row, Col, Card,CardHeader, CardBody, CardTitle, CardText, Table, Alert } from 'reactstrap'
import TreeChart from './Treechart.js'

const Api = require('../admin/portfolios/Api')

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

    this.setTitle = this.setTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getPortfolioId(props) {
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

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.portfolio[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let portfolio = {
      title: this.state.portfolio.title,
    }

    Api.savePortfolio(portfolio, this.state.portfolio.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/portfolios'
          })
        }
      })
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
        <div className="container custom-container">
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
                    <Col xl={ 3 }>
                        <Card outline color="gray" className="mb-3 mt-3">
                            <CardBody>
                                <CardText>
                                    <b>{portfolio.title}</b>
                                </CardText>
                            </CardBody>
                        </Card>
                        <Card outline color="gray" className="mb-3">
                            <CardHeader className="bg-gray-lighter">Performance</CardHeader>
                            <CardBody>
                            <p className="text-center h3 m-3 text-primary">
                            
                            2,35 %
                            </p>
                            <p className="text-center text-muted m-3">
                            
                            Rentabilidade do porfólio Atual
                            </p>
                            </CardBody>
                            <CardBody>
                                <Table responsive>
                                    <tbody>
                                        <tr>
                                            <td>Patrimônio</td>
                                            <td><div className="float-right strong">R$ 535.000,00</div></td>
                                        </tr>
                                        <tr>
                                            <td>Custo de aquisição</td>
                                            <td><div className="float-right strong">R$ 500.000,00</div></td>
                                        </tr>
                                        <tr>
                                            <td>Proventos Acumulado</td>
                                            <td><div className="float-right strong">R$ 20.000,00</div></td>
                                        </tr>
                                        <tr>
                                            <td>Lucros com operações</td>
                                            <td><div className="float-right strong">R$ 15.000,00</div></td>
                                        </tr>
                                        <tr className="mt-1">
                                            <th><div className="mt-2 strong">Lucro</div></th>
                                            <th><div className="float-right h3 text-primary">R$ 25.000,00</div></th>
                                        </tr>
                                    </tbody>
                                    
                                        
                                    
                                </Table>
                            </CardBody>
                        </Card>
                        <Card outline color="gray" className="mb-3">
                            <CardBody>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</CardText>
                            </CardBody>
                        </Card>
                        <Card outline color="gray" className="mb-3">
                            <CardHeader className="bg-gray-lighter">Header</CardHeader>
                            <CardBody>
                                <CardTitle>Success card title</CardTitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={ 9 }>
                        <Card outline color="gray" className="mb-3 mt-3">
                            <CardBody>
                                <CardText>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Dashboard</a>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Composição</a>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Localização</a>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Tokens</a>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Proventos</a>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Operações</a>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Impostos</a>
                                    <a className="h5 m-4" href={`/portfolio/${portfolio.id}`}>Radar</a>
                                </CardText>
                            </CardBody>
                        </Card>
                        <Card outline color="gray" className="mb-3">
                            <CardHeader className="bg-gray-lighter">Rentabilidade Histórica</CardHeader>
                            <CardBody>
                                {/* <LineChart data={Line.data} options={Line.options} width={600} height={150}/> */}
                            </CardBody>
                        </Card>
                        <Card outline color="gray" className="mb-3">
                          <CardHeader className="bg-gray-lighter">Composição do Portfolio</CardHeader>
                          <Card body>
                              <TreeChart id={this.props.match.params.id} />
                          </Card>
                        </Card>
                    </Col>

                </Row>
            </div>
        </>
      )
    }
  }
}

export default AppShow

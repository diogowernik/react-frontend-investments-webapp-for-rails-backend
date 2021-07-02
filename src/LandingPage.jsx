import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, CardText } from 'reactstrap'

class LandingPage extends Component {


  render() {


      return (
        <Container>
          <h4 className="mt-4 mb-4">Bem vindo.</h4>
          <Row>
          <Col md={ 6 }>
                <Card outline color="gray" className="mb-3 mt-3">
                    <CardBody>
                        <CardText>
                            <b><a href="/admin">Área Administrativa</a></b>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md={ 6 }>
                <Card outline color="gray" className="mb-3 mt-3">
                    <CardBody>
                        <CardText>
                            <b><a href="/app">Acessar o App</a></b>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      )


  }
}

export default LandingPage

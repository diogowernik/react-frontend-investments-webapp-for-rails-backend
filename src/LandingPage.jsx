import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, CardText, Alert } from 'reactstrap'
import '../Custom.css'; 

class LandingPage extends Component {

  render() {
    const { error, isLoaded } = this.state

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
        <Container>
          <h4 className="mt-4 mb-4">Bem vindo.</h4>
          <Row>
          <Col xl={ 3 }>
                <Card outline color="gray" className="mb-3 mt-3">
                    <CardBody>
                        <CardText>
                            <b>Área Administrativa</b>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={ 3 }>
                <Card outline color="gray" className="mb-3 mt-3">
                    <CardBody>
                        <CardText>
                            <b>Acessar o App</b>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default LandingPage

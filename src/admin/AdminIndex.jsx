import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import '../Custom.css'; 
import AdminNavBar from "./layouts/admin_navbar"

class LandingPage extends Component {

  render() {
      return (
        <>
        <AdminNavBar/>
        <Container>
          <h4 className="mt-4 mb-4">Bem vindo a Area Administrativa.</h4>
          <Row>
          {/* <Col xl={ 3 }>
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
            </Col> */}
          </Row>
        </Container>
        </>
      )
  }
}

export default LandingPage

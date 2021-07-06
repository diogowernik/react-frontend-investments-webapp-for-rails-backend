import React, { Component } from 'react'
import { Row } from 'reactstrap'
import {DashboardLayout} from './layouts/Layout';


class LandingPage extends Component {

  render() {
      return (
        <>
        <DashboardLayout>
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
        </DashboardLayout>
        </>
      )
  }
}

export default LandingPage
